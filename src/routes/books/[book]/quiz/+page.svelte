<!-- All the chapter quizzes for one book, with your best score from this browser. -->
<script lang="ts">
	import { Panel, SectionHeader } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';

	let { data } = $props();
	const { book, quizzes } = $derived(data);
	const total = $derived(quizzes.reduce((n, q) => n + q.questions, 0));
	let best = $state<Record<number, number>>({});
	$effect(() => {
		const found: Record<number, number> = {};
		for (const q of quizzes) {
			try {
				const raw = localStorage.getItem(`quiz:${book.slug}:${q.chapter}`);
				if (raw) found[q.chapter] = JSON.parse(raw).best;
			} catch {
				/* storage blocked: fine */
			}
		}
		best = found;
	});
</script>

<Seo title="Quizzes · {book.title}" description="{quizzes.length} chapter quizzes, {total} questions, for {book.title}. Every answer explained." />

<div class="content">
	<nav class="crumbs nd-meta" aria-label="Breadcrumb"><a href="/books">/books</a> / <a href="/books/{book.slug}">{book.title}</a> / <span>Quizzes</span></nav>
	<SectionHeader index="01" zh="测验" title="Chapter quizzes" meta="{quizzes.length} quizzes · {total} questions" />
	<p class="lede">Test what stuck from each chapter of {book.title}. Every answer comes with an explanation and a link back to the section. Scores stay in your browser.</p>
	<div class="grid">
		{#each quizzes as q (q.chapter)}
			<Panel index={String(q.chapter).padStart(2, '0')} title={q.title} meta="{q.questions} q" cut="sm">
				<p class="blurb">{q.blurb}</p>
				<div class="row">
					<a class="go" href="/books/{book.slug}/quiz/{q.chapter}">Take the quiz<span class="sr-only">: chapter {q.chapter}, {q.title}</span> ↗</a>
					{#if best[q.chapter] !== undefined}<span class="nd-meta">best {best[q.chapter]}%</span>{/if}
				</div>
			</Panel>
		{/each}
	</div>
</div>

<style>
	.content { max-width: var(--nd-content-max); margin: 0 auto; padding: var(--nd-space-10) var(--nd-gutter) 0; display: grid; gap: var(--nd-space-6); }
	.crumbs a { color: var(--nd-text-dim); }
	.lede { max-width: 65ch; color: var(--nd-text-dim); }
	.grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: var(--nd-space-5); }
	.blurb { font-size: var(--nd-text-sm); color: var(--nd-text-dim); }
	.row { display: flex; justify-content: space-between; align-items: center; gap: var(--nd-space-3); }
	.go { color: var(--nd-accent-2); font-family: var(--nd-font-ui); font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; font-size: var(--nd-text-sm); text-decoration: none; min-height: 24px; display: inline-flex; align-items: center; }
	.go:hover { text-decoration: underline; }
	.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
	@media (max-width: 1000px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
	@media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }
</style>
