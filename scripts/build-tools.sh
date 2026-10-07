#!/usr/bin/env bash
# Build the web tools into this site's output, under /tools/<slug>/.
#
# Each tool is its own repo. Locally it sits beside the site (../genai-calculator);
# in CI, where only this repo is checked out, it is cloned from GitHub. Tools need
# NEONDECK at ../sharable_assets, the same as the site does.
#
#   npm run build:tools            (after `vite build`; `npm run build` runs both)
set -euo pipefail

site=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
root=$(dirname "$site")
out="$site/build/tools"
[[ -d "$site/build" ]] || { echo "error: build/ missing, run vite build first" >&2; exit 1; }

# slug | repo
TOOLS=(
	"genai-calculator|https://github.com/arkane-dev/genai-calculator"
)

for entry in "${TOOLS[@]}"; do
	slug=${entry%%|*}
	repo=${entry#*|}
	src="$root/$slug"
	if [[ ! -d "$src" ]]; then
		echo "▶ $slug: not found beside the site, cloning $repo"
		git clone --depth 1 "$repo" "$src"
	fi
	echo "▶ $slug: building for /tools/$slug"
	(
		cd "$src"
		[[ -d node_modules ]] || npm ci --no-audit --no-fund
		BASE_PATH="/tools/$slug" npm run build >/dev/null
	)
	rm -rf "${out:?}/$slug"
	mkdir -p "$out"
	cp -r "$src/build" "$out/$slug"
	echo "  → build/tools/$slug ($(find "$out/$slug" -type f | wc -l) files)"
done
