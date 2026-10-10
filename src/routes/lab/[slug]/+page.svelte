<!-- Lab deep dive: the long version of a Lab entry, on paper as a 日志 (log), with its outputs beside it. -->
<script lang="ts">
	import { Panel, Tag } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';
	import Prose from '#lib/components/Prose.svelte';
	import PaperPost from '#lib/components/PaperPost.svelte';
	import StatusTag from '#lib/components/StatusTag.svelte';
	import { projectBySlug } from '#lib';

	let { data } = $props();
	const m = $derived(data.meta);
	const project = $derived(m.project ? projectBySlug(m.project) : undefined);
</script>

<Seo title={m.title} description={m.summary} type="article" />

<div class="dive">
	<a class="back nd-meta" href="/lab">&lt; /lab</a>

	<div class="cols" class:solo={!project && !m.outputs?.length}>
		<PaperPost band="日志">
			<header>
				<h1>{#if m.zh}<span class="zh" lang={m.zhLang}>{m.zh}</span>{/if}{m.title}</h1>
				<p class="summary">{m.summary}</p>
				<div class="meta">
					<time class="nd-mono" datetime={m.date}>{m.date}</time>
					<span class="plate"><StatusTag status={m.status} /></span>
					{#if m.draft}<Tag tone="muted">draft</Tag>{/if}
					{#each m.tags as t (t)}<Tag tone="muted">{t}</Tag>{/each}
				</div>
			</header>

			<Prose html={data.html} />
		</PaperPost>

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
</div>

<style>
	.dive { max-width: var(--nd-content-max); margin: 0 auto; padding: var(--nd-space-12) var(--nd-gutter) 0; }
	.back { display: inline-block; margin-bottom: var(--nd-space-4); text-decoration: none; }
	/* Ink plate: restores dark-UI tokens so the neon status tag keeps its contrast on cream paper. */
	.plate { display: inline-flex; padding: 3px; background: var(--nd-ink); --nd-text-mute: #8885b9; --nd-text-on-neon: #070818; }
	.zh { margin-right: 0.4em; font-family: var(--nd-font-cjk); color: var(--nd-cinnabar); }
	.cols { display: grid; grid-template-columns: minmax(0, 1fr) 18rem; gap: var(--nd-space-10); align-items: start; }
	.cols.solo { grid-template-columns: minmax(0, 92ch); justify-content: center; }
	aside { display: grid; gap: var(--nd-space-5); position: sticky; top: var(--nd-space-16); }
	.proj { font-family: var(--nd-font-display); font-weight: 600; }
	.outputs { margin: 0; padding-left: var(--nd-space-4); display: grid; gap: var(--nd-space-2); }
	@media (max-width: 900px) { .cols { grid-template-columns: minmax(0, 1fr); } aside { position: static; } }
</style>
