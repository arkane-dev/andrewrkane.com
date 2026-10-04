import type { Book } from './types';

// Real titles from the Field Guide source (Quarto). Fill in summaries, page counts and links
// once the web edition (books project) is live.
export const series = {
	title: "A Solutions Architect's Field Guide",
	zh: '架构师手册',
	summary: '‹Two or three sentences: who the series is for, what it covers, how it is different.›'
};

export const books: Book[] = [
	{ slug: 'classical-data-science', volume: 1, title: 'Classical Data Science', subtitle: "A Solutions Architect's Field Guide, Volume 1", zh: '经典', summary: '‹From business framing to classical ML, the foundations.›', chapters: 20, status: 'building', tone: 'magenta' },
	{ slug: 'modern-ai', volume: 2, title: 'Modern AI', subtitle: "A Solutions Architect's Field Guide, Volume 2", zh: '现代', summary: '‹Deep learning, transformers, LLMs in practice.›', chapters: 17, status: 'building', tone: 'cyan' },
	{ slug: 'systems-performance', volume: 3, title: 'Systems & Performance', subtitle: "A Solutions Architect's Field Guide, Volume 3", zh: '系统', summary: '‹GPUs, kernels, serving, and making it fast.›', chapters: 20, status: 'building', tone: 'violet' },
	{ slug: 'applied-ai-domains', volume: 4, title: 'Applied AI Domains', subtitle: "A Solutions Architect's Field Guide, Volume 4", zh: '应用', summary: '‹Physical AI, image models, knowledge graphs and more.›', chapters: 26, status: 'building', tone: 'gold' }
];
