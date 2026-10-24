import type { Book } from './types';

// Real titles from the Field Guide source (Quarto). Fill in summaries, page counts and links
// once the web edition (books project) is live.

/**
 * Stand-in for a link that doesn't exist yet. It goes to /books/coming-soon, which says so.
 * TODO before launch: replace every placeholder() with the real link, and drop this helper.
 *   amazon: a universal link that sends each reader to their local store (BACKLOG.md #4)
 *   pdf:    the PDF in a release or on the CDN
 *   pay:    the pay-what-you-want page (Ko-fi, Gumroad, Stripe Payment Link, …)
 */
export const placeholder = (what: 'amazon' | 'pdf' | 'pay') => `/books/coming-soon#${what}`;
export const series = {
	title: "A Solutions Architect's Field Guide",
	zh: '架构师手册',
	summary: 'A field guide for solutions architects moving into data science and AI. Four volumes, 83 chapters, from statistics to world models. Every chapter pairs the ideas with trade-offs, a worked example and code you can run.'
};

export const books: Book[] = [
	{
		slug: 'classical-data-science',
		volume: 1,
		title: 'Classical Data Science',
		subtitle: "A Solutions Architect's Field Guide, Volume 1",
		zh: '经典',
		summary: 'The foundations. Framing the business problem, the maths, Python and SQL. Then the classical ML toolkit: ensembles, validation, features, evaluation and time series.',
		chapters: 20,
		status: 'building',
		tone: 'magenta',
		readHref: '/books/classical-data-science',
		quizHref: '/books/classical-data-science/quiz',
		pdfHref: placeholder('pdf'),
		buyHref: placeholder('amazon'), // a universal link, not one regional Amazon store (BACKLOG.md #4)
		payHref: placeholder('pay')
	},
	{
		slug: 'modern-ai',
		volume: 2,
		title: 'Modern AI',
		subtitle: "A Solutions Architect's Field Guide, Volume 2",
		zh: '现代',
		summary: 'From MLOps to LLMs. Responsible AI, deployment and monitoring. Then neural networks, transformers, RAG, fine-tuning, RLHF and agents.',
		chapters: 17,
		status: 'building',
		tone: 'cyan',
		readHref: '/books/modern-ai',
		quizHref: '/books/modern-ai/quiz',
		pdfHref: placeholder('pdf'),
		buyHref: placeholder('amazon'), // a universal link, not one regional Amazon store (BACKLOG.md #4)
		payHref: placeholder('pay')
	},
	{
		slug: 'systems-performance',
		volume: 3,
		title: 'Systems & Performance',
		subtitle: "A Solutions Architect's Field Guide, Volume 3",
		zh: '系统',
		summary: 'Making it fast. GPU architecture, CUDA and Triton kernels. Then CPU performance: profiling, SIMD, parallelism and memory. Ends with an end-to-end optimization.',
		chapters: 20,
		status: 'building',
		tone: 'violet',
		readHref: '/books/systems-performance',
		quizHref: '/books/systems-performance/quiz',
		pdfHref: placeholder('pdf'),
		buyHref: placeholder('amazon'), // a universal link, not one regional Amazon store (BACKLOG.md #4)
		payHref: placeholder('pay')
	},
	{
		slug: 'applied-ai-domains',
		volume: 4,
		title: 'Applied AI Domains',
		subtitle: "A Solutions Architect's Field Guide, Volume 4",
		zh: '应用',
		summary: 'Three frontiers. Physical AI: perception, world models, VLAs and robot policies. Image models, from CNNs to diffusion. Knowledge graphs, GraphRAG and agentic reasoning.',
		chapters: 26,
		status: 'building',
		tone: 'gold',
		readHref: '/books/applied-ai-domains',
		quizHref: '/books/applied-ai-domains/quiz',
		pdfHref: placeholder('pdf'),
		buyHref: placeholder('amazon'), // a universal link, not one regional Amazon store (BACKLOG.md #4)
		payHref: placeholder('pay')
	}
];
