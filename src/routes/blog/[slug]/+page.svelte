<script lang="ts">
	import { Tag } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';
	import Prose from '#lib/components/Prose.svelte';
	import { site } from '#lib';

	let { data } = $props();
	const m = $derived(data.meta);
</script>

<Seo title={m.title} description={m.summary} type="article" />

<article class="post">
	<header>
		<a class="back nd-meta" href="/blog">&lt; /blog</a>
		<h1>{m.title}</h1>
		<p class="summary">{m.summary}</p>
		<div class="meta">
			<time class="nd-mono" datetime={m.date}>{m.date}</time>
			<span class="nd-meta">{m.minutes} min read · {site.owner}</span>
			{#if m.draft}<Tag tone="warning">draft</Tag>{/if}
			{#each m.tags as t (t)}<Tag tone="muted">{t}</Tag>{/each}
		</div>
	</header>

	<Prose html={data.html} />

	<nav class="pager" aria-label="More posts">
		{#if data.older}<a href="/blog/{data.older.slug}"><span class="nd-meta">← older</span>{data.older.title}</a>{:else}<span></span>{/if}
		{#if data.newer}<a class="right" href="/blog/{data.newer.slug}"><span class="nd-meta">newer →</span>{data.newer.title}</a>{/if}
	</nav>
</article>

<style>
	.post { max-width: 76ch; margin: 0 auto; padding: var(--nd-space-12) var(--nd-gutter) 0; }
	header { margin-bottom: var(--nd-space-10); padding-bottom: var(--nd-space-6); border-bottom: 1px solid var(--nd-line); }
	.back { text-decoration: none; }
	h1 { margin-top: var(--nd-space-4); font-size: clamp(2rem, 5vw, var(--nd-text-4xl)); text-transform: none; }
	.summary { color: var(--nd-text-dim); font-size: var(--nd-text-lg); }
	.meta { display: flex; flex-wrap: wrap; gap: var(--nd-space-3); align-items: center; }
	time { color: var(--nd-accent); font-size: var(--nd-text-sm); }
	.pager { display: grid; grid-template-columns: 1fr 1fr; gap: var(--nd-space-6); margin-top: var(--nd-space-16); padding-top: var(--nd-space-6); border-top: 1px solid var(--nd-line); }
	.pager a { display: grid; gap: var(--nd-space-1); text-decoration: none; color: var(--nd-text); font-family: var(--nd-font-display); font-weight: 600; }
	.pager .right { text-align: right; }
</style>
