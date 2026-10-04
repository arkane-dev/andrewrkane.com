# site

The main website: landing, about, work, blog, projects (code + downloads), tools, books, lab, now.
SvelteKit (Svelte 5), fully prerendered (adapter-static), NEONDECK styling.

**To change content, read [CONTENT_GUIDE.md](CONTENT_GUIDE.md).** All words live in `src/lib/content/` and `src/content/blog/`.

```bash
source .venv/bin/activate     # node/npm live in the venv (uv + nodeenv)
npm run dev                   # http://localhost:5173 (drafts visible)
npm run todo                  # list remaining ‹placeholders›
npm run check                 # svelte-check
npm run build                 # static site in build/
npm run update:neondeck       # after rebuilding sharable_assets/neondeck
```

## How it's built
| Path | What |
|---|---|
| `src/lib/content/` | all site content as typed data (`types.ts` has the shapes) |
| `src/content/blog/` | Markdown posts with frontmatter |
| `src/lib/server/posts.ts` | Markdown → HTML at build time (marked + shiki) |
| `src/lib/server/shiki-theme.ts` | NEONDECK code theme, every color ≥4.5:1 |
| `src/lib/components/` | Seo, SiteFooter, ProjectCard, PostList, Prose, StatusTag |
| `src/routes/rss.xml`, `sitemap.xml` | prerendered feeds |
| `vite.config.ts` | prerender ignores 404s under `/tools/*` only (tools deploy separately) |

Accessibility: axe-core reports 0 WCAG 2.2 AA violations on all pages at 1440px and 400px (2026-10-04).
