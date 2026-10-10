// Lab pipeline: Markdown files in src/content/lab/ → entries + deep-dive HTML, at build time.
// Frontmatter: title, zh, zhLang (zh-Hans default, or ja), date, status, summary, tags, and optional post, project, outputs, draft.
// The body is optional. An entry with a body gets a deep-dive page at /lab/<slug>.
// An entry with `post` links to that blog post instead.
import matter from 'gray-matter';
import { renderMarkdown } from './markdown';
import type { LabEntry } from '../content/types';

const files = import.meta.glob('/src/content/lab/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function parse(path: string, raw: string) {
	const { data, content } = matter(raw);
	const slug = path.split('/').pop()!.replace(/\.md$/, '');
	const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? '');
	const hasBody = content.trim().length > 0;
	const meta: LabEntry = {
		slug,
		title: String(data.title ?? slug),
		zh: data.zh ? String(data.zh) : undefined,
		zhLang: data.zhLang === 'ja' ? 'ja' : 'zh-Hans',
		date,
		status: data.status ?? 'idea',
		summary: String(data.summary ?? ''),
		tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
		post: data.post ? String(data.post) : undefined,
		project: data.project ? String(data.project) : undefined,
		outputs: Array.isArray(data.outputs) ? data.outputs.map((o: { label: unknown; href: unknown }) => ({ label: String(o.label), href: String(o.href) })) : undefined,
		draft: Boolean(data.draft)
	};
	if (meta.post) Object.assign(meta, { href: `/blog/${meta.post}`, link: 'post' });
	else if (hasBody) Object.assign(meta, { href: `/lab/${slug}`, link: 'deep-dive' });
	return { meta, content: hasBody ? content : '' };
}

const all = Object.entries(files).map(([p, raw]) => parse(p, raw));

/** Published entries, newest first. Drafts show in `npm run dev` only. */
export function listLab(): LabEntry[] {
	return all
		.map((e) => e.meta)
		.filter((m) => import.meta.env.DEV || !m.draft)
		// Newest first. Within the same date, abandoned entries go last, then by title.
		.sort((a, b) => b.date.localeCompare(a.date) || Number(a.status === 'abandoned') - Number(b.status === 'abandoned') || a.title.localeCompare(b.title));
}

/** Entries that have a deep-dive page. */
export const listDeepDives = () => listLab().filter((e) => e.link === 'deep-dive');

export async function getDeepDive(slug: string): Promise<{ meta: LabEntry; html: string } | undefined> {
	const found = all.find((e) => e.meta.slug === slug);
	if (!found || found.meta.link !== 'deep-dive' || (found.meta.draft && !import.meta.env.DEV)) return undefined;
	return { meta: found.meta, html: await renderMarkdown(found.content) };
}
