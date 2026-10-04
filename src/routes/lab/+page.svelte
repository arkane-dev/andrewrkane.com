<!-- The Lab: the personal, exploratory half. Unfinished on purpose. -->
<script lang="ts">
	import { SectionHeader, Tag } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';
	import StatusTag from '#lib/components/StatusTag.svelte';
	import { lab, pages } from '#lib';
</script>

<Seo title="Lab" description={pages.lab.description} />

<div class="content">
	<SectionHeader index="01" zh="实验室" title="Lab" meta="unfinished on purpose" />
	<p class="intro">{pages.lab.intro}</p>

	<ol class="log">
		{#each lab as e, i (e.title + i)}
			<li>
				<span class="nd-mono date">{e.date}</span>
				<div>
					<h3>{#if e.zh}<span class="zh" lang="zh-Hans">{e.zh}</span>{/if}{e.title}</h3>
					<p>{e.summary}</p>
					<div class="tags"><StatusTag status={e.status} />{#each e.tags as t (t)}<Tag tone="muted">{t}</Tag>{/each}{#if e.href}<a href={e.href}>open →</a>{/if}</div>
				</div>
			</li>
		{/each}
	</ol>
</div>

<style>
	.content { max-width: 60rem; margin: 0 auto; padding: var(--nd-space-12) var(--nd-gutter) 0; }
	.intro { color: var(--nd-text-dim); }
	.log { list-style: none; margin: var(--nd-space-8) 0 0; padding: 0 0 0 var(--nd-space-6); border-left: 1px dashed var(--nd-line-strong); display: grid; gap: var(--nd-space-8); }
	li { position: relative; display: grid; gap: var(--nd-space-1); }
	li::before { content: ''; position: absolute; left: calc(var(--nd-space-6) * -1 - 4px); top: 0.4em; width: 7px; height: 7px; background: var(--nd-accent); }
	.date { color: var(--nd-text-mute); font-size: var(--nd-text-xs); }
	h3 { margin: 0; font-size: var(--nd-text-lg); text-transform: none; }
	.zh { margin-right: 0.5em; font-family: var(--nd-font-cjk); color: var(--nd-accent); }
	p { margin: var(--nd-space-1) 0 var(--nd-space-2); color: var(--nd-text-dim); }
	.tags { display: flex; flex-wrap: wrap; gap: var(--nd-space-2); align-items: center; }
</style>
