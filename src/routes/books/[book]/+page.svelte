<!-- A book's front page: what it is, the ways to get it, and the contents with a quiz per chapter. -->
<script lang="ts">
	import { Button, NeonSign, SectionHeader } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';
	import { chapterLabel } from '#lib/books/index.js';

	let { data } = $props();
	const { book, meta } = $derived(data);
	const quizFor = $derived(new Map(data.quizzes.map((q) => [String(q.chapter), q.questions])));
	const front = $derived(book.chapters.filter((c) => c.kind === 'front'));
	const chapters = $derived(book.chapters.filter((c) => c.kind === 'chapter'));
	const appendices = $derived(book.chapters.filter((c) => c.kind === 'appendix'));
	const words = $derived(book.chapters.reduce((n, c) => n + c.words, 0));
	const totalQuestions = $derived(data.quizzes.reduce((n, q) => n + q.questions, 0));
	const first = $derived(front[0] ?? chapters[0]);
</script>

<Seo title={book.title} description="{book.subtitle}. {meta.summary}" />

<div class="content">
	<a class="back nd-meta" href="/books">&lt; /books</a>

	<header class="cover nd-paper">
		<div class="sign"><NeonSign text={meta.zh ?? ''} label={book.title} caption="VOL {meta.volume}" tone={meta.tone} size="2.4rem" /></div>
		<div class="text">
			<p class="nd-label">{book.subtitle}</p>
			<h1>{book.title}</h1>
			<p class="by">{book.author}</p>
			<p class="lede">{meta.summary}</p>
			<p class="nd-meta stats">{chapters.length} chapters · {appendices.length} appendices · {Math.round(words / 1000)}k words{#if totalQuestions}{' · '}{totalQuestions} quiz questions{/if}</p>
			<div class="actions">
				<Button href="/books/{book.slug}/{first.slug}">Read online</Button>
				{#if meta.pdfHref}<Button variant="outline" href={meta.pdfHref}>Download PDF</Button>{:else}<Button variant="outline" disabled>Download PDF</Button>{/if}
				{#if meta.buyHref}<Button variant="outline" arrow href={meta.buyHref} rel="external sponsored noopener">Buy on Amazon</Button><span class="paid nd-meta">(paid link)</span>{:else}<Button variant="outline" disabled>Buy on Amazon</Button>{/if}
				{#if meta.quizHref}<Button variant="ghost" href={meta.quizHref}>Chapter quizzes</Button>{/if}
			</div>
			{#if meta.payHref}
				<p class="pay">
					Free to read, here and as a PDF. If it helped, <a href={meta.payHref}>pay what you want</a>. The print and Kindle editions are on Amazon.
				</p>
			{:else if meta.pdfHref && meta.buyHref}
				<p class="pay">Free to read, here and as a PDF. The print and Kindle editions are on Amazon.</p>
			{:else if meta.pdfHref}
				<p class="pay">Free to read, here and as a PDF. The print and Kindle editions are coming soon.</p>
			{:else if meta.buyHref}
				<p class="pay">Free to read online. The PDF is coming soon.</p>
			{:else}
				<p class="pay">Free to read online. The PDF and the print and Kindle editions are coming soon.</p>
			{/if}
		</div>
	</header>

	<section>
		<SectionHeader index="01" zh="目录" title="Contents" meta="{chapters.length} chapters" />
		<ol class="toc">
			{#each front as c (c.slug)}
				<li class="row"><a href="/books/{book.slug}/{c.slug}">{c.title}</a></li>
			{/each}
			{#each chapters as c (c.slug)}
				<li class="row">
					<span class="num nd-mono">{c.number?.padStart(2, '0')}</span>
					<a href="/books/{book.slug}/{c.slug}">{c.title}</a>
					{#if quizFor.has(c.number ?? '')}
						<a class="quiz nd-meta" href="/books/{book.slug}/quiz/{c.number}" aria-label="Quiz for chapter {c.number}: {quizFor.get(c.number ?? '')} questions">quiz · {quizFor.get(c.number ?? '')} q</a>
					{/if}
				</li>
			{/each}
			{#each appendices as c (c.slug)}
				<li class="row"><span class="num nd-mono">{chapterLabel(c).replace('Appendix ', '')}</span><a href="/books/{book.slug}/{c.slug}">{c.title}</a></li>
			{/each}
		</ol>
	</section>
</div>

<style>
	.content { max-width: var(--nd-content-max); margin: 0 auto; padding: var(--nd-space-12) var(--nd-gutter) 0; display: grid; gap: var(--nd-space-12); }
	.back { text-decoration: none; }
	.cover { display: grid; grid-template-columns: auto 1fr; gap: var(--nd-space-8); padding: var(--nd-space-12) var(--nd-space-10); }
	.sign { padding: var(--nd-space-4); background: var(--nd-ink); align-self: start; }
	h1 { margin: var(--nd-space-2) 0 var(--nd-space-2); font-size: clamp(2.25rem, 6vw, var(--nd-text-5xl)); color: var(--nd-ink); }
	.by { margin: 0 0 var(--nd-space-6); font-weight: 600; }
	.lede { max-width: 60ch; font-size: var(--nd-text-lg); }
	.stats { margin: var(--nd-space-4) 0 var(--nd-space-6); }
	.actions { display: flex; flex-wrap: wrap; gap: var(--nd-space-3); align-items: center; }
	.pay { max-width: 60ch; margin-top: var(--nd-space-6); }
	.pay a { color: var(--nd-ink); font-weight: 600; }
	.toc { list-style: none; margin: 0; padding: 0; columns: 2; column-gap: var(--nd-space-10); }
	.row { display: flex; gap: var(--nd-space-3); align-items: baseline; padding: var(--nd-space-2) 0; border-bottom: 1px solid var(--nd-line); break-inside: avoid; }
	.num { color: var(--nd-accent); min-width: 2ch; }
	.row > a:not(.quiz) { flex: 1; color: var(--nd-text); text-decoration: none; }
	.row > a:not(.quiz):hover { color: var(--nd-accent-2); }
	.quiz { color: var(--nd-accent-2); text-decoration: none; white-space: nowrap; padding: 2px 0; min-height: 24px; }
	.quiz:hover { text-decoration: underline; }
	@media (max-width: 900px) {
		.cover { grid-template-columns: 1fr; padding: var(--nd-space-6) var(--nd-space-5); }
		.sign { justify-self: start; }
		.toc { columns: 1; }
	}
</style>
