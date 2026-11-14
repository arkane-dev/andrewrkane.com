// Web editions of the Field Guide. Each folder here is written by scripts/import-book.mjs from the
// Quarto source: book.json (contents and anchors), chapters/*.html and quizzes/*.json.

import { books as catalog } from '../content/books';

export interface Section {
	id: string;
	number: string;
	title: string;
	level: number;
}

export interface Chapter {
	slug: string;
	file: string;
	number: string | null;
	title: string;
	kind: 'front' | 'chapter' | 'appendix';
	sections: Section[];
	words: number;
}

export interface Anchor {
	href: string;
	label: string;
}

export interface WebBook {
	slug: string;
	title: string;
	subtitle: string;
	author: string;
	chapters: Chapter[];
	anchors: Record<string, Anchor>;
}

export interface Quiz {
	chapter: number;
	title: string;
	blurb: string;
	ideas: { id: string; title: string; ref: string; refLinks: Anchor[] }[];
	questions: Question[];
	bookExercises: { id: string; number: string; tag: string; prompt: string; modelAnswer: string }[];
}

export interface Question {
	id: string;
	idea: string;
	level: number;
	type: 'single' | 'multi' | 'numeric';
	prompt: string;
	options?: string[];
	answer: number | number[];
	tolerance?: number;
	unit?: string | null;
	explanation: string;
	ref: string;
	refLinks: Anchor[];
}

const books = import.meta.glob<WebBook>('./*/book.json', { eager: true, import: 'default' });
const quizzes = import.meta.glob<Quiz>('./*/quizzes/*.json', { import: 'default' });
const chapters = import.meta.glob<string>('./*/chapters/*.html', { query: '?raw', import: 'default' });

/** Volumes with a readHref in content/books.ts are published. The rest are imported but not built. */
const released = new Set(catalog.filter((b) => b.readHref).map((b) => b.slug));

export const webBooks: WebBook[] = Object.values(books).filter((b) => released.has(b.slug));

export function getBook(slug: string): WebBook | undefined {
	return released.has(slug) ? books[`./${slug}/book.json`] : undefined;
}

/** "Chapter 3", "Appendix A", or "" for front matter. */
export function chapterLabel(c: Chapter): string {
	if (c.kind === 'chapter') return `Chapter ${c.number}`;
	if (c.kind === 'appendix') return `Appendix ${c.file.match(/^appendix-(\w)/)?.[1].toUpperCase() ?? ''}`;
	return '';
}

export async function chapterHtml(book: string, slug: string): Promise<string | undefined> {
	return chapters[`./${book}/chapters/${slug}.html`]?.();
}

export function quizNumbers(book: string): number[] {
	return Object.keys(quizzes)
		.filter((k) => k.startsWith(`./${book}/`))
		.map((k) => Number(k.match(/ch(\d+)\.json$/)?.[1]))
		.sort((a, b) => a - b);
}

export async function getQuiz(book: string, n: number): Promise<Quiz | undefined> {
	return quizzes[`./${book}/quizzes/ch${String(n).padStart(2, '0')}.json`]?.();
}
