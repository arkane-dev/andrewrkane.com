<!-- A chapter quiz, then the book's own exercises with their model answers. -->
<script lang="ts">
	import 'katex/dist/katex.min.css';
	import { Panel, SectionHeader } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';
	import Quiz from '#lib/components/Quiz.svelte';

	let { data } = $props();
	const { book, chapter, quiz } = $derived(data);
</script>

<Seo title="Chapter {chapter.number} quiz · {book.title}" description="{quiz.questions.length} questions on {chapter.title}. {quiz.blurb}" />

<div class="content">
	<nav class="crumbs nd-meta" aria-label="Breadcrumb">
		<a href="/books">/books</a> / <a href="/books/{book.slug}">{book.title}</a> / <a href="/books/{book.slug}/quiz">Quizzes</a> / <span>Chapter {chapter.number}</span>
	</nav>

	<header class="head">
		<p class="nd-label">Chapter {chapter.number} quiz · {quiz.questions.length} questions</p>
		<h1>{chapter.title}</h1>
		<p class="lede">{quiz.blurb}</p>
		<p class="nd-meta">Based on <a href="/books/{book.slug}/{chapter.slug}">chapter {chapter.number}</a>. Every answer comes with an explanation and a link back to the section.</p>
	</header>

	<Panel index="Q{chapter.number}" title="Quiz" accent="cyan" cut="md">
		{#key chapter.number}
			<Quiz storageKey="quiz:{book.slug}:{chapter.number}" questions={quiz.questions} ideas={quiz.ideas} />
		{/key}
	</Panel>

	{#if quiz.exercises.length}
		<section class="exercises">
			<SectionHeader index="02" zh="练习" title="From the book" meta="{quiz.exercises.length} exercises" level={3} />
			<p>The chapter's own exercises are open questions. Try one, then compare with the model answer.</p>
			{#each quiz.exercises as ex (ex.id)}
				<article class="ex">
					<p class="nd-label">Exercise {ex.number} <span class="tag nd-mono">[{ex.tag}]</span></p>
					<div class="ex-prompt">{@html ex.prompt}</div>
					<details>
						<summary>Show the model answer</summary>
						<div class="ex-answer">{@html ex.modelAnswer}</div>
					</details>
				</article>
			{/each}
		</section>
	{/if}

	<nav class="pager" aria-label="Quizzes">
		{#if data.prev}<a href="/books/{book.slug}/quiz/{data.prev}"><span class="nd-label">Previous</span> Chapter {data.prev} quiz</a>{:else}<span></span>{/if}
		{#if data.next}<a class="next" href="/books/{book.slug}/quiz/{data.next}"><span class="nd-label">Next</span> Chapter {data.next} quiz</a>{/if}
	</nav>
</div>

<style>
	.content { max-width: 60rem; margin: 0 auto; padding: var(--nd-space-10) var(--nd-gutter) 0; display: grid; gap: var(--nd-space-10); }
	.crumbs a { color: var(--nd-text-dim); }
	h1 { margin: var(--nd-space-2) 0 var(--nd-space-3); font-size: clamp(2rem, 5vw, var(--nd-text-4xl)); }
	.lede { font-size: var(--nd-text-lg); color: var(--nd-text-dim); max-width: 65ch; }
	.head a { color: var(--nd-accent-2); }
	.exercises { display: grid; gap: var(--nd-space-5); }
	.ex { padding: var(--nd-space-4) 0; border-top: 1px solid var(--nd-line); }
	.tag { color: var(--nd-accent); }
	.ex-prompt :global(p:last-child) { margin-bottom: var(--nd-space-2); }
	details summary { cursor: pointer; color: var(--nd-accent-2); font-family: var(--nd-font-ui); font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; font-size: var(--nd-text-sm); min-height: 24px; }
	.ex-answer { margin-top: var(--nd-space-3); padding: var(--nd-space-3) var(--nd-space-4); border-left: 2px solid var(--nd-accent-2); background: var(--nd-surface-1); }
	.ex-answer :global(p:last-child) { margin-bottom: 0; }
	.ex :global(:not(pre) > code) { font-family: var(--nd-font-mono); font-size: 0.9em; color: var(--nd-gold); }
	.pager { display: grid; grid-template-columns: 1fr 1fr; gap: var(--nd-space-4); }
	.pager a { display: grid; gap: var(--nd-space-1); padding: var(--nd-space-4); border: 1px solid var(--nd-line-strong); color: var(--nd-text); text-decoration: none; }
	.pager a:hover { border-color: var(--nd-accent-2); }
	.pager .next { text-align: right; grid-column: 2; }
	@media (max-width: 560px) { .pager { grid-template-columns: 1fr; } .pager .next { grid-column: 1; } }
</style>
