import { error } from '@sveltejs/kit';
import { books } from '#lib';
import { getBook, getQuiz, quizNumbers, webBooks } from '#lib/books/index.js';

export const entries = () => webBooks.map((b) => ({ book: b.slug }));

export async function load({ params }) {
	const book = getBook(params.book);
	const meta = books.find((b) => b.slug === params.book);
	if (!book || !meta) error(404, 'Book not found');
	const quizzes = await Promise.all(
		quizNumbers(book.slug).map(async (n) => {
			const q = await getQuiz(book.slug, n);
			return { chapter: n, questions: q?.questions.length ?? 0 };
		})
	);
	return { book, meta, quizzes };
}
