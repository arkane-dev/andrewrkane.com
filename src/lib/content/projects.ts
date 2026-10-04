import type { Project } from './types';

// Prefilled from cyberpunk_apps/BACKLOG.md. Statuses are real as of 2026-10-04; copy is placeholder.
// Desktop downloads: point `href` at release assets once builds exist (see templates/README.md).
export const projects: Project[] = [
	{
		slug: 'neondeck',
		name: 'NEONDECK',
		zh: '霓虹甲板',
		kind: 'library',
		status: 'live',
		summary: 'The cyberpunk design system every project here is built with.',
		description: [
			'‹What it is: a Svelte 5 design system: tokens, components, a design language doc, WCAG-checked palette.›',
			'‹Why you built it: one look across every app and site, so each new project starts on-brand.›',
			'‹What you learned: e.g. contrast trade-offs with neon, Chinese typography on the web.›'
		],
		stack: ['Svelte 5', 'SvelteKit', 'CSS custom properties', 'axe-core'],
		featured: true,
		started: '2026-10',
		// repo: 'https://github.com/<handle>/neondeck', // ‹add when the repo is public›
	},
	{
		slug: 'genai-calculator',
		name: 'GenAI Calculator',
		zh: '算力',
		kind: 'web',
		status: 'idea',
		summary: '‹Estimate what a GenAI workload costs and what hardware it needs.›',
		description: ['‹Problem, audience, how it works, how prices stay current.›'],
		stack: ['SvelteKit', 'NEONDECK'],
		featured: true,
		url: '/tools/genai-calculator/'
	},
	{
		slug: 'books',
		name: 'Field Guide (web edition)',
		zh: '书',
		kind: 'book',
		status: 'idea',
		summary: 'The four-volume Solutions Architect\'s Field Guide, readable online.',
		description: ['‹How the web edition is built: Quarto/LaTeX source → paper-style pages.›'],
		stack: ['Quarto', 'LaTeX', 'SvelteKit'],
		featured: true,
		url: '/books'
	},
	{
		slug: 'zettelkasten',
		name: '‹Zettelkasten›',
		zh: '卡片盒',
		kind: 'desktop',
		status: 'idea',
		summary: '‹An opinionated, local-first notes system.›',
		description: ['‹What the "opinions" are, and why Obsidian was not enough.›'],
		stack: ['Wails', 'Go', 'SvelteKit'],
		featured: true,
		downloads: []
	},
	{
		slug: 'research-companion',
		name: '‹Research Companion›',
		zh: '研究',
		kind: 'desktop',
		status: 'idea',
		summary: '‹A local research assistant for academics.›',
		description: ['‹Who it is for, what it replaces, privacy story (runs locally).›'],
		stack: ['Wails', 'Go', 'SvelteKit'],
		downloads: []
	},
	{
		slug: 'genai-writer',
		name: '‹GenAI Writer›',
		zh: '写作',
		kind: 'desktop',
		status: 'idea',
		summary: '‹A writing tool with AI drafting and accept/reject diffs.›',
		description: ['‹What kinds of writing, which models, what makes it different.›'],
		stack: ['Wails', 'Go', 'SvelteKit'],
		downloads: []
	},
	{
		slug: 'ide',
		name: '‹IDE›',
		zh: '编辑器',
		kind: 'desktop',
		status: 'idea',
		summary: '‹An IDE shaped around one developer\'s workflow.›',
		description: ['‹The workflow it serves and the pain points it removes.›'],
		stack: ['Wails', 'Go', 'SvelteKit'],
		downloads: []
	}
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
