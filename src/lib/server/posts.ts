// Blog pipeline: Markdown files in src/content/blog/ → metadata + HTML, at build time.
// Frontmatter: title, date (YYYY-MM-DD), summary, tags [..], draft (optional).
import matter from 'gray-matter';
import { Marked } from 'marked';
import { createHighlighter, type Highlighter } from 'shiki';
import { neondeckTheme } from './shiki-theme';
import type { Post } from '../content/types';

const files = import.meta.glob('/src/content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

const LANGS = ['ts', 'js', 'svelte', 'python', 'go', 'bash', 'json', 'yaml', 'css', 'html', 'sql', 'md', 'diff'];
let hl: Promise<Highlighter> | undefined;
const highlighter = () => (hl ??= createHighlighter({ themes: [neondeckTheme], langs: LANGS }));

// Heading text arrives as HTML: strip tags and entities (&#39; etc.) before slugging.
// Keeps CJK (U+4E00–U+9FFF) so Chinese headings get readable anchors.
const slugify = (s: string) =>
	s
		.toLowerCase()
		.replace(/<[^>]+>/g, '')
		.replace(/&#?\w+;/g, '')
		.replace(/[^\w一-鿿]+/g, '-')
		.replace(/^-|-$/g, '');

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
	const h = await highlighter();
	const md = new Marked({
		gfm: true,
		renderer: {
			code({ text, lang }) {
				// Shiki resolves aliases (ts → typescript); unknown or unloaded languages fall back to plain text.
				try {
					return h.codeToHtml(text, { lang: lang || 'text', theme: 'neondeck' });
				} catch {
					return h.codeToHtml(text, { lang: 'text', theme: 'neondeck' });
				}
			},
			heading({ tokens, depth }) {
				const inner = this.parser.parseInline(tokens);
				const id = slugify(inner);
				return `<h${depth} id="${id}"><a class="anchor" href="#${id}" aria-hidden="true" tabindex="-1">#</a>${inner}</h${depth}>\n`;
			}
		}
	});
	return { meta: found.meta, html: await md.parse(found.content) };
}
