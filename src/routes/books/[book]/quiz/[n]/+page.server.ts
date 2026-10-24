import { error } from '@sveltejs/kit';
import { getBook, getQuiz, quizNumbers, webBooks } from '#lib/books/index.js';
import { renderRich } from '#lib/server/rich-text.js';

export const entries = () => webBooks.flatMap((b) => quizNumbers(b.slug).map((n) => ({ book: b.slug, n: String(n) })));

/** Everything the quiz shows is rendered here, at build time: Markdown, code and maths. */
export async function load({ params }) {
	const book = getBook(params.book);
	const n = Number(params.n);
	const quiz = book && (await getQuiz(book.slug, n));
	if (!book || !quiz) error(404, 'Quiz not found');
	const chapter = book.chapters.find((c) => c.kind === 'chapter' && Number(c.number) === n)!;
	const numbers = quizNumbers(book.slug);
	const questions = await Promise.all(
		quiz.questions.map(async (q) => ({
			id: q.id,
			idea: q.idea,
			level: q.level,
			type: q.type,
			prompt: await renderRich(q.prompt),
			options: q.options ? await Promise.all(q.options.map((o) => renderRich(o, true))) : [],
			answer: q.answer,
			tolerance: q.tolerance ?? 0,
			unit: q.unit ?? '',
			explanation: await renderRich(q.explanation),
			refLinks: q.refLinks
		}))
	);
	const exercises = await Promise.all(
		quiz.bookExercises.map(async (e) => ({ ...e, prompt: await renderRich(e.prompt), modelAnswer: await renderRich(e.modelAnswer) }))
	);
	return {
		book: { slug: book.slug, title: book.title },
		chapter: { slug: chapter.slug, number: n, title: chapter.title },
		quiz: { title: quiz.title, blurb: quiz.blurb, ideas: quiz.ideas, questions, exercises },
		prev: numbers.includes(n - 1) ? n - 1 : null,
		next: numbers.includes(n + 1) ? n + 1 : null
	};
}
