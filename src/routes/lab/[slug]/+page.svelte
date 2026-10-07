<!-- Lab deep dive: the long version of a Lab entry, with its outputs beside it. -->
<script lang="ts">
	import { Panel, Tag } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';
	import Prose from '#lib/components/Prose.svelte';
	import StatusTag from '#lib/components/StatusTag.svelte';
	import { projectBySlug } from '#lib';

	let { data } = $props();
	const m = $derived(data.meta);
	const project = $derived(m.project ? projectBySlug(m.project) : undefined);
</script>

<Seo title={m.title} description={m.summary} type="article" />

<article class="dive">
	<header>
		<a class="back nd-meta" href="/lab">&lt; /lab</a>
		<h1>{#if m.zh}<span class="zh" lang="zh-Hans">{m.zh}</span>{/if}{m.title}</h1>
		<p class="summary">{m.summary}</p>
		<div class="meta">
			<span class="nd-mono date">{m.date}</span>
			<StatusTag status={m.status} />
			{#if m.draft}<Tag tone="warning">draft</Tag>{/if}
			{#each m.tags as t (t)}<Tag tone="muted">{t}</Tag>{/each}
		</div>
	</header>

	<div class="cols">
		<Prose html={data.html} />

		{#if project || m.outputs?.length}
			<aside>
				{#if project}
					<Panel title="Project" index="01" cut="sm">
						<a class="proj" href="/projects/{project.slug}">{project.name}</a>
						<p class="nd-meta">{project.summary}</p>
					</Panel>
				{/if}
				{#if m.outputs?.length}
					<Panel title="Outputs" index={project ? '02' : '01'} cut="sm" accent="cyan">
						<ul class="outputs">
							{#each m.outputs as o (o.href)}<li><a href={o.href}>{o.label}</a></li>{/each}
						</ul>
					</Panel>
				{/if}
			</aside>
		{/if}
	</div>
</article>

<style>
	.dive { max-width: var(--nd-content-max); margin: 0 auto; padding: var(--nd-space-12) var(--nd-gutter) 0; }
	header { max-width: 76ch; margin-bottom: var(--nd-space-10); padding-bottom: var(--nd-space-6); border-bottom: 1px solid var(--nd-line); }
	.back { text-decoration: none; }
	h1 { margin-top: var(--nd-space-4); font-size: clamp(2rem, 5vw, var(--nd-text-4xl)); text-transform: none; }
	.zh { margin-right: 0.4em; font-family: var(--nd-font-cjk); color: var(--nd-accent); }
	.summary { color: var(--nd-text-dim); font-size: var(--nd-text-lg); }
	.meta { display: flex; flex-wrap: wrap; gap: var(--nd-space-3); align-items: center; }
	.date { color: var(--nd-accent); font-size: var(--nd-text-sm); }
	.cols { display: grid; grid-template-columns: minmax(0, 1fr) 18rem; gap: var(--nd-space-10); align-items: start; }
	aside { display: grid; gap: var(--nd-space-5); position: sticky; top: var(--nd-space-16); }
	.proj { font-family: var(--nd-font-display); font-weight: 600; }
	.outputs { margin: 0; padding-left: var(--nd-space-4); display: grid; gap: var(--nd-space-2); }
	@media (max-width: 900px) { .cols { grid-template-columns: minmax(0, 1fr); } aside { position: static; } }
</style>
