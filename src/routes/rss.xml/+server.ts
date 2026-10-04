import { listPosts } from '#lib/server/posts.js';
import { site } from '#lib';

export const prerender = true;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET = () => {
	const items = listPosts()
		.map(
			(p) => `<item><title>${esc(p.title)}</title><link>${site.domain}/blog/${p.slug}</link><guid>${site.domain}/blog/${p.slug}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${esc(p.summary)}</description></item>`
		)
		.join('');
	const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(site.title)}</title><link>${site.domain}</link><description>${esc(site.description)}</description>${items}</channel></rss>`;
	return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
