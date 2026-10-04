<!--
  Landing. Business half: positioning, featured work, services CTA.
  Personal half: "now", latest writing, the lab.
-->
<script lang="ts">
	import { Button, SectionHeader, MoonScroll, GlitchText, Panel, Tag } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import PostList from '#lib/components/PostList.svelte';
	import StatusTag from '#lib/components/StatusTag.svelte';
	import { site, projects, tools, books, series, now, work, lab } from '#lib';

	let { data } = $props();
	const featured = projects.filter((p) => p.featured).slice(0, 4);
</script>

<Seo />

<section class="hero nd-grid-bg">
	<div class="hero-text">
		<p class="nd-meta">{site.hero.kicker}</p>
		<h1 class="hero-title"><GlitchText text={site.hero.line1} /><br /><span class="nd-neon">{site.hero.line2}</span></h1>
		<p class="positioning">{site.hero.positioning}</p>
		<p class="personal nd-neon-2">{site.hero.personal}</p>
		<div class="row">
			<Button size="lg" arrow href="/blog" sub="latest writing">Read the blog</Button>
			<Button size="lg" variant="outline" href="/work">Work with me</Button>
		</div>
	</div>
	<div class="hero-visual nd-brackets nd-fog">
		<span class="scn nd-meta">/01</span>
		<MoonScroll text={site.hero.zh} label={site.hero.meaning} caption={site.hero.pinyin} size="clamp(15rem, 28vw, 25rem)" />
		<span class="scn2 nd-meta">//{site.location.toUpperCase()}</span>
	</div>
</section>

<div class="content">
	<!-- NOW: the personal heartbeat, one line per focus -->
	<section>
		<SectionHeader index="02" zh="现在" title="Now" meta="updated {now.updated}" />
		<ul class="now">
			{#each now.focus as f, i (i)}
				<li><span class="nd-index">0{i + 1}</span><b>{f.title}</b><span>{f.body}</span></li>
			{/each}
		</ul>
		<a class="more" href="/now">Everything I'm focused on →</a>
	</section>

	<!-- PROJECTS: proof of work -->
	<section>
		<SectionHeader index="03" zh="项目" title="Projects" meta="{projects.length} total" />
		<div class="grid4">
			{#each featured as p, i (p.slug)}<ProjectCard project={p} index="0{i + 1}" />{/each}
		</div>
		<a class="more" href="/projects">All projects, code and downloads →</a>
	</section>

	<!-- WRITING -->
	<section>
		<SectionHeader index="04" zh="文章" title="Writing" meta="rss" />
		<PostList posts={data.posts} />
		<a class="more" href="/blog">All posts →</a>
	</section>

	<!-- TOOLS + BOOKS -->
	<section class="split">
		<div>
			<SectionHeader index="05" zh="工具" title="Tools" level={3} />
			{#each tools as t (t.slug)}
				<a class="line" href={t.status === 'idea' && t.project ? `/projects/${t.project}` : t.href}><b>{t.name}</b><span>{t.summary}</span><StatusTag status={t.status} /></a>
			{/each}
		</div>
		<div>
			<SectionHeader index="06" zh="书籍" title="Books" level={3} />
			<p class="series">{series.title}</p>
			{#each books as b (b.slug)}
				<a class="line" href="/books#{b.slug}"><b>Vol. {b.volume} · {b.title}</b><span>{b.chapters} chapters</span><StatusTag status={b.status} /></a>
			{/each}
		</div>
	</section>

	<!-- WORK WITH ME: the business CTA -->
	<section>
		<SectionHeader index="07" zh="合作" title="Work with me" />
		<Panel title="Available for work" index="08" accent="cyan" active>
			<div class="cta">
				<div>
					<Tag tone="success" dot>{work.availability}</Tag>
					<p class="lede">{work.intro}</p>
					<ul class="svc">{#each work.services as s (s.title)}<li>{s.title}</li>{/each}</ul>
				</div>
				<div class="row">
					<Button arrow href="/work">How I work</Button>
					<Button variant="outline" href={work.cta.href}>{work.cta.label}</Button>
				</div>
			</div>
		</Panel>
	</section>

	<!-- LAB teaser: the exploring half -->
	<section>
		<SectionHeader index="09" zh="实验室" title="From the lab" meta="experiments · unfinished on purpose" />
		<div class="lab">
			{#each lab.slice(0, 3) as e (e.title)}
				<div class="exp"><span class="nd-meta">{e.date}</span><b>{e.title}</b><p>{e.summary}</p><StatusTag status={e.status} /></div>
			{/each}
		</div>
		<a class="more" href="/lab">Enter the lab →</a>
	</section>
</div>

<style>
	.hero { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); min-height: 72vh; border-bottom: 1px solid var(--nd-line); }
	.hero-text { padding: var(--nd-space-16) var(--nd-gutter); border-right: 1px solid var(--nd-line); background: linear-gradient(90deg, var(--nd-bg) 60%, transparent); }
	.hero-title { font-size: var(--nd-text-hero); line-height: 0.92; margin-bottom: var(--nd-space-6); }
	.positioning { font-size: var(--nd-text-xl); line-height: 1.35; max-width: 32ch; color: var(--nd-text); }
	.personal { font-family: var(--nd-font-mono); font-size: var(--nd-text-sm); }
	.row { display: flex; flex-wrap: wrap; gap: var(--nd-space-4); align-items: center; }
	.hero-visual { --nd-bracket-color: var(--nd-accent); position: relative; display: grid; place-items: center; margin: var(--nd-space-8); overflow: hidden; }
	.scn { position: absolute; top: var(--nd-space-4); left: var(--nd-space-4); color: var(--nd-accent); }
	.scn2 { position: absolute; bottom: var(--nd-space-4); right: var(--nd-space-4); }

	.content { max-width: var(--nd-content-max); margin: 0 auto; padding: var(--nd-space-16) var(--nd-gutter) 0; display: grid; gap: var(--nd-space-24); }
	.more { display: inline-block; margin-top: var(--nd-space-4); font-family: var(--nd-font-ui); font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; font-size: var(--nd-text-sm); }

	.now { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); border-block: 1px solid var(--nd-line); }
	.now li { display: grid; gap: var(--nd-space-1); padding: var(--nd-space-5); border-right: 1px solid var(--nd-line); }
	.now li:last-child { border-right: 0; }
	.now b { color: var(--nd-accent-2); font-family: var(--nd-font-ui); letter-spacing: 0.06em; text-transform: uppercase; }
	.now span:last-child { color: var(--nd-text-dim); font-size: var(--nd-text-sm); }

	.grid4 { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--nd-space-5); }

	.split { display: grid; grid-template-columns: 1fr 1fr; gap: var(--nd-space-12); }
	.series { color: var(--nd-text-dim); font-style: italic; margin-top: calc(var(--nd-space-2) * -1); }
	.line { display: grid; grid-template-columns: 1fr auto; gap: 0 var(--nd-space-3); padding: var(--nd-space-3) 0; border-bottom: 1px solid var(--nd-line); color: var(--nd-text); text-decoration: none; }
	.line:hover { text-shadow: none; background: var(--nd-accent-tint); }
	.line b { font-family: var(--nd-font-display); }
	.line span { grid-column: 1; color: var(--nd-text-dim); font-size: var(--nd-text-sm); }
	.line :global(.nd-tag) { grid-column: 2; grid-row: 1 / span 2; align-self: center; }

	.cta { display: flex; flex-wrap: wrap; gap: var(--nd-space-8); justify-content: space-between; align-items: end; }
	.lede { color: var(--nd-text-dim); margin-top: var(--nd-space-3); }
	.svc { display: flex; flex-wrap: wrap; gap: var(--nd-space-2) var(--nd-space-6); margin: 0; padding: 0; list-style: none; font-family: var(--nd-font-ui); font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
	.svc li::before { content: '+ '; color: var(--nd-accent); }

	.lab { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--nd-space-5); }
	.exp { display: grid; gap: var(--nd-space-2); align-content: start; justify-items: start; padding: var(--nd-space-5); border: 1px dashed var(--nd-line-strong); }
	.exp p { margin: 0; color: var(--nd-text-dim); font-size: var(--nd-text-sm); }

	@media (max-width: 1100px) { .grid4 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
	@media (max-width: 960px) {
		.hero { grid-template-columns: 1fr; }
		.hero-visual { min-height: 30rem; }
		.hero-visual :global(.nd-moonscroll) { --moon: min(16rem, 70vw) !important; }
		.now, .lab, .split { grid-template-columns: 1fr; }
		.now li { border-right: 0; border-bottom: 1px solid var(--nd-line); }
	}
	@media (max-width: 600px) { .grid4 { grid-template-columns: 1fr; } }
</style>
