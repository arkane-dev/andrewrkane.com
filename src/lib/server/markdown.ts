// Markdown → HTML for every content type (blog posts, Lab deep dives), at build time.
// Code blocks are highlighted with Shiki in the NEONDECK theme. Headings get anchor links.
import { Marked } from 'marked';
import { createHighlighter, type Highlighter } from 'shiki';
import { neondeckTheme } from './shiki-theme';

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

export async function renderMarkdown(content: string): Promise<string> {
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
	return md.parse(content);
}
