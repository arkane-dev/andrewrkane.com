<!-- Work with me: the business page. Services, process, proof, one clear call to action. -->
<script lang="ts">
	import { SectionHeader, Panel, Button, Tag } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';
	import { site, work, pages } from '#lib';

	// Number sections in order, skipping the ones with no content.
	const shown = ['services', ...(work.process.length ? ['process'] : []), ...(work.proof.length ? ['proof'] : []), 'cta'];
	const idx = (key: string) => String(shown.indexOf(key) + 2).padStart(2, '0');
</script>

<Seo title="Work with me" description={work.intro} />

<div class="content">
	<SectionHeader index="01" zh="合作" title="Work with me" meta={site.location} />
	<div class="lead">
		<Tag tone={work.available ? 'success' : 'muted'} dot pulse={work.available}>{work.availability}</Tag>
		<p class="intro">{work.intro}</p>
		<div class="row">
			<Button size="lg" arrow href={work.cta.href}>{work.cta.label}</Button>
			<Button size="lg" variant="ghost" href="/projects">See my work</Button>
		</div>
	</div>

	<section>
		<SectionHeader index={idx('services')} zh="服务" title="Services" />
		<div class="grid">
			{#each work.services as s, i (i)}
				<Panel title={s.title} index="0{i + 1}" meta={s.zh}>
					<p>{s.summary}</p>
					{#if s.deliverables.length}
						<p class="nd-label">You get</p>
						<ul>{#each s.deliverables as d, j (j)}<li>{d}</li>{/each}</ul>
					{/if}
					{#if s.engagement}<p class="nd-meta">{s.engagement}</p>{/if}
				</Panel>
			{/each}
		</div>
	</section>

	{#if work.process.length}
	<section>
		<SectionHeader index={idx('process')} zh="流程" title="Process" />
		<ol class="steps">
			{#each work.process as st, i (i)}
				<li><span class="nd-index">0{i + 1}</span><b>{st.step}</b><span>{st.body}</span></li>
			{/each}
		</ol>
	</section>
	{/if}

	{#if work.proof.length}
	<section>
		<SectionHeader index={idx('proof')} zh="评价" title="Proof" meta={pages.work.proofMeta} />
		{#each work.proof as q, i (i)}
			<blockquote><p>“{q.quote}”</p><footer class="nd-meta">— {q.who}</footer></blockquote>
		{/each}
	</section>
	{/if}

	<Panel title="Start a conversation" index={idx('cta')} accent="cyan" active>
		<div class="cta">
			<p>{pages.work.firstEmail}</p>
			<div class="row">
				<Button arrow href={work.cta.href}>{work.cta.label}</Button>
				<span class="nd-mono">{site.email}</span>
			</div>
		</div>
	</Panel>
</div>

<style>
	.content { max-width: var(--nd-content-max); margin: 0 auto; padding: var(--nd-space-12) var(--nd-gutter) 0; display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--nd-space-16); }
	.lead { margin-top: calc(var(--nd-space-10) * -1); }
	.intro { font-size: var(--nd-text-xl); line-height: 1.4; max-width: 40ch; margin-top: var(--nd-space-4); }
	.row { display: flex; flex-wrap: wrap; gap: var(--nd-space-4); align-items: center; }
	.grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--nd-space-5); }
	.grid p { color: var(--nd-text-dim); }
	ul { margin: var(--nd-space-2) 0 var(--nd-space-4); padding-left: 1.2em; }
	li::marker { color: var(--nd-accent); }
	.steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(4, 1fr); border-block: 1px solid var(--nd-line); counter-reset: s; }
	.steps li { display: grid; gap: var(--nd-space-1); padding: var(--nd-space-5); border-right: 1px solid var(--nd-line); }
	.steps li:last-child { border-right: 0; }
	.steps b { color: var(--nd-accent-2); font-family: var(--nd-font-ui); letter-spacing: 0.08em; text-transform: uppercase; }
	.steps span:last-child { color: var(--nd-text-dim); font-size: var(--nd-text-sm); }
	blockquote { margin: 0 0 var(--nd-space-5); padding: var(--nd-space-4) var(--nd-space-6); border-left: 2px solid var(--nd-accent); background: var(--nd-accent-tint); }
	blockquote p { margin: 0 0 var(--nd-space-2); font-size: var(--nd-text-lg); }
	.cta p { color: var(--nd-text-dim); }
	@media (max-width: 960px) {
		.grid, .steps { grid-template-columns: 1fr; }
		.steps li { border-right: 0; border-bottom: 1px solid var(--nd-line); }
	}
</style>
