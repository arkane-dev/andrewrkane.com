<script lang="ts">
	import '@cyberpunk-apps/neondeck/styles.css';
	import favicon from '#lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { AppShell, Button, Tag } from '@cyberpunk-apps/neondeck';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import { site } from '#lib';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const nav = $derived(
		site.nav.map((n) => ({ label: n.label, href: n.href, active: page.url.pathname.startsWith(n.href) }))
	);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<AppShell brand={site.brand} railCaption="{site.domain.replace('https://', '')} // v{site.version}" {nav}>
	{#snippet actions()}
		<Button size="sm" arrow href="/work">Work with me</Button>
	{/snippet}
	{#snippet status()}
		<span><Tag tone="success" dot>online</Tag></span>
		<span>{page.url.pathname}</span>
		<span class="hide-sm">{site.location}</span>
		<span style="margin-left:auto">v{site.version} // <a href="/rss.xml" style="color:inherit">rss</a></span>
	{/snippet}

	{@render children()}
	<SiteFooter />
</AppShell>

<style>
	/* Text for screen readers only, e.g. "(opens in a new tab)". */
	:global(.visually-hidden) {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}
	@media (max-width: 720px) { .hide-sm { display: none; } }
</style>
