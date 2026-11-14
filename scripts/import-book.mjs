// Import a Quarto book into the site: render it to HTML, then turn each chapter into a fragment the
// site styles itself. Maths is rendered with KaTeX here, so pages need no maths script.
//
//   node scripts/import-book.mjs --src ~/Teaching_datascience/book/book1-classical-ds \
//        --slug classical-data-science [--quizzes ../quizes]
//
// The source folder is copied to a temp dir first, so the book itself is never touched.
// Writes src/lib/books/<slug>/ (book.json, chapters/*.html, quizzes/*.json) and static/books/<slug>/.
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import katex from 'katex';

const args = Object.fromEntries(
	process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith('--') ? [...acc, [a.slice(2), all[i + 1]]] : acc), [])
);
if (!args.src || !args.slug) {
	console.error('usage: node scripts/import-book.mjs --src <quarto book dir> --slug <slug> [--quizzes <dir>]');
	process.exit(1);
}
const site = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(args.src.replace(/^~/, process.env.HOME));
const slug = args.slug;
const outLib = join(site, 'src/lib/books', slug);
const outStatic = join(site, 'static/books', slug);
const base = `/books/${slug}`;

// ── 1. Render a copy. A book's _quarto.yml points at shared files one level up, so copy those too.
const work = mkdtempSync(join(tmpdir(), 'book-'));
const parent = dirname(src);
for (const f of readdirSync(parent)) {
	const p = join(parent, f);
	if (p === src || f.startsWith('book') || f === '_book') continue;
	cpSync(p, join(work, f), { recursive: true });
}
const bookDir = join(work, basename(src));
cpSync(src, bookDir, { recursive: true, filter: (p) => !p.includes('/_book') && !p.endsWith('.pdf') });
console.log('rendering with Quarto…');
execFileSync('quarto', ['render', '--to', 'html'], { cwd: bookDir, stdio: ['ignore', 'ignore', 'inherit'] });
const rendered = join(bookDir, '_book');

// ── 2. The chapter list, in reading order, from Quarto's own config.
const yml = readFileSync(join(bookDir, '_quarto.yml'), 'utf8');
// index.qmd only holds print front matter (title, copyright and dedication). The web edition starts at the Preface.
const files = [...yml.matchAll(/^\s+-\s+(\S+\.qmd)\s*$/gm)].map((m) => m[1].replace(/\.qmd$/, '')).filter((f) => f !== 'index');
const meta = (key) => yml.match(new RegExp(`^\\s+${key}:\\s*"?(.*?)"?\\s*$`, 'm'))?.[1] ?? '';
const book = { slug, title: meta('title'), subtitle: meta('subtitle'), author: meta('author'), chapters: [], anchors: {} };

const pageSlug = (file) => file;

// Quarto numbers chapters from 1 in every volume, but the prose uses the series' numbers
// ("Procedure 41.1", "see Chapter 39"). The file names carry those (ch41-…). Renumber
// Quarto's own numbers to match: headings, captions and cross-reference text.
const chapterFiles = files.filter((f) => /^ch\d+/.test(f));
const seriesNumber = new Map(chapterFiles.map((f, i) => [String(i + 1), String(Number(f.match(/^ch(\d+)/)[1]))]));
const renumber = (s) => s.replace(/^(\d+)(?=$|\.)/, (n) => seriesNumber.get(n) ?? n);
function renumberAll($, main) {
	main.find('.header-section-number, .chapter-number').each((_, el) => { $(el).text(renumber($(el).text().trim())); });
	main.find('[data-number]').each((_, el) => { $(el).attr('data-number', renumber($(el).attr('data-number'))); });
	// "Listing 4.2:", "Figure 4.1:" in captions, and "Listing 4.6", "Chapter 2" in cross-reference links
	main.find('figcaption, a.quarto-xref').each((_, el) => {
		const node = $(el);
		node.html(node.html().replace(/\b(Chapter|Section|Listing|Figure|Table|Equation)((?:&nbsp;|\s|<span>)+)(\d+)(?=[.<:\s]|$)/g,
			(_, kind, gap, n) => `${kind}${gap}${seriesNumber.get(n) ?? n}`));
	});
}
const href = (file, id = '') => `${base}/${pageSlug(file)}${id ? `#${id}` : ''}`;

function math($) {
	$('span.math').each((_, el) => {
		const node = $(el);
		const display = node.hasClass('display');
		const tex = node.text().replace(/^\\[([]|\\[)\]]$/g, '').trim();
		try {
			node.replaceWith(katex.renderToString(tex, { displayMode: display, throwOnError: false, output: 'htmlAndMathml' }));
		} catch (e) {
			console.warn(`  maths failed: ${tex.slice(0, 60)}: ${e.message}`);
		}
	});
}

const images = new Set();
for (const file of files) {
	const html = readFileSync(join(rendered, `${file}.html`), 'utf8');
	const $ = cheerio.load(html);
	const main = $('main#quarto-document-content');

	// Title and number come from the title block. The site draws its own heading.
	renumberAll($, main);
	const h1 = main.find('header#title-block-header h1');
	const number = h1.find('.chapter-number').text().trim() || null;
	const title = (h1.find('.chapter-title').text() || h1.text()).replace(/\s+/g, ' ').trim();
	main.find('header#title-block-header, nav.page-navigation, script, .code-copy-button, .quarto-appendix-contents').remove();
	main.find('.code-copy-outer-scaffold').each((_, el) => $(el).replaceWith($(el).contents()));
	main.find('pre code span[id] > a[aria-hidden]').remove(); // per-line anchor links: noise for screen readers

	math($);

	// Quarto copies callout titles into title="…", raw TeX included, which shows as a tooltip.
	main.find('.callout[title], .callout-aws[title]').removeAttr('title');
	// Figures carry their description in the caption. Use it as the image's alt text.
	main.find('img').each((_, el) => {
		const img = $(el);
		if (img.attr('alt') !== undefined && img.attr('alt') !== '') return;
		const caption = img.closest('figure').find('figcaption').first().text().replace(/\s+/g, ' ').trim();
		img.attr('alt', caption.replace(/^Figure\s+[\d.]+:\s*/, ''));
	});

	// Links between chapters point at the site's pages. Images move to static/.
	main.find('a[href]').each((_, el) => {
		const a = $(el);
		const m = a.attr('href').match(/^([\w-]+)\.html(?:#(.*))?$/);
		if (m && files.includes(m[1])) a.attr('href', href(m[1], m[2]));
		else if (/^https?:/.test(a.attr('href'))) a.attr({ rel: 'noopener' });
	});
	main.find('img[src]').each((_, el) => {
		const s = $(el).attr('src');
		if (/^(https?:|data:)/.test(s)) return;
		images.add(s);
		$(el).attr({ src: `/books/${slug}/${s}`, loading: 'lazy' });
	});

	// Anchors for quiz references: section numbers, listings, procedures, exercises, named sections.
	const key = number ?? file;
	const sections = [];
	main.find('section[data-number], section.level2').each((_, el) => {
		const s = $(el);
		const h = s.children('h2, h3, h4').first();
		const id = s.attr('id');
		if (!id || !h.length) return;
		const num = s.attr('data-number') ?? '';
		const name = h.clone().find('.header-section-number').remove().end().text().replace(/\s+/g, ' ').trim();
		const level = Number(h.prop('tagName').slice(1));
		if (level <= 3) sections.push({ id, number: num, title: name, level });
		if (num) book.anchors[`§${num}`] = { href: href(file, id), label: `§${num} ${name}` };
		// Appendix A holds a quick reference per chapter, under "Chapter N — …". Chapters' own sections win.
		const qr = name.match(/^Chapter (\d+)\s+—/);
		if (qr && /quick-reference/.test(file)) book.anchors[`${qr[1]}:quick reference`] ??= { href: href(file, id), label: `Quick Reference, Chapter ${qr[1]}` };
		book.anchors[`${key}:${name.toLowerCase()}`] ??= { href: href(file, id), label: name };
	});
	main.find('figcaption').each((_, el) => {
		const m = $(el).text().match(/^\s*(Listing|Figure|Table)\s+([\d.]+)/);
		const id = $(el).closest('[id^="lst-"], [id^="fig-"], [id^="tbl-"]').attr('id');
		if (m && id) book.anchors[`${m[1]} ${m[2]}`] = { href: href(file, id), label: `${m[1]} ${m[2]}` };
	});
	main.find('p > strong').each((_, el) => {
		const m = $(el).text().match(/^Procedure\s+(\d+\.\d+)/);
		if (!m) return;
		const id = `proc-${m[1].replace('.', '-')}`;
		$(el).parent().attr('id', id);
		book.anchors[`Procedure ${m[1]}`] = { href: href(file, id), label: `Procedure ${m[1]}` };
	});
	const exercises = main.find('section').filter((_, el) => /^Exercises$/i.test($(el).children('h2').text().replace(/^[\d.\s]+/, '').trim()));
	exercises.find('> ol > li').each((i, el) => {
		if (!number) return;
		const id = `ex-${number}-${i + 1}`;
		$(el).attr('id', id);
		book.anchors[`Exercise ${number}.${i + 1}`] = { href: href(file, id), label: `Exercise ${number}.${i + 1}` };
	});

	const kind = /^appendix/.test(file) ? 'appendix' : number ? 'chapter' : 'front';
	book.chapters.push({ slug: pageSlug(file), file, number, title, kind, sections, words: main.text().split(/\s+/).length });
	mkdirSync(join(outLib, 'chapters'), { recursive: true });
	writeFileSync(join(outLib, 'chapters', `${pageSlug(file)}.html`), main.html().trim() + '\n');
	console.log(`  ${pageSlug(file)}: ${number ? `${number} ` : ''}${title}, ${sections.length} sections`);
}

rmSync(outStatic, { recursive: true, force: true });
for (const img of images) {
	const from = join(rendered, img);
	if (!existsSync(from)) {
		console.warn(`  missing image: ${img}`);
		continue;
	}
	mkdirSync(dirname(join(outStatic, img)), { recursive: true });
	cpSync(from, join(outStatic, img));
}

// ── 3. Quizzes: copy them in, and resolve each reference to a link into the chapter.
function resolveRef(ref, chapter) {
	const links = [];
	const add = (a) => a && !links.some((l) => l.href === a.href) && links.push(a);
	for (const m of ref.matchAll(/§\s*(\d+(?:\.\d+)*)/g)) add(book.anchors[`§${m[1]}`]);
	for (const m of ref.matchAll(/(Listing|Procedure|Exercise|Figure|Table)s?\s+(\d+\.\d+)/g)) add(book.anchors[`${m[1]} ${m[2]}`]);
	for (const m of ref.matchAll(/(?:^|[,;]\s*)(\d+\.\d+(?:\.\d+)?)(?=$|[,;])/g)) add(book.anchors[`§${m[1]}`]);
	for (const name of ['quick reference', 'mental model', 'exercises', 'trade-offs', 'common pitfalls']) {
		if (ref.toLowerCase().includes(name)) add(book.anchors[`${chapter}:${name}`]);
	}
	return links;
}

if (args.quizzes) {
	const qdir = resolve(args.quizzes.replace(/^~/, process.env.HOME));
	mkdirSync(join(outLib, 'quizzes'), { recursive: true });
	let total = 0;
	let unresolved = 0;
	for (const f of readdirSync(qdir).filter((f) => /^ch\d+\.json$/.test(f)).sort()) {
		const quiz = JSON.parse(readFileSync(join(qdir, f), 'utf8'));
		const ch = String(quiz.chapter);
		// The quiz folder holds every volume. Keep only this book's chapters.
		if (!book.chapters.some((c) => c.kind === 'chapter' && c.number === ch)) continue;
		for (const item of [...quiz.questions, ...quiz.ideas]) {
			item.refLinks = resolveRef(item.ref ?? '', ch);
			total++;
			if (!item.refLinks.length) {
				unresolved++;
				console.warn(`  unresolved ref in ch${ch}: ${item.ref}`);
			}
		}
		writeFileSync(join(outLib, 'quizzes', f), JSON.stringify(quiz));
	}
	console.log(`quizzes: ${total} refs, ${unresolved} without a link`);
}

writeFileSync(join(outLib, 'book.json'), JSON.stringify(book, null, 1) + '\n');
rmSync(work, { recursive: true, force: true });
console.log(`${book.chapters.length} pages, ${images.size} images, ${Object.keys(book.anchors).length} anchors → src/lib/books/${slug}`);
