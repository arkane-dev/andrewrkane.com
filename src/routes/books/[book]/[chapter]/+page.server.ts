import { error } from '@sveltejs/kit';
import { books } from '#lib';
import { chapterHtml, getBook, quizNumbers, webBooks } from '#lib/books/index.js';

export const entries = () => webBooks.flatMap((b) => b.chapters.map((c) => ({ book: b.slug, chapter: c.slug })));

export async function load({ params }) {
	const book = getBook(params.book);
	const meta = books.find((b) => b.slug === params.book);
	const i = book?.chapters.findIndex((c) => c.slug === params.chapter) ?? -1;
	if (!book || !meta || i < 0) error(404, 'Chapter not found');
	const chapter = book.chapters[i];
	const html = await chapterHtml(book.slug, chapter.slug);
	if (!html) error(404, 'Chapter not found');
	const hasQuiz = chapter.kind === 'chapter' && quizNumbers(book.slug).includes(Number(chapter.number));
	return {
		book: { slug: book.slug, title: book.title, author: book.author },
		meta,
		chapter,
		html,
		prev: book.chapters[i - 1] ?? null,
		next: book.chapters[i + 1] ?? null,
		hasQuiz
	};
}
