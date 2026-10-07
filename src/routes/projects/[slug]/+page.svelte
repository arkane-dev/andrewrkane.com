<!-- Project detail: what it is, status, stack, links, downloads, changelog. -->
<script lang="ts">
	import { SectionHeader, Panel, Button, Tag, HanziMark } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';
	import StatusTag from '#lib/components/StatusTag.svelte';

	let { data } = $props();
	const p = $derived(data.project);
	const osName = { linux: 'Linux', windows: 'Windows', macos: 'macOS' };
</script>

<Seo title={p.name} description={p.summary} />

<div class="content">
	<a class="back nd-meta" href="/projects">&lt; /projects</a>
	<header class="head">
		<div>
			<div class="tags"><StatusTag status={p.status} /><Tag tone="muted">{p.kind}</Tag>{#if p.started}<Tag tone="muted">since {p.started}</Tag>{/if}</div>
			<h1>{p.name}</h1>
			<p class="summary">{p.summary}</p>
			<div class="row">
				{#if p.url && p.status !== 'idea'}<Button arrow href={p.url} target="_blank" rel="noopener">Open<span class="visually-hidden"> (opens in a new tab)</span></Button>{/if}
				{#if p.repo}<Button variant="outline" arrow href={p.repo}>Source code</Button>{/if}
			</div>
		</div>
		{#if p.zh}<HanziMark text={p.zh} label={p.name} tone="outline" size="clamp(3rem, 8vw, 6rem)" />{/if}
	</header>

	<div class="cols">
		<section>
			<SectionHeader index="01" zh="概述" title="Overview" level={3} />
			{#each p.description as para, i (i)}<p>{para}</p>{/each}
			{#if p.screenshots?.length}
				<div class="shots">{#each p.screenshots as sh (sh.src)}<img src={sh.src} alt={sh.alt} loading="lazy" />{/each}</div>
			{/if}
		</section>

		<aside>
			<Panel title="Stack" index="02" cut="sm">
				<div class="stack">{#each p.stack as s (s)}<Tag tone="accent-2">{s}</Tag>{/each}</div>
			</Panel>

			{#if p.kind === 'desktop'}
				<Panel title="Downloads" index="03" cut="sm" accent="cyan">
					{#if p.downloads?.length}
						<table class="nd-table">
							<tbody>
								{#each p.downloads as d (d.file)}
									<tr><td>{osName[d.platform]} <span class="nd-meta">{d.arch}</span></td><td class="num">{d.size ?? ''}</td><td><a href={d.href}>{d.file}</a></td></tr>
								{/each}
							</tbody>
						</table>
					{:else}
						<p class="nd-meta">&gt; {p.downloadsNote ?? 'no builds yet'}<span class="nd-cursor"></span></p>
					{/if}
				</Panel>
			{/if}
		</aside>
	</div>

	{#if p.changelog?.length}
		<section>
			<SectionHeader index="04" zh="更新" title="Changelog" level={3} />
			<table class="nd-table">
				<tbody>{#each p.changelog as c (c.version)}<tr><td class="nd-mono">{c.version}</td><td class="nd-mono">{c.date}</td><td>{c.notes}</td></tr>{/each}</tbody>
			</table>
		</section>
	{/if}
</div>

<style>
	.content { max-width: var(--nd-content-max); margin: 0 auto; padding: var(--nd-space-12) var(--nd-gutter) 0; display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--nd-space-10); }
	.back { text-decoration: none; }
	.head { display: flex; justify-content: space-between; gap: var(--nd-space-8); align-items: flex-start; padding-bottom: var(--nd-space-8); border-bottom: 1px solid var(--nd-line); }
	.tags, .stack { display: flex; flex-wrap: wrap; gap: var(--nd-space-2); }
	.head > div { min-width: 0; }
	h1 { margin: var(--nd-space-4) 0 var(--nd-space-2); font-size: clamp(2rem, 8vw, var(--nd-text-4xl)); overflow-wrap: anywhere; }
	.summary { font-size: var(--nd-text-lg); color: var(--nd-text-dim); }
	.row { display: flex; flex-wrap: wrap; gap: var(--nd-space-3); }
	.cols { display: grid; grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: var(--nd-space-10); }
	aside { display: grid; gap: var(--nd-space-5); align-content: start; }
	.shots { display: grid; gap: var(--nd-space-4); margin-top: var(--nd-space-6); }
	.shots img { border: 1px solid var(--nd-line); }
	.nd-table .num { white-space: nowrap; }
	@media (max-width: 900px) { .cols { grid-template-columns: 1fr; } .head :global(.nd-hanzi) { display: none; } }
</style>
