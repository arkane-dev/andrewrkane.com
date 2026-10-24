<!-- One chapter of a web edition. The text is Quarto's HTML, styled here for the paper surface. -->
<script lang="ts">
	import 'katex/dist/katex.min.css';
	import { Button, Panel } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';
	import { chapterLabel } from '#lib/books/index.js';

	let { data } = $props();
	const { book, chapter } = $derived(data);
	const label = $derived(chapterLabel(chapter));
	const toc = $derived(chapter.sections.filter((s) => s.level === 2));
	const minutes = $derived(Math.max(1, Math.round(chapter.words / 230)));

	/** Wide tables, display maths and code scroll sideways. Make the ones that do reachable by keyboard. */
	function scrollRegions(node: HTMLElement) {
		const mark = () => {
			for (const el of node.querySelectorAll<HTMLElement>('table, .katex-display, pre')) {
				const scrolls = el.scrollWidth > el.clientWidth + 1;
				if (scrolls && !el.hasAttribute('tabindex')) {
					el.setAttribute('tabindex', '0');
					el.setAttribute('role', 'region');
					el.setAttribute('aria-label', el.matches('table') ? 'Table, scrolls sideways' : el.matches('pre') ? 'Code, scrolls sideways' : 'Equation, scrolls sideways');
				} else if (!scrolls && el.getAttribute('role') === 'region') {
					el.removeAttribute('tabindex');
					el.removeAttribute('role');
					el.removeAttribute('aria-label');
				}
			}
		};
		mark();
		const ro = new ResizeObserver(mark);
		ro.observe(node);
		return { destroy: () => ro.disconnect() };
	}
</script>

<Seo title="{label ? `${label}: ` : ''}{chapter.title} · {book.title}" description="{book.title}, {label || chapter.title}. Free to read online." type="article" />

<div class="content">
	<nav class="crumbs nd-meta" aria-label="Breadcrumb">
		<a href="/books">/books</a> / <a href="/books/{book.slug}">{book.title}</a>{#if label}{' '}/ <span>{label}</span>{/if}
	</nav>

	<div class="layout">
		<aside class="side">
			<details class="toc" open>
				<summary class="nd-label">On this page</summary>
				<ol>
					{#each toc as s (s.id)}
						<li><a href="#{s.id}"><span class="nd-mono">{s.number}</span> {s.title}</a></li>
					{/each}
				</ol>
			</details>
			<p class="nd-meta">{chapter.words.toLocaleString('en-GB')} words · {minutes} min</p>
		</aside>

		<article class="chapter nd-paper">
			<header>
				{#if label}<p class="nd-label">{label}</p>{/if}
				<h1>{chapter.title}</h1>
			</header>
			<div class="chapter-text" use:scrollRegions>{@html data.html}</div>
		</article>
	</div>

	<footer class="after">
		{#if data.hasQuiz}
			<Panel title="Test yourself" index="Q" accent="cyan" cut="sm">
				<p>Check what stuck from {label.toLowerCase()} before you move on. The quiz explains every answer and links back to the section.</p>
				<Button href="/books/{book.slug}/quiz/{chapter.number}" arrow>Take the chapter {chapter.number} quiz</Button>
			</Panel>
		{/if}
		<nav class="pager" aria-label="Chapters">
			{#if data.prev}
				<a class="prev" href="/books/{book.slug}/{data.prev.slug}"><span class="nd-label">Previous</span><span>{chapterLabel(data.prev) ? `${chapterLabel(data.prev)}: ` : ''}{data.prev.title}</span></a>
			{:else}<span></span>{/if}
			{#if data.next}
				<a class="next" href="/books/{book.slug}/{data.next.slug}"><span class="nd-label">Next</span><span>{chapterLabel(data.next) ? `${chapterLabel(data.next)}: ` : ''}{data.next.title}</span></a>
			{/if}
		</nav>
	</footer>
</div>

<style>
	.content { max-width: var(--nd-content-max); margin: 0 auto; padding: var(--nd-space-10) var(--nd-gutter) 0; }
	.crumbs { margin-bottom: var(--nd-space-6); }
	.crumbs a { color: var(--nd-text-dim); }
	.layout { display: grid; grid-template-columns: 15rem minmax(0, 1fr); gap: var(--nd-space-8); align-items: start; }
	.side { position: sticky; top: calc(var(--nd-topbar-h) + var(--nd-space-6)); max-height: calc(100vh - var(--nd-topbar-h) - var(--nd-space-12)); overflow: auto; }
	.toc summary { cursor: pointer; margin-bottom: var(--nd-space-3); }
	.toc ol { list-style: none; margin: 0 0 var(--nd-space-4); padding: 0; font-size: var(--nd-text-sm); }
	.toc li { margin: 0; }
	.toc a { display: block; padding: var(--nd-space-1) 0; min-height: 24px; color: var(--nd-text-dim); text-decoration: none; }
	.toc a:hover { color: var(--nd-text); }
	.toc .nd-mono { color: var(--nd-accent); margin-right: var(--nd-space-1); }

	.chapter { padding: var(--nd-space-12) var(--nd-space-10) var(--nd-space-10); min-width: 0; }
	.chapter header { margin-bottom: var(--nd-space-8); padding-bottom: var(--nd-space-6); border-bottom: 1px solid var(--nd-line); }
	h1 { margin: var(--nd-space-2) 0 0; font-size: clamp(2rem, 5vw, var(--nd-text-4xl)); color: var(--nd-ink); text-transform: none; }

	/* ── Quarto's HTML on paper ── */
	.chapter-text { font-size: 1.0625rem; line-height: 1.7; max-width: 72ch; }
	.chapter-text :global(p) { max-width: none; }
	.chapter-text :global(section) { scroll-margin-top: calc(var(--nd-topbar-h) + var(--nd-space-4)); }
	.chapter-text :global(h2) { margin: var(--nd-space-12) 0 var(--nd-space-4); font-size: var(--nd-text-2xl); color: var(--nd-ink); }
	.chapter-text :global(h3) { margin: var(--nd-space-8) 0 var(--nd-space-3); font-size: var(--nd-text-xl); color: var(--nd-cinnabar); }
	.chapter-text :global(h4) { margin: var(--nd-space-6) 0 var(--nd-space-2); font-size: var(--nd-text-lg); color: var(--nd-ink); }
	.chapter-text :global(.header-section-number) { font-family: var(--nd-font-mono); font-weight: 600; margin-right: 0.5em; color: var(--nd-cinnabar); }
	.chapter-text :global(a) { color: var(--nd-ink); text-decoration-thickness: 1px; }
	.chapter-text :global(a:hover) { color: var(--nd-cinnabar); }
	.chapter-text :global(ul), .chapter-text :global(ol) { padding-left: 1.4em; }
	.chapter-text :global(li) { margin: var(--nd-space-1) 0; }
	.chapter-text :global(li::marker) { color: var(--nd-cinnabar); }
	.chapter-text :global(blockquote) { margin: var(--nd-space-6) 0; padding: var(--nd-space-3) var(--nd-space-5); border-left: 2px solid var(--nd-cinnabar); background: color-mix(in srgb, var(--nd-ink) 6%, transparent); }
	.chapter-text :global(:not(pre) > code) { padding: 0 0.25em; background: var(--nd-paper-dim); color: var(--nd-ink); font-size: 0.9em; overflow-wrap: anywhere; }

	/* Maths: KaTeX at the text colour, and display maths scrolls instead of overflowing on phones. */
	.chapter-text :global(.katex) { color: var(--nd-ink); font-size: 1.05em; }
	.chapter-text :global(.katex-display) { overflow-x: auto; overflow-y: hidden; padding: var(--nd-space-2) 0; }

	/* Code: a dark well, as on the blog. Pandoc token classes in the NEONDECK code colours (all ≥4.5:1 on void). */
	.chapter-text :global(div.sourceCode) { margin: var(--nd-space-4) 0 var(--nd-space-6); background: var(--nd-void); border-left: 2px solid var(--nd-cinnabar); }
	.chapter-text :global(pre:not(.sourceCode)) { margin: var(--nd-space-4) 0 var(--nd-space-6); padding: var(--nd-space-4) var(--nd-space-5); overflow-x: auto; background: var(--nd-void); color: #ecebff; border-left: 2px solid var(--nd-cinnabar); font-size: var(--nd-text-sm); line-height: 1.6; }
	.chapter-text :global(pre:not(.sourceCode) code) { font-family: var(--nd-font-mono); background: none; padding: 0; color: inherit; }
	.chapter-text :global([role='region']:focus-visible) { outline: 2px solid var(--nd-ink); outline-offset: 2px; }
	.chapter-text :global(pre.sourceCode) { margin: 0; padding: var(--nd-space-4) var(--nd-space-5); overflow-x: auto; color: #ecebff; background: transparent; font-size: var(--nd-text-sm); line-height: 1.6; }
	.chapter-text :global(pre.sourceCode code) { font-family: var(--nd-font-mono); background: none; padding: 0; color: inherit; }
	.chapter-text :global(pre.sourceCode code > span) { display: block; min-height: 1.6em; }
	.chapter-text :global(.sourceCode .kw), .chapter-text :global(.sourceCode .cf), .chapter-text :global(.sourceCode .im) { color: #ff2bd6; }
	.chapter-text :global(.sourceCode .st), .chapter-text :global(.sourceCode .ss), .chapter-text :global(.sourceCode .vs), .chapter-text :global(.sourceCode .ch) { color: #3ff0b8; }
	.chapter-text :global(.sourceCode .dv), .chapter-text :global(.sourceCode .bn), .chapter-text :global(.sourceCode .fl), .chapter-text :global(.sourceCode .cn) { color: #f6bd6a; }
	.chapter-text :global(.sourceCode .co), .chapter-text :global(.sourceCode .do), .chapter-text :global(.sourceCode .an), .chapter-text :global(.sourceCode .cv), .chapter-text :global(.sourceCode .in) { color: #8885b9; font-style: italic; }
	.chapter-text :global(.sourceCode .fu), .chapter-text :global(.sourceCode .bu) { color: #22f2f7; }
	.chapter-text :global(.sourceCode .dt) { color: #a66bff; }
	.chapter-text :global(.sourceCode .op), .chapter-text :global(.sourceCode .sc), .chapter-text :global(.sourceCode .ot) { color: #a49fd9; }
	.chapter-text :global(.sourceCode .at) { color: #f5ec58; }
	.chapter-text :global(.sourceCode .al), .chapter-text :global(.sourceCode .er) { color: #ff3b52; }
	.chapter-text :global(.sourceCode .pp) { color: #ff5fb4; }

	/* Listings, figures and tables */
	.chapter-text :global(figure) { margin: var(--nd-space-6) 0; }
	.chapter-text :global(figcaption) { font-family: var(--nd-font-ui); font-weight: 600; letter-spacing: 0.04em; font-size: var(--nd-text-sm); color: var(--nd-ink); margin: var(--nd-space-2) 0; }
	.chapter-text :global(img) { max-width: 100%; height: auto; background: #fff; }
	.chapter-text :global(.quarto-figure-center) { text-align: center; }
	.chapter-text :global(table) { width: 100%; margin: var(--nd-space-6) 0; border-collapse: collapse; font-size: var(--nd-text-sm); display: block; overflow-x: auto; }
	.chapter-text :global(th) { text-align: left; font-family: var(--nd-font-ui); text-transform: uppercase; letter-spacing: 0.1em; font-size: var(--nd-text-xs); border-bottom: 1px solid var(--nd-ink); padding: var(--nd-space-2) var(--nd-space-3); }
	.chapter-text :global(td) { border-bottom: 1px solid var(--nd-line); padding: var(--nd-space-2) var(--nd-space-3); vertical-align: top; }
	.chapter-text :global(caption) { caption-side: top; text-align: left; font-family: var(--nd-font-ui); font-weight: 600; color: var(--nd-ink); padding-bottom: var(--nd-space-2); }

	/* Callouts: a paper-dim panel with a cinnabar rule. Quarto's icons need Bootstrap, so they go. */
	.chapter-text :global(.callout), .chapter-text :global(.callout-aws) { margin: var(--nd-space-6) 0; padding: var(--nd-space-4) var(--nd-space-5); background: var(--nd-paper-dim); border-left: 2px solid var(--nd-cinnabar); }
	.chapter-text :global(.callout-icon-container), .chapter-text :global(.callout-aws-icon) { display: none; }
	.chapter-text :global(.callout-title-container), .chapter-text :global(.callout-aws-title) { font-family: var(--nd-font-ui); font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; font-size: var(--nd-text-sm); margin-bottom: var(--nd-space-2); color: var(--nd-ink); }
	.chapter-text :global(.callout-body > :last-child) { margin-bottom: 0; }
	.chapter-text :global(.screen-reader-only) { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

	/* Exercise tags [W] [A] [E] [R], references */
	.chapter-text :global(.ex-tag) { font-family: var(--nd-font-mono); font-size: 0.85em; color: var(--nd-cinnabar); margin-right: 0.35em; }
	.chapter-text :global(.references) { font-size: var(--nd-text-sm); }
	.chapter-text :global(.csl-entry) { margin: var(--nd-space-2) 0; padding-left: 1.5em; text-indent: -1.5em; }
	.chapter-text :global(.quarto-xref) { white-space: nowrap; }

	.after { display: grid; gap: var(--nd-space-8); margin: var(--nd-space-12) auto 0; max-width: 60rem; }
	.after :global(.nd-btn) { margin-top: var(--nd-space-3); }
	.pager { display: grid; grid-template-columns: 1fr 1fr; gap: var(--nd-space-4); }
	.pager a { display: grid; gap: var(--nd-space-1); padding: var(--nd-space-4); border: 1px solid var(--nd-line-strong); color: var(--nd-text); text-decoration: none; }
	.pager a:hover { border-color: var(--nd-accent-2); }
	.pager .next { text-align: right; grid-column: 2; }

	@media (max-width: 960px) {
		.layout { grid-template-columns: 1fr; }
		.side { position: static; max-height: none; }
		.toc:not([open]) summary { margin-bottom: 0; }
		.chapter { padding: var(--nd-space-6) var(--nd-space-5) var(--nd-space-8); }
	}
	@media (max-width: 560px) { .pager { grid-template-columns: 1fr; } .pager .next { grid-column: 1; } }
</style>
