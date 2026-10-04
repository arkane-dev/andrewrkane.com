<script lang="ts">
	import { SectionHeader } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import { projects, pages } from '#lib';

	const groups = [
		{ kind: 'desktop', title: 'Desktop apps', zh: '桌面应用', meta: 'local install · linux / windows / macos' },
		{ kind: 'web', title: 'Web', zh: '网页', meta: 'runs in the browser' },
		{ kind: 'book', title: 'Books', zh: '书籍', meta: 'writing' },
		{ kind: 'library', title: 'Libraries', zh: '库', meta: 'building blocks' }
	] as const;
</script>

<Seo title="Projects" description={pages.projects.description} />

<div class="content">
	<SectionHeader index="01" zh="项目" title="Projects" meta="{projects.length} total" />
	<p class="intro">{pages.projects.intro}</p>

	{#each groups as g, gi (g.kind)}
		{@const list = projects.filter((p) => p.kind === g.kind)}
		{#if list.length}
			<section>
				<SectionHeader index="0{gi + 2}" zh={g.zh} title={g.title} meta={g.meta} level={3} />
				<div class="grid">
					{#each list as p, i (p.slug)}<ProjectCard project={p} index="0{i + 1}" />{/each}
				</div>
			</section>
		{/if}
	{/each}
</div>

<style>
	.content { max-width: var(--nd-content-max); margin: 0 auto; padding: var(--nd-space-12) var(--nd-gutter) 0; display: grid; gap: var(--nd-space-12); }
	.intro { color: var(--nd-text-dim); margin-top: calc(var(--nd-space-8) * -1); }
	.grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--nd-space-5); }
	@media (max-width: 1000px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
	@media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }
</style>
