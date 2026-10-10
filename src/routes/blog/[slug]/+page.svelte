<script lang="ts">
	import { Tag } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';
	import Prose from '#lib/components/Prose.svelte';
	import PaperPost from '#lib/components/PaperPost.svelte';
	import { site } from '#lib';

	let { data } = $props();
	const m = $derived(data.meta);
</script>

<Seo title={m.title} description={m.summary} type="article" />

<div class="wrap">
	<a class="back nd-meta" href="/blog">&lt; /blog</a>

	<PaperPost band={m.zh}>
		<header>
			<h1>{m.title}</h1>
			<p class="summary">{m.summary}</p>
			<div class="meta">
				<time class="nd-mono" datetime={m.date}>{m.date}</time>
				<span class="nd-meta">{m.minutes} min read · {site.owner}</span>
				{#if m.draft}<Tag tone="muted">draft</Tag>{/if}
				{#each m.tags as t (t)}<Tag tone="muted">{t}</Tag>{/each}
			</div>
		</header>

		<Prose html={data.html} />
	</PaperPost>

	<nav class="pager" aria-label="More posts">
		{#if data.older}<a href="/blog/{data.older.slug}"><span class="nd-meta">← older</span>{data.older.title}</a>{:else}<span></span>{/if}
		{#if data.newer}<a class="right" href="/blog/{data.newer.slug}"><span class="nd-meta">newer →</span>{data.newer.title}</a>{/if}
	</nav>
</div>

<style>
	.wrap { max-width: 92ch; margin: 0 auto; padding: var(--nd-space-12) var(--nd-gutter) 0; }
	.back { display: inline-block; margin-bottom: var(--nd-space-4); text-decoration: none; }
	.pager { display: grid; grid-template-columns: 1fr 1fr; gap: var(--nd-space-6); margin-top: var(--nd-space-10); }
	.pager a { display: grid; gap: var(--nd-space-1); text-decoration: none; color: var(--nd-text); font-family: var(--nd-font-display); font-weight: 600; }
	.pager .right { text-align: right; }
</style>
