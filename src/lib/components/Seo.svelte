<!-- Per-page <head>: title, description, canonical URL and link-preview (Open Graph) tags. -->
<script lang="ts">
	import { page } from '$app/state';
	import { site } from '#lib';

	interface Props {
		title?: string; // page title; omit on the landing page
		description?: string;
		type?: 'website' | 'article';
	}
	let { title, description = site.description, type = 'website' }: Props = $props();
	const full = $derived(title ? `${title} · ${site.title}` : site.title);
	const url = $derived(`${site.domain}${page.url.pathname}`);
</script>

<svelte:head>
	<title>{full}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={full} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta name="twitter:card" content="summary" />
	<link rel="alternate" type="application/rss+xml" title={site.title} href="/rss.xml" />
</svelte:head>
