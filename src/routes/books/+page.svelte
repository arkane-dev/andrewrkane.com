<!-- Books: the Field Guide series on the paper (editorial) surface. -->
<script lang="ts">
	import { SectionHeader, NeonSign, Button, Seal } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';
	import StatusTag from '#lib/components/StatusTag.svelte';
	import { books, series } from '#lib';
	const total = books.reduce((n, b) => n + b.chapters, 0);
</script>

<Seo title="Books" description="{series.title}: four volumes, {total} chapters." />

<div class="content">
	<SectionHeader index="01" zh="书籍" title="Books" meta="{books.length} volumes · {total} chapters" />

	<section class="series nd-paper">
		<div class="seal"><Seal text={series.zh} label="{series.title} seal" size="clamp(4.5rem, 8vw, 6.5rem)" tilt={-2} /></div>
		<p class="nd-label">Series</p>
		<h2>{series.title}</h2>
		<p class="lede">{series.summary}</p>

		<div class="vols">
			{#each books as b (b.slug)}
				<article id={b.slug} class="vol">
					<NeonSign text={b.zh ?? ''} label={b.title} caption="VOL {b.volume}" tone={b.tone} size="2rem" />
					<div>
						<p class="nd-label">Volume {b.volume} · {b.chapters} chapters{#if b.pages} · {b.pages} pp{/if}</p>
						<h3>{b.title}</h3>
						<p>{b.summary}</p>
						<div class="row">
							<span class="plate"><StatusTag status={b.status} /></span>
							{#if b.readHref}<Button size="sm" arrow href={b.readHref}>Read online</Button>{:else}<Button size="sm" disabled>Read online</Button>{/if}
							{#if b.pdfHref}<Button size="sm" variant="outline" href={b.pdfHref}>PDF</Button>{:else}<Button size="sm" variant="outline" disabled>PDF</Button>{/if}
						</div>
					</div>
				</article>
			{/each}
		</div>
	</section>
</div>

<style>
	.content { max-width: var(--nd-content-max); margin: 0 auto; padding: var(--nd-space-12) var(--nd-gutter) 0; }
	.series { position: relative; padding: var(--nd-space-12) var(--nd-space-10); }
	.seal { position: absolute; top: var(--nd-space-8); right: var(--nd-space-8); }
	h2 { font-size: clamp(2rem, 5vw, var(--nd-text-4xl)); color: var(--nd-ink); max-width: 18ch; }
	.lede { max-width: 60ch; }
	.vols { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--nd-space-8); margin-top: var(--nd-space-10); }
	.vol { display: flex; gap: var(--nd-space-5); align-items: flex-start; padding-top: var(--nd-space-5); border-top: 1px solid var(--nd-line); }
	/* neon signs sit on an ink plate inside the paper block */
	.vol :global(.nd-sign) { padding: var(--nd-space-3); background: var(--nd-ink); }
	/* Ink plate: restores dark-UI tokens so neon status tags keep their contrast on cream paper. */
	.plate { display: inline-flex; padding: 3px; background: var(--nd-ink); --nd-text-mute: #8885b9; --nd-text-on-neon: #070818; }
	h3 { margin: var(--nd-space-1) 0 var(--nd-space-2); color: var(--nd-ink); font-size: var(--nd-text-xl); }
	.row { display: flex; flex-wrap: wrap; gap: var(--nd-space-2); align-items: center; }
	@media (max-width: 900px) { .vols { grid-template-columns: 1fr; } .series { padding: var(--nd-space-5) var(--nd-space-5) var(--nd-space-8); } .seal { position: static; display: flex; justify-content: flex-end; justify-self: stretch; margin-bottom: var(--nd-space-3); /* in flow on phones: never covers the text */ } }
</style>
