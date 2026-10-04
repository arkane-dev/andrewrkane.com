<!-- Blog list: hairline rows, mono dates, tags. Not cards: posts are read in sequence. -->
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
				<a href="/blog/{p.slug}">{p.title}</a>
				<p>{p.summary}</p>
			</div>
			<div class="side">
				{#if p.draft}<Tag tone="warning">draft</Tag>{/if}
				{#each p.tags as t (t)}<Tag tone="muted">{t}</Tag>{/each}
				<span class="nd-meta">{p.minutes} min</span>
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
	.side { display: flex; flex-wrap: wrap; gap: var(--nd-space-2); align-items: center; justify-content: flex-end; }
	@media (max-width: 720px) {
		li { grid-template-columns: 1fr; gap: var(--nd-space-1); }
		.side { justify-content: flex-start; }
	}
</style>
