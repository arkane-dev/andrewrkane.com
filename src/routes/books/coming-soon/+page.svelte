<!-- Where placeholder book links go until launch (books.ts: placeholder()). -->
<script lang="ts">
	import { Button, SectionHeader } from '@cyberpunk-apps/neondeck';
	import Seo from '#lib/components/Seo.svelte';
</script>

<Seo title="Coming soon" description="This link isn't live yet." />

<div class="content">
	<SectionHeader index="00" zh="即将" title="Coming soon" />
	<p class="lede">&gt; This link isn't live yet. The print and Kindle editions, the PDF and pay what you want all arrive when the book goes on sale.<span class="nd-cursor"></span></p>
	<ul class="what">
		<li id="amazon"><span class="nd-label">Buy on Amazon</span> The print and Kindle editions, through a link that finds your local store.</li>
		<li id="pdf"><span class="nd-label">Download PDF</span> The whole book as one PDF, free.</li>
		<li id="pay"><span class="nd-label">Pay what you want</span> For readers who found it useful and want to give something back.</li>
	</ul>
	<p>Until then, the whole book is free to read online.</p>
	<div><Button href="/books">Back to the books</Button></div>
</div>

<style>
	.content { max-width: 50rem; margin: 0 auto; padding: var(--nd-space-16) var(--nd-gutter) 0; display: grid; gap: var(--nd-space-5); }
	.lede { font-family: var(--nd-font-mono); color: var(--nd-text-dim); }
	.what { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--nd-space-3); }
	.what li { padding: var(--nd-space-3) var(--nd-space-4); border-left: 2px solid var(--nd-line-strong); scroll-margin-top: calc(var(--nd-topbar-h) + var(--nd-space-6)); }
	.what li:target { border-left-color: var(--nd-accent-2); background: var(--nd-surface-1); }
	.what .nd-label { display: block; margin-bottom: var(--nd-space-1); color: var(--nd-text); }
</style>
