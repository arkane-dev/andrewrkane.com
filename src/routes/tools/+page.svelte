<!-- Tools: small web apps you can use right now. Each is its own project, linked from here. -->
<script lang="ts">
	import { SectionHeader, Panel, Button, DotMatrix } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';
	import StatusTag from '#lib/components/StatusTag.svelte';
	import { tools, pages } from '#lib';
</script>

<Seo title="Tools" description={pages.tools.description} />

<div class="content">
	<div class="banner nd-led-bg"><DotMatrix text="工具" label="Tools" tone="cyan" height="5rem" /></div>
	<SectionHeader index="01" zh="工具" title="Tools" meta="free · runs in your browser" />
	<p class="intro">{pages.tools.intro}</p>

	<div class="grid">
		{#each tools as t, i (t.slug)}
			<Panel title={t.name} index="0{i + 2}" meta={t.zh}>
				<StatusTag status={t.status} />
				<p>{t.summary}</p>
				<div class="row">
					{#if t.status === 'idea'}<Button disabled>Coming soon</Button>{:else}<Button arrow href={t.href} target="_blank" rel="noopener">Open tool<span class="visually-hidden"> (opens in a new tab)</span></Button>{/if}
					{#if t.project}<Button variant="ghost" href="/projects/{t.project}">How it's built</Button>{/if}
				</div>
			</Panel>
		{/each}
	</div>
</div>

<style>
	.content { max-width: var(--nd-content-max); margin: 0 auto; padding: var(--nd-space-12) var(--nd-gutter) 0; }
	.banner { padding: var(--nd-space-6); border: 1px solid var(--nd-line); margin-bottom: var(--nd-space-10); }
	.intro { color: var(--nd-text-dim); }
	.grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--nd-space-5); margin-top: var(--nd-space-6); }
	p { color: var(--nd-text-dim); }
	.row { display: flex; flex-wrap: wrap; gap: var(--nd-space-3); }
	@media (max-width: 800px) { .grid { grid-template-columns: 1fr; } }
</style>
