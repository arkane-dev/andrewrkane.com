// Markdown with maths, for quiz questions, options and explanations. Rendered at build time:
// code with Shiki (the NEONDECK theme), $…$ and $$…$$ with KaTeX. Pages need no client-side maths.
import katex from 'katex';
import { Marked } from 'marked';
import { createHighlighter, type Highlighter } from 'shiki';
import { neondeckTheme } from './shiki-theme';

let hl: Promise<Highlighter> | undefined;
const highlighter = () => (hl ??= createHighlighter({ themes: [neondeckTheme], langs: ['python', 'sql', 'bash', 'json', 'text'] }));

const MATH = /\$\$([\s\S]+?)\$\$|(?<![\\$\w])\$(?!\s)((?:\\\$|[^$\n])+?)(?<!\s)\$(?![\w$])/g;

/** Swap maths for tokens first, so Markdown can't mangle underscores and asterisks inside it. */
function protect(text: string): { text: string; maths: string[] } {
	const maths: string[] = [];
	const out = text.replace(MATH, (_, block: string | undefined, inline: string | undefined) => {
		const tex = (block ?? inline ?? '').trim();
		maths.push(katex.renderToString(tex, { displayMode: !!block, throwOnError: false, output: 'htmlAndMathml', strict: false }));
		return `@@MATH${maths.length - 1}@@`;
	});
	return { text: out, maths };
}

const restore = (html: string, maths: string[]) => html.replace(/@@MATH(\d+)@@/g, (_, i) => maths[Number(i)]);

export async function renderRich(text: string, inline = false): Promise<string> {
	const h = await highlighter();
	const md = new Marked({
		gfm: true,
		renderer: {
			code({ text: code, lang }) {
				try {
					return h.codeToHtml(code, { lang: lang || 'text', theme: 'neondeck' });
				} catch {
					return h.codeToHtml(code, { lang: 'text', theme: 'neondeck' });
				}
			}
		}
	});
	const { text: safe, maths } = protect(text);
	const html = inline ? await md.parseInline(safe) : await md.parse(safe);
	return restore(html, maths);
}
