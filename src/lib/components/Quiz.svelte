<!--
	A chapter quiz. One question at a time, an explanation after each answer, and results by idea.
	Questions, options and explanations arrive as HTML, rendered at build time (Markdown, code, maths).
	The best score is kept in this browser only.
-->
<script lang="ts">
	import { tick } from 'svelte';
	import { Button, Meter, Tag } from '@cyberpunk-apps/neondeck';

	interface Link {
		href: string;
		label: string;
	}
	interface Q {
		id: string;
		idea: string;
		level: number;
		type: 'single' | 'multi' | 'numeric';
		prompt: string;
		options: string[];
		answer: number | number[];
		tolerance: number;
		unit: string;
		explanation: string;
		refLinks: Link[];
	}
	interface Props {
		storageKey: string;
		questions: Q[];
		ideas: { id: string; title: string; refLinks: Link[] }[];
	}
	let { storageKey, questions, ideas }: Props = $props();

	// ── order: a seeded shuffle, so the prerendered page and the live page agree, and a retry reshuffles
	function seeded(seed: string) {
		let h = 2166136261;
		for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
		return () => {
			h = Math.imul(h ^ (h >>> 15), 2246822507);
			h = Math.imul(h ^ (h >>> 13), 3266489909);
			return ((h ^= h >>> 16) >>> 0) / 4294967296;
		};
	}
	function shuffled(n: number, seed: string): number[] {
		const rand = seeded(seed);
		const order = Array.from({ length: n }, (_, i) => i);
		for (let i = n - 1; i > 0; i--) {
			const j = Math.floor(rand() * (i + 1));
			[order[i], order[j]] = [order[j], order[i]];
		}
		return order;
	}

	let attempt = $state(0);
	// The page remounts this component per chapter ({#key}), so copying the questions once is intended.
	// svelte-ignore state_referenced_locally
	let pool = $state<number[]>(questions.map((_, i) => i)); // indexes of the questions in this round
	let at = $state(0);
	let chosen = $state<number[]>([]); // option indexes, in the question's own numbering
	let typed = $state('');
	let checked = $state(false);
	let results = $state<Record<string, boolean>>({});
	let done = $state(false);
	let heading: HTMLElement | undefined = $state();
	let feedback: HTMLElement | undefined = $state();

	const q = $derived(questions[pool[at]]);
	const order = $derived(q.type === 'numeric' ? [] : shuffled(q.options.length, `${q.id}:${attempt}`));
	const answers = $derived(Array.isArray(q.answer) ? q.answer : [q.answer]);
	const ready = $derived(q.type === 'numeric' ? parse(typed) !== null : chosen.length > 0);
	const right = $derived(checked && isRight());
	const score = $derived(Object.values(results).filter(Boolean).length);
	const ideaName = (id: string) => ideas.find((i) => i.id === id)?.title ?? id;

	function parse(s: string): number | null {
		const clean = s.replace(/[,\s$£€%]/g, '').replace(/[a-z]+$/i, '');
		if (!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(clean)) return null;
		return Number(clean);
	}

	function isRight(): boolean {
		if (q.type === 'numeric') {
			const v = parse(typed);
			return v !== null && Math.abs(v - (q.answer as number)) <= q.tolerance + 1e-9 * Math.max(1, Math.abs(v));
		}
		const want = [...answers].sort().join(',');
		return [...chosen].sort().join(',') === want;
	}

	function pick(i: number) {
		if (checked) return;
		if (q.type === 'single') chosen = [i];
		else chosen = chosen.includes(i) ? chosen.filter((x) => x !== i) : [...chosen, i];
	}

	async function check() {
		if (!ready || checked) return;
		checked = true;
		results[q.id] = isRight();
		await tick();
		feedback?.focus();
	}

	async function next() {
		if (at + 1 < pool.length) {
			at += 1;
		} else {
			done = true;
			save();
		}
		chosen = [];
		typed = '';
		checked = false;
		await tick();
		heading?.focus();
	}

	async function restart(onlyMissed: boolean) {
		const missed = questions.map((x, i) => (results[x.id] ? -1 : i)).filter((i) => i >= 0);
		pool = onlyMissed && missed.length ? missed : questions.map((_, i) => i);
		if (!onlyMissed) results = {};
		attempt += 1;
		at = 0;
		done = false;
		chosen = [];
		typed = '';
		checked = false;
		await tick();
		heading?.focus();
	}

	// ── best score, in this browser only
	let best = $state<number | null>(null);
	$effect(() => {
		try {
			const raw = localStorage.getItem(storageKey);
			if (raw) best = JSON.parse(raw).best ?? null;
		} catch {
			/* storage blocked: fine */
		}
	});
	function save() {
		const pct = Math.round((100 * score) / questions.length);
		best = Math.max(best ?? 0, pct);
		try {
			localStorage.setItem(storageKey, JSON.stringify({ best, last: pct, at: new Date().toISOString() }));
		} catch {
			/* storage blocked: fine */
		}
	}

	const byIdea = $derived(
		ideas.map((idea) => {
			const qs = questions.filter((x) => x.idea === idea.id);
			const got = qs.filter((x) => results[x.id]).length;
			return { ...idea, got, of: qs.length };
		}).filter((i) => i.of > 0)
	);
	const fmt = (n: number) => (Number.isInteger(n) ? n.toLocaleString('en-GB') : String(n));
</script>

{#if !done}
	<section class="quiz" aria-labelledby="q-heading">
		<div class="top">
			<h2 id="q-heading" class="nd-label" tabindex="-1" bind:this={heading}>Question {at + 1} of {pool.length}</h2>
			<div class="tags"><Tag tone="muted">{ideaName(q.idea)}</Tag><Tag tone="accent-2">Level {q.level}</Tag></div>
		</div>
		<Meter value={(100 * at) / pool.length} showValue={false} segments={pool.length} label="Progress" />

		<div class="prompt">{@html q.prompt}</div>

		{#if q.type === 'numeric'}
			<form class="numeric" onsubmit={(e) => { e.preventDefault(); check(); }}>
				<label for="answer-{q.id}" class="nd-label">Your answer</label>
				<div class="field">
					<input id="answer-{q.id}" type="text" inputmode="decimal" autocomplete="off" bind:value={typed} disabled={checked} aria-describedby={q.unit ? `unit-${q.id}` : undefined} />
					{#if q.unit}<span id="unit-{q.id}" class="unit nd-mono">{q.unit}</span>{/if}
				</div>
			</form>
		{:else}
			<fieldset class="options">
				<legend class="nd-label">{q.type === 'multi' ? 'Select all that apply' : 'Choose one'}</legend>
				{#each order as i (i)}
					{@const isAnswer = answers.includes(i)}
					{@const picked = chosen.includes(i)}
					<label class="option" class:picked class:good={checked && isAnswer} class:bad={checked && picked && !isAnswer}>
						<input type={q.type === 'multi' ? 'checkbox' : 'radio'} name="q-{q.id}" checked={picked} disabled={checked} onchange={() => pick(i)} />
						<span class="mark" aria-hidden="true"></span>
						<span class="text">{@html q.options[i]}</span>
						{#if checked && isAnswer}<span class="verdict nd-mono">correct</span>{:else if checked && picked}<span class="verdict nd-mono">your pick</span>{/if}
					</label>
				{/each}
			</fieldset>
		{/if}

		{#if !checked}
			<div class="actions"><Button onclick={check} disabled={!ready}>Check answer</Button></div>
		{:else}
			<div class="feedback" class:right class:wrong={!right} tabindex="-1" bind:this={feedback} role="status">
				<p class="result">{right ? 'Correct.' : 'Not quite.'}{#if q.type === 'numeric'} The answer is <span class="nd-mono">{fmt(q.answer as number)}{q.unit ? ` ${q.unit}` : ''}</span>{#if q.tolerance}, give or take <span class="nd-mono">{q.tolerance}</span>{/if}.{/if}</p>
				<div class="explanation">{@html q.explanation}</div>
				{#if q.refLinks.length}
					<p class="refs nd-meta">Read more: {#each q.refLinks as r, k (r.href)}{#if k}, {/if}<a href={r.href}>{r.label}</a>{/each}</p>
				{/if}
			</div>
			<div class="actions"><Button onclick={next}>{at + 1 < pool.length ? 'Next question' : 'See results'}</Button></div>
		{/if}
	</section>
{:else}
	<section class="results" aria-labelledby="r-heading">
		<h2 id="r-heading" tabindex="-1" bind:this={heading}>You got {score} of {questions.length}</h2>
		<Meter value={(100 * score) / questions.length} label="Score" meta={best !== null ? `best in this browser: ${best}%` : undefined} />
		<h3 class="nd-label">By idea</h3>
		<ul class="ideas">
			{#each byIdea as idea (idea.id)}
				<li class:weak={idea.got < idea.of}>
					<span class="nd-mono count">{idea.got}/{idea.of}</span>
					<span>{idea.title}</span>
					{#if idea.got < idea.of && idea.refLinks.length}
						<a class="nd-meta" href={idea.refLinks[0].href}>reread {idea.refLinks[0].label}</a>
					{/if}
				</li>
			{/each}
		</ul>
		<div class="actions">
			{#if score < questions.length}<Button onclick={() => restart(true)}>Retry the ones you missed</Button>{/if}
			<Button variant="outline" onclick={() => restart(false)}>Start again</Button>
		</div>
	</section>
{/if}

<style>
	.quiz, .results { display: grid; gap: var(--nd-space-5); }
	.top { display: flex; flex-wrap: wrap; justify-content: space-between; gap: var(--nd-space-3); align-items: center; }
	.top h2 { margin: 0; }
	.tags { display: flex; flex-wrap: wrap; gap: var(--nd-space-2); }
	h2:focus, .feedback:focus { outline: none; }
	h2:focus-visible, .feedback:focus-visible { outline: 2px solid var(--nd-focus); outline-offset: 3px; }

	.prompt { font-size: var(--nd-text-lg); line-height: 1.6; }
	.prompt :global(p) { max-width: 70ch; }
	.prompt :global(pre.shiki), .explanation :global(pre.shiki) { padding: var(--nd-space-4) var(--nd-space-5); overflow-x: auto; border: 1px solid var(--nd-line); border-left: 2px solid var(--nd-accent); font-size: var(--nd-text-sm); line-height: 1.6; }
	.prompt :global(table), .explanation :global(table) { border-collapse: collapse; font-size: var(--nd-text-sm); margin: var(--nd-space-3) 0; display: block; overflow-x: auto; }
	.prompt :global(th), .prompt :global(td), .explanation :global(th), .explanation :global(td) { border-bottom: 1px solid var(--nd-line); padding: var(--nd-space-1) var(--nd-space-3); text-align: left; }
	.prompt :global(:not(pre) > code), .options :global(code), .explanation :global(:not(pre) > code) { font-family: var(--nd-font-mono); font-size: 0.9em; padding: 0 0.25em; background: var(--nd-surface-2); color: var(--nd-gold); overflow-wrap: anywhere; }
	.prompt :global(.katex-display), .explanation :global(.katex-display) { overflow-x: auto; overflow-y: hidden; }

	.options { border: 0; margin: 0; padding: 0; display: grid; gap: var(--nd-space-2); }
	.options legend { margin-bottom: var(--nd-space-2); }
	.option { position: relative; display: grid; grid-template-columns: auto 1fr auto; gap: var(--nd-space-3); align-items: start; padding: var(--nd-space-3) var(--nd-space-4); border: 1px solid var(--nd-line-strong); background: var(--nd-surface-1); cursor: pointer; min-height: 44px; }
	.option:hover { border-color: var(--nd-text-dim); }
	.option input { position: absolute; opacity: 0; width: 1px; height: 1px; }
	.option:has(input:focus-visible) { outline: 2px solid var(--nd-focus); outline-offset: 2px; }
	.mark { width: 14px; height: 14px; margin-top: 0.35em; border: 1px solid var(--nd-line-strong); background: var(--nd-void); }
	.picked .mark { background: var(--nd-accent); border-color: var(--nd-accent); }
	.picked { border-color: var(--nd-accent); }
	.good { border-color: var(--nd-success); background: color-mix(in srgb, var(--nd-success) 10%, var(--nd-surface-1)); }
	.good .mark { border-color: var(--nd-success); }
	.bad { border-color: var(--nd-danger); background: color-mix(in srgb, var(--nd-danger) 10%, var(--nd-surface-1)); }
	.verdict { font-size: var(--nd-text-xs); text-transform: uppercase; letter-spacing: 0.1em; color: var(--nd-text-dim); white-space: nowrap; }
	.good .verdict { color: var(--nd-success); }
	.bad .verdict { color: var(--nd-danger); }
	.option[class*='good'], .option.bad { cursor: default; }

	.numeric { display: grid; gap: var(--nd-space-2); max-width: 24rem; }
	.field { display: flex; align-items: center; gap: var(--nd-space-3); }
	.field input { flex: 1; min-height: 44px; padding: 0 var(--nd-space-3); font-family: var(--nd-font-mono); font-size: var(--nd-text-lg); color: var(--nd-text); background: var(--nd-void); border: 1px solid var(--nd-line-strong); }
	.field input:focus-visible { outline: 2px solid var(--nd-focus); outline-offset: 2px; }
	.unit { color: var(--nd-text-dim); }

	.feedback { padding: var(--nd-space-4) var(--nd-space-5); border-left: 2px solid var(--nd-success); background: var(--nd-surface-1); }
	.feedback.wrong { border-left-color: var(--nd-danger); }
	.result { font-weight: 700; margin: 0 0 var(--nd-space-2); }
	.right .result { color: var(--nd-success); }
	.wrong .result { color: var(--nd-danger); }
	.explanation :global(p:last-child) { margin-bottom: 0; }
	.refs { margin: var(--nd-space-3) 0 0; }
	.refs a { color: var(--nd-accent-2); }
	.actions { display: flex; flex-wrap: wrap; gap: var(--nd-space-3); }

	.results h2 { margin: 0; font-size: var(--nd-text-3xl); }
	.ideas { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--nd-space-2); }
	.ideas li { display: flex; flex-wrap: wrap; gap: var(--nd-space-3); align-items: baseline; padding: var(--nd-space-2) 0; border-bottom: 1px solid var(--nd-line); }
	.count { color: var(--nd-success); min-width: 3.5ch; }
	.weak .count { color: var(--nd-warning); }
	.ideas a { color: var(--nd-accent-2); margin-left: auto; }
</style>
