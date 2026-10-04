<!-- Long-form article styling for rendered Markdown. Dark surface; code blocks themed by shiki. -->
<script lang="ts">
	let { html }: { html: string } = $props();
</script>

<div class="prose">{@html html}</div>

<style>
	.prose { font-size: 1.0625rem; line-height: 1.7; max-width: 70ch; }
	.prose :global(h2) { margin: var(--nd-space-12) 0 var(--nd-space-4); font-size: var(--nd-text-2xl); }
	.prose :global(h3) { margin: var(--nd-space-8) 0 var(--nd-space-3); font-size: var(--nd-text-xl); color: var(--nd-accent-2); }
	.prose :global(h4) { margin: var(--nd-space-6) 0 var(--nd-space-2); font-size: var(--nd-text-lg); }
	.prose :global(h2), .prose :global(h3), .prose :global(h4) { position: relative; scroll-margin-top: calc(var(--nd-topbar-h) + var(--nd-space-4)); }
	.prose :global(.anchor) { position: absolute; left: -1.2em; color: var(--nd-text-mute); text-decoration: none; opacity: 0; }
	.prose :global(h2:hover .anchor), .prose :global(h3:hover .anchor), .prose :global(h4:hover .anchor) { opacity: 1; }
	.prose :global(p) { max-width: none; }
	.prose :global(ul), .prose :global(ol) { padding-left: 1.4em; margin: 0 0 var(--nd-space-4); }
	.prose :global(li) { margin: var(--nd-space-1) 0; }
	.prose :global(li::marker) { color: var(--nd-accent); }
	.prose :global(blockquote) {
		margin: var(--nd-space-6) 0;
		padding: var(--nd-space-3) var(--nd-space-5);
		border-left: 2px solid var(--nd-accent);
		background: var(--nd-accent-tint);
		color: var(--nd-text);
		font-size: var(--nd-text-lg);
	}
	.prose :global(blockquote p:last-child) { margin-bottom: 0; }
	.prose :global(pre.shiki) {
		margin: var(--nd-space-6) 0;
		padding: var(--nd-space-4) var(--nd-space-5);
		overflow-x: auto;
		border: 1px solid var(--nd-line);
		border-left: 2px solid var(--nd-accent);
		font-size: var(--nd-text-sm);
		line-height: 1.6;
		tab-size: 2;
	}
	.prose :global(table) { width: 100%; margin: var(--nd-space-6) 0; border-collapse: collapse; font-size: var(--nd-text-sm); }
	.prose :global(th) {
		padding: var(--nd-space-2) var(--nd-space-3);
		border-bottom: 1px solid var(--nd-line-strong);
		color: var(--nd-text-mute);
		font-family: var(--nd-font-ui);
		font-size: var(--nd-text-xs);
		letter-spacing: var(--nd-tracking-label);
		text-align: left;
		text-transform: uppercase;
	}
	.prose :global(td) { padding: var(--nd-space-2) var(--nd-space-3); border-bottom: 1px solid var(--nd-line); }
	.prose :global(img) { margin: var(--nd-space-6) 0; border: 1px solid var(--nd-line); }
	.prose :global(hr) { border: 0; border-top: 1px solid var(--nd-line); margin: var(--nd-space-10) 0; }
</style>
