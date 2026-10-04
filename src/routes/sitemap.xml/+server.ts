import { listPosts } from '#lib/server/posts.js';
import { site, projects } from '#lib';

export const prerender = true;

const pages = ['', '/about', '/work', '/blog', '/projects', '/tools', '/books', '/lab', '/now'];

export const GET = () => {
	const urls = [
		...pages,
		...listPosts().map((p) => `/blog/${p.slug}`),
		...projects.map((p) => `/projects/${p.slug}`)
	];
	const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u) => `<url><loc>${site.domain}${u}</loc></url>`).join('')}</urlset>`;
	return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
