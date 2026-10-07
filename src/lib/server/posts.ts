// Blog pipeline: Markdown files in src/content/blog/ → metadata + HTML, at build time.
// Frontmatter: title, date (YYYY-MM-DD), summary, tags [..], draft (optional).
import matter from 'gray-matter';
import { renderMarkdown } from './markdown';
import type { Post } from '../content/types';

const files = import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function parse(path: string, raw: string) {
	const { data, content } = matter(raw);
	const slug = path.split('/').pop()!.replace(/\.md$/, '');
	const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? '');
	const words = content.split(/\s+/).filter(Boolean).length;
	const meta: Post = {
		slug,
		title: String(data.title ?? slug),
		date,
		summary: String(data.summary ?? ''),
		tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
		draft: Boolean(data.draft),
		minutes: Math.max(1, Math.round(words / 220))
	};
	return { meta, content };
}

const all = Object.entries(files).map(([p, raw]) => parse(p, raw));

/** Published posts, newest first. Drafts show in `npm run dev` only. */
export function listPosts(): Post[] {
	return all
		.map((p) => p.meta)
		.filter((m) => import.meta.env.DEV || !m.draft)
		.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<{ meta: Post; html: string } | undefined> {
	const found = all.find((p) => p.meta.slug === slug);
	if (!found || (found.meta.draft && !import.meta.env.DEV)) return undefined;
	return { meta: found.meta, html: await renderMarkdown(found.content) };
}
