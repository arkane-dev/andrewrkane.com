import { error } from '@sveltejs/kit';
import { getBook, getQuiz, quizNumbers, webBooks } from '#lib/books/index.js';

export const entries = () => webBooks.map((b) => ({ book: b.slug }));

export async function load({ params }) {
	const book = getBook(params.book);
	if (!book) error(404, 'Book not found');
	const quizzes = await Promise.all(
		quizNumbers(book.slug).map(async (n) => {
			const q = (await getQuiz(book.slug, n))!;
			return { chapter: n, title: q.title, blurb: q.blurb, questions: q.questions.length, ideas: q.ideas.length };
		})
	);
	return { book: { slug: book.slug, title: book.title }, quizzes };
}
