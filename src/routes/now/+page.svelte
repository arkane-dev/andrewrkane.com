<!-- /now: what I'm focused on at the moment (nownownow.com). Personal, dated, short. -->
<script lang="ts">
	import { SectionHeader, NeonSign } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';
	import { now, site, pages } from '#lib';
</script>

<Seo title="Now" description="What {site.owner} is focused on right now." />

<div class="content">
	<div class="head">
		<div>
			<SectionHeader index="01" zh="现在" title="Now" meta="updated {now.updated} · {now.where}" />
			<p class="intro">{pages.now.intro}</p>
		</div>
		<NeonSign text="现在" label="Now" caption="XIAN ZAI" tone="jade" size="2.6rem" flicker />
	</div>

	<section>
		<h3 class="nd-label">Focus</h3>
		<ol class="focus">{#each now.focus as f, i (i)}<li><b>{f.title}</b><span>{f.body}</span></li>{/each}</ol>
	</section>
	<section class="two">
		<div><h3 class="nd-label">Reading</h3><ul>{#each now.reading as r, i (i)}<li>{r}</li>{/each}</ul></div>
		<div><h3 class="nd-label">Not doing</h3><ul>{#each now.notDoing as r, i (i)}<li>{r}</li>{/each}</ul></div>
	</section>
</div>

<style>
	.content { max-width: 56rem; margin: 0 auto; padding: var(--nd-space-12) var(--nd-gutter) 0; display: grid; gap: var(--nd-space-10); }
	.head { display: flex; gap: var(--nd-space-8); align-items: flex-start; justify-content: space-between; }
	.head > div { flex: 1; }
	.intro { color: var(--nd-text-dim); }
	.focus { margin: var(--nd-space-3) 0 0; padding-left: 1.4em; display: grid; gap: var(--nd-space-4); }
	.focus li { padding-left: var(--nd-space-2); } /* stay display:list-item so the numbers render */
	.focus b, .focus span { display: block; }
	.focus span { margin-top: 2px; }
	.focus li::marker { color: var(--nd-accent); font-family: var(--nd-font-mono); }
	.focus b { font-family: var(--nd-font-display); font-size: var(--nd-text-lg); }
	.focus span { color: var(--nd-text-dim); }
	.two { display: grid; grid-template-columns: 1fr 1fr; gap: var(--nd-space-8); }
	ul { padding-left: 1.2em; }
	li::marker { color: var(--nd-accent-2); }
	@media (max-width: 720px) { .head :global(.nd-sign) { display: none; } .two { grid-template-columns: 1fr; } }
</style>
