<!-- Site footer: link columns + contact, then the hazard band. -->
<script lang="ts">
	import { HazardStripe } from '@cyberpunk-apps/neondeck';
	import { site } from '#lib';

	const cols = [
		{ title: 'Explore', zh: '探索', links: [{ label: 'Blog', href: '/blog' }, { label: 'Lab', href: '/lab' }, { label: 'Now', href: '/now' }] },
		{ title: 'Build', zh: '构建', links: [{ label: 'Projects', href: '/projects' }, { label: 'Tools', href: '/tools' }, { label: 'Books', href: '/books' }] },
		{ title: 'Connect', zh: '联系', links: [{ label: 'About', href: '/about' }, { label: 'Work with me', href: '/work' }, ...site.socials] }
	];
</script>

<footer class="site-footer">
	<div class="inner">
		<div class="who">
			<p class="brand">{site.brand}</p>
			<p class="nd-meta">{site.location}</p>
			<p><a href="mailto:{site.email}">{site.email}</a></p>
			<p class="nd-meta">© {new Date().getFullYear()} {site.owner}</p>
		</div>
		{#each cols as c (c.title)}
			<nav aria-label={c.title}>
				<p class="nd-label"><span lang="zh-Hans" class="zh">{c.zh}</span> {c.title}</p>
				<ul>
					{#each c.links as l (l.href)}<li><a href={l.href}>{l.label}</a></li>{/each}
				</ul>
			</nav>
		{/each}
	</div>
	<HazardStripe text="> end of transmission" />
</footer>

<style>
	.site-footer { margin-top: var(--nd-space-24); border-top: 1px solid var(--nd-line); }
	.inner { display: grid; grid-template-columns: 1.4fr repeat(3, 1fr); gap: var(--nd-space-8); max-width: var(--nd-content-max); margin: 0 auto; padding: var(--nd-space-12) var(--nd-gutter); }
	.brand { margin: 0 0 var(--nd-space-2); font-family: var(--nd-font-display); font-weight: 700; font-size: var(--nd-text-lg); color: var(--nd-accent); }
	.who p { margin: 0 0 var(--nd-space-1); }
	.zh { font-family: var(--nd-font-cjk); font-weight: 900; }
	ul { list-style: none; margin: var(--nd-space-3) 0 0; padding: 0; display: grid; gap: var(--nd-space-2); }
	ul a { color: var(--nd-text-dim); text-decoration: none; font-size: var(--nd-text-sm); }
	ul a:hover { color: var(--nd-accent-2); }
	@media (max-width: 720px) { .inner { grid-template-columns: 1fr 1fr; } }
</style>
