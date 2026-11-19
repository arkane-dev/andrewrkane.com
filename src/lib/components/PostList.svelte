<!-- Blog list: hairline rows, mono dates, tags. Not cards: posts are read in sequence.
     External posts (url set) link out in a new tab and name the publisher. -->
<script lang="ts">
	import { Tag } from '@cyberpunk-apps/neondeck';
	import type { Post } from '#lib';
	let { posts }: { posts: Post[] } = $props();
</script>

<ol class="posts">
	{#each posts as p (p.slug)}
		<li>
			<time class="nd-mono" datetime={p.date}>{p.date}</time>
			<div class="main">
				{#if p.url}
					<a href={p.url} target="_blank" rel="external noopener">{p.title}<span class="sr-only"> (on {p.publisher}, opens in a new tab)</span></a>
				{:else}
					<a href="/blog/{p.slug}">{p.title}</a>
				{/if}
				<p>{p.summary}</p>
			</div>
			<div class="side">
				{#if p.draft}<Tag tone="warning">draft</Tag>{/if}
				{#each p.tags as t (t)}<Tag tone="muted">{t}</Tag>{/each}
				{#if p.url}
					<span class="nd-meta ext"><span aria-hidden="true">↗ {p.publisher} ·&nbsp;</span>{p.minutes} min</span>
				{:else}
					<span class="nd-meta">{p.minutes} min</span>
				{/if}
			</div>
		</li>
	{/each}
</ol>

<style>
	.posts { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--nd-line); }
	li { display: grid; grid-template-columns: 7rem 1fr auto; gap: var(--nd-space-5); align-items: baseline; padding: var(--nd-space-4) 0; border-bottom: 1px solid var(--nd-line); }
	time { color: var(--nd-text-mute); font-size: var(--nd-text-xs); }
	a { color: var(--nd-text); font-family: var(--nd-font-display); font-weight: 600; font-size: var(--nd-text-lg); text-decoration: none; }
	a:hover { color: var(--nd-accent); text-shadow: none; }
	p { margin: var(--nd-space-1) 0 0; color: var(--nd-text-dim); font-size: var(--nd-text-sm); }
	.ext { color: var(--nd-text-dim); white-space: nowrap; }
	.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
	.side { display: flex; flex-wrap: wrap; gap: var(--nd-space-2); align-items: center; justify-content: flex-end; }
	@media (max-width: 720px) {
		li { grid-template-columns: 1fr; gap: var(--nd-space-1); }
		.side { justify-content: flex-start; }
	}
</style>
