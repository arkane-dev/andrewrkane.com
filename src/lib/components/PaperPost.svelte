<!-- Long read on paper: ink band with vertical hanzi, cream body, name seal as the sign-off. Used by blog posts and Lab logs. -->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { HanziMark, Seal } from '@cyberpunk-apps/neondeck';
	import { about, bands, type Band } from '#lib';

	let { band, children }: { band: Band; children: Snippet } = $props();
</script>

<article class="post nd-paper">
	<div class="band"><HanziMark text={band} label={bands[band]} tone="sun" size="clamp(2.5rem, 5vw, 4rem)" /></div>
	<div class="body">
		{@render children()}
		<div class="seal"><Seal text={about.seal.text} label={about.seal.label} size="4.5rem" tilt={-3} /></div>
	</div>
</article>

<style>
	.post { display: grid; grid-template-columns: auto 1fr; }
	.band { display: flex; justify-content: center; padding: var(--nd-space-8) var(--nd-space-5); background: var(--nd-ink); }
	.band :global(.nd-hanzi) { position: sticky; top: calc(var(--nd-topbar-h) + var(--nd-space-6)); align-self: flex-start; }
	.body { min-width: 0; padding: var(--nd-space-12) var(--nd-space-10) var(--nd-space-10); }

	/* Shared header parts. Pages pass a <header> with h1, .summary and .meta. */
	.body :global(header) { margin-bottom: var(--nd-space-10); padding-bottom: var(--nd-space-6); border-bottom: 1px solid var(--nd-line); }
	.body :global(h1) { margin: 0 0 var(--nd-space-4); font-size: clamp(2rem, 5vw, var(--nd-text-4xl)); text-transform: none; color: var(--nd-ink); }
	.body :global(.summary) { color: var(--nd-text-dim); font-size: var(--nd-text-lg); }
	.body :global(.meta) { display: flex; flex-wrap: wrap; gap: var(--nd-space-3); align-items: center; }
	.body :global(time) { color: var(--nd-cinnabar); font-size: var(--nd-text-sm); }

	/* Neon accents fail on cream. Links and inline code go to ink, h3s to cinnabar (5.1:1). */
	.post :global(a) { color: var(--nd-ink); text-decoration-thickness: 1px; }
	.post :global(a:hover) { color: var(--nd-cinnabar); text-shadow: none; }
	.post :global(.prose h3) { color: var(--nd-cinnabar); }
	.post :global(:not(pre) > code) { background: var(--nd-paper-dim); color: var(--nd-ink); }
	.post :global(.prose blockquote) { border-left-color: var(--nd-cinnabar); background: color-mix(in srgb, var(--nd-ink) 6%, transparent); }
	.post :global(.prose pre.shiki) { border-color: var(--nd-ink); }

	.seal { display: flex; justify-content: flex-end; margin-top: var(--nd-space-10); }

	@media (max-width: 720px) {
		.post { grid-template-columns: 1fr; }
		.band { justify-content: flex-start; padding: var(--nd-space-3) var(--nd-space-5); }
		.band :global(.nd-hanzi) { position: static; writing-mode: horizontal-tb; }
		.body { padding: var(--nd-space-6) var(--nd-space-5) var(--nd-space-8); }
	}
</style>
