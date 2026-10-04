<!-- About: who you are. Personal first, credentials second. -->
<script lang="ts">
	import { SectionHeader, HanziMark, Seal, Button, Tag } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';
	import { site, about } from '#lib';
	const linkedin = site.socials.find((s) => s.label === 'LinkedIn');
</script>

<Seo title="About" description={about.intro} />

<div class="content">
	<SectionHeader index="01" zh="关于" title="About" meta={site.location} />

	<article class="poster nd-paper">
		<div class="band"><HanziMark text="关于" label="About" tone="sun" size="clamp(3rem, 6vw, 5rem)" /></div>
		<div class="body">
			<div class="seal"><Seal text={about.seal.text} label={about.seal.label} size="clamp(4.5rem, 8vw, 6.5rem)" tilt={-2} /></div>
			{#if about.portrait}<img class="portrait" src={about.portrait} alt={site.owner} />{/if}
			<p class="nd-label">{site.owner} ─── {site.location}</p>
			<h2 class="title">Hello.</h2>
			<p class="intro">{about.intro}</p>
			{#each about.bio as para, i (i)}<p>{para}</p>{/each}
			<div class="row">
				<Button arrow href="/work">Work with me</Button>
				<Button variant="outline" href="mailto:{site.email}">Email</Button>
			</div>
		</div>
	</article>

	<section>
		<SectionHeader index="02" zh="原则" title="How I work" />
		<div class="principles">
			{#each about.principles as pr, i (i)}
				<div class="pr"><span class="nd-index">0{i + 1}</span><h4>{pr.title}</h4><p>{pr.body}</p></div>
			{/each}
		</div>
	</section>

	<section class="two">
		<div>
			<SectionHeader index="03" zh="生涯" title="Lifepath" level={3} />
			<ol class="timeline">
				{#each about.timeline as t, i (i)}
					<li><span class="nd-mono when">{t.when}</span><b>{t.what}<span class="lp-zh" lang="zh-Hans">{t.zh}</span></b><span class="note">{t.note}</span></li>
				{/each}
			</ol>
			{#if linkedin}<p class="nd-meta cv">The CV version lives on <a href={linkedin.href}>LinkedIn</a>.</p>{/if}
		</div>
		<div>
			<SectionHeader index="04" zh="工具箱" title="Stack" level={3} />
			<div class="stack">{#each about.stack as s (s)}<Tag tone="accent-2">{s}</Tag>{/each}</div>
			<SectionHeader index="05" zh="本站" title="This site" level={3} />
			<p class="nd-meta">{about.colophon}</p>
			<ul class="links nd-meta">
				<li><a href="/now">/now</a></li>
				{#each site.socials as s (s.href)}<li><a href={s.href}>{s.label.toLowerCase()}</a></li>{/each}
			</ul>
		</div>
	</section>
</div>

<style>
	.content { max-width: var(--nd-content-max); margin: 0 auto; padding: var(--nd-space-12) var(--nd-gutter) 0; display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--nd-space-16); }
	.poster { display: grid; grid-template-columns: auto 1fr; margin-top: calc(var(--nd-space-10) * -1); }
	.band { display: grid; place-items: center; padding: var(--nd-space-6); background: var(--nd-ink); }
	.body { position: relative; padding: var(--nd-space-12) var(--nd-space-10); }
	.body > p { max-width: 62ch; }
	.seal { position: absolute; right: var(--nd-space-8); top: var(--nd-space-8); }
	.portrait { width: 8rem; aspect-ratio: 1; object-fit: cover; margin-bottom: var(--nd-space-4); border: 2px solid var(--nd-ink); filter: grayscale(1) contrast(1.1); }
	.title { font-size: var(--nd-text-5xl); color: var(--nd-ink); margin: var(--nd-space-2) 0 var(--nd-space-4); }
	.intro { font-size: var(--nd-text-lg); }
	.row { display: flex; flex-wrap: wrap; gap: var(--nd-space-3); margin-top: var(--nd-space-6); }
	.principles { display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); border-block: 1px solid var(--nd-line); }
	.pr { padding: var(--nd-space-6) var(--nd-space-5); border-right: 1px solid var(--nd-line); }
	.pr:last-child { border-right: 0; }
	.pr h4 { margin: var(--nd-space-2) 0; color: var(--nd-accent-2); font-family: var(--nd-font-ui); letter-spacing: 0.08em; }
	.pr p { margin: 0; color: var(--nd-text-dim); font-size: var(--nd-text-sm); }
	.two { display: grid; grid-template-columns: 1fr 1fr; gap: var(--nd-space-12); }
	.timeline { list-style: none; margin: 0; padding: 0; border-left: 1px solid var(--nd-line-strong); }
	.timeline li { display: grid; gap: 2px; padding: 0 0 var(--nd-space-5) var(--nd-space-5); position: relative; }
	.timeline li::before { content: ''; position: absolute; left: -4px; top: 0.45em; width: 7px; height: 7px; background: var(--nd-accent); }
	.when { color: var(--nd-accent); font-size: var(--nd-text-xs); }
	.timeline b { font-family: var(--nd-font-ui); font-size: var(--nd-text-lg); letter-spacing: var(--nd-tracking-label); text-transform: uppercase; }
	.lp-zh { margin-left: 0.6em; font-family: var(--nd-font-cjk); font-weight: 900; font-size: var(--nd-text-sm); letter-spacing: 0.06em; color: var(--nd-accent-2); }
	.cv { margin-top: var(--nd-space-2); }
	.links { display: flex; flex-wrap: wrap; gap: var(--nd-space-1) var(--nd-space-3); margin: 0; padding: 0; list-style: none; }
	.links li + li::before { content: '·'; margin-right: var(--nd-space-3); color: var(--nd-text-mute); }
	.note { color: var(--nd-text-dim); font-size: var(--nd-text-sm); }
	.stack { display: flex; flex-wrap: wrap; gap: var(--nd-space-2); margin-bottom: var(--nd-space-10); }
	@media (max-width: 860px) {
		.poster, .two { grid-template-columns: 1fr; }
		.band :global(.nd-hanzi) { writing-mode: horizontal-tb; }
		.body { padding: var(--nd-space-5) var(--nd-space-5) var(--nd-space-8); }
		.seal { position: static; display: flex; justify-content: flex-end; justify-self: stretch; margin-bottom: var(--nd-space-3); /* in flow on phones: never covers the text */ }
	}
</style>
