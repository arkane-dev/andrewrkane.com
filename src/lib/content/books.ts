import type { Book } from './types';

// Real titles from the Field Guide source (Quarto).
//
// A volume is published online only when it has a readHref. Without one, its web edition and
// quizzes are not built (src/lib/books/index.ts).
//
// A missing link shows as a grayed-out button. Add each one when it exists (BACKLOG.md #4):
//   buyHref: a universal Amazon link that sends each reader to their local store
//   pdfHref: the PDF in a release or on the CDN
//   payHref: the pay-what-you-want page (Ko-fi, Gumroad, Stripe Payment Link, …)
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
		status: 'live',
		tone: 'magenta',
		readHref: '/books/classical-data-science',
		quizHref: '/books/classical-data-science/quiz'
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
		tone: 'cyan'
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
		tone: 'violet'
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
		tone: 'gold'
	}
];
