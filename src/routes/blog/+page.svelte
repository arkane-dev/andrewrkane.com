<script lang="ts">
	import { SectionHeader, Tag } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';
	import PostList from '#lib/components/PostList.svelte';
	import { pages } from '#lib';

	let { data } = $props();
	let tag = $state<string | null>(null);
	let source = $state<'all' | 'mine' | 'external'>('all');
	const sources = ['all', 'mine', 'external'] as const;
	const hasExternal = $derived(data.posts.some((p) => p.url));
	const bySource = $derived(source === 'all' ? data.posts : data.posts.filter((p) => !!p.url === (source === 'external')));
	const tags = $derived([...new Set(bySource.flatMap((p) => p.tags))].sort());
	const shown = $derived(tag && tags.includes(tag) ? bySource.filter((p) => p.tags.includes(tag!)) : bySource);
</script>

<Seo title="Blog" description={pages.blog.description} />

<div class="content">
	<SectionHeader index="01" zh="博客" title="Blog" meta="{data.posts.length} posts · rss" />
	<p class="intro">{pages.blog.intro}</p>

	{#if hasExternal}
		<div class="filter" role="group" aria-label="Filter by source">
			{#each sources as s (s)}
				<button onclick={() => (source = s)} aria-pressed={source === s}><Tag tone={source === s ? 'accent' : 'muted'}>{s === 'external' ? 'elsewhere ↗' : s}</Tag></button>
			{/each}
		</div>
	{/if}

	<div class="filter" role="group" aria-label="Filter by tag">
		<button onclick={() => (tag = null)} aria-pressed={!tag || !tags.includes(tag)}><Tag tone={!tag || !tags.includes(tag) ? 'accent' : 'muted'}>all tags</Tag></button>
		{#each tags as t (t)}
			<button onclick={() => (tag = t)} aria-pressed={tag === t}><Tag tone={tag === t ? 'accent' : 'muted'}>{t}</Tag></button>
		{/each}
	</div>

	<PostList posts={shown} />
</div>

<style>
	.content { max-width: var(--nd-content-max); margin: 0 auto; padding: var(--nd-space-12) var(--nd-gutter) 0; }
	.intro { color: var(--nd-text-dim); }
	.filter { display: flex; flex-wrap: wrap; gap: var(--nd-space-2); margin: var(--nd-space-6) 0; }
	.filter + .filter { margin-top: calc(-1 * var(--nd-space-3)); }
	.filter button { padding: 0; border: 0; background: none; cursor: pointer; }
</style>
