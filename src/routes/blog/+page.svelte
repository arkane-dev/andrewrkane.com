<script lang="ts">
	import { SectionHeader, Tag } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';
	import PostList from '#lib/components/PostList.svelte';
	import { pages } from '#lib';

	let { data } = $props();
	let tag = $state<string | null>(null);
	const tags = $derived([...new Set(data.posts.flatMap((p) => p.tags))].sort());
	const shown = $derived(tag ? data.posts.filter((p) => p.tags.includes(tag!)) : data.posts);
</script>

<Seo title="Blog" description={pages.blog.description} />

<div class="content">
	<SectionHeader index="01" zh="博客" title="Blog" meta="{data.posts.length} posts · rss" />
	<p class="intro">{pages.blog.intro}</p>

	<div class="filter" role="group" aria-label="Filter by tag">
		<button class:on={tag === null} onclick={() => (tag = null)} aria-pressed={tag === null}><Tag tone={tag === null ? 'accent' : 'muted'}>all</Tag></button>
		{#each tags as t (t)}
			<button class:on={tag === t} onclick={() => (tag = t)} aria-pressed={tag === t}><Tag tone={tag === t ? 'accent' : 'muted'}>{t}</Tag></button>
		{/each}
	</div>

	<PostList posts={shown} />
</div>

<style>
	.content { max-width: var(--nd-content-max); margin: 0 auto; padding: var(--nd-space-12) var(--nd-gutter) 0; }
	.intro { color: var(--nd-text-dim); }
	.filter { display: flex; flex-wrap: wrap; gap: var(--nd-space-2); margin: var(--nd-space-6) 0; }
	.filter button { padding: 0; border: 0; background: none; cursor: pointer; }
</style>
