import type { Project } from './types';

// Prefilled from cyberpunk_apps/BACKLOG.md. Statuses are real as of 2026-10-05.
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
			'A Svelte 5 design system: design tokens, components, a design language doc, and a palette checked against WCAG 2.2 AA.',
			'I built it so every app and site here shares one look. Each new project starts on-brand.',
			'What surprised me: Claude took a set of reference images and turned them into a design language that met all my expectations in under an hour. It was as good at tuning that language for high contrast.'
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
		summary: 'Estimate what a GenAI workload costs and what hardware it needs.',
		description: [
			'It answers three questions. Does this model fit on this instance? What is the best cluster to serve this model at this scale? Is it cheaper to self-host, or to pay per token with an API vendor?',
			'It runs in your browser. Nothing you enter is sent to me or to any server.'
		],
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
		description: ['The chapters are written in Quarto, with LaTeX for the math. The web edition renders them as paper-style pages. Each book has a PDF download.'],
		stack: ['Quarto', 'LaTeX', 'SvelteKit'],
		featured: true,
		url: '/books'
	},
	{
		slug: 'zettelkasten',
		name: 'Zettelkasten',
		zh: '卡片盒',
		kind: 'desktop',
		status: 'idea',
		summary: 'A multi-modal knowledge graph that goes beyond notes.',
		description: [
			'Obsidian already does the knowledge graph well. This extends it beyond notes.',
			'Code snippets, bare images and uploaded PDFs sit in the graph next to your notes. The code runs in place.'
		],
		stack: ['Wails', 'Go', 'SvelteKit'],
		featured: true,
		downloads: []
	},
	{
		slug: 'research-companion',
		name: 'Research Companion',
		zh: '研究',
		kind: 'desktop',
		status: 'idea',
		summary: 'A research assistant for academics, with the model you choose.',
		description: [
			'A desktop library for your papers. Import PDFs, read and annotate, and link each note back to the passage it came from. Ask questions across your library and get answers that cite the source.',
			'You choose the model, local or hosted. Claude comes first. ChatGPT, anything on OpenRouter, or any OpenAI-compatible API also work.',
			'Open research gets the best Claude model you can access. Secure research stays on your machine.'
		],
		stack: ['Wails', 'Go', 'SvelteKit'],
		downloads: []
	},
	{
		slug: 'genai-writer',
		name: 'GenAI Writer',
		zh: '写作',
		kind: 'desktop',
		status: 'live',
		summary: 'A document editor that puts what you say ahead of how it looks.',
		description: [
			'You don\'t start from a blank page. You build a content tree: sections that hold text, images, code, equations and tables. For each part, you describe in plain words what it should say. The AI writes the prose to fit its place in the document.',
			'Move a section and the document adapts. Rewrite one part without losing the rest. Every change is saved, with a full history you can restore from.',
			'Documents sit on shelves as data shards. Drag a shard to another shelf to move it. Everything is stored as plain JSON files on your machine, so you can back it up, sync it or put it in git.',
			'Use any OpenAI-compatible model: OpenAI, OpenRouter, or a local model through Ollama. Export to Word, PDF, Markdown, OpenDocument or HTML.'
		],
		stack: ['Wails', 'Go', 'SvelteKit', 'NEONDECK'],
		featured: true,
		started: '2026-05',
		screenshots: [
			{ src: '/images/genai-writer/shelves.webp', alt: 'The library: documents as glowing data shards standing on shelves. The open document is lit magenta and marked LOADED.' },
			{ src: '/images/genai-writer/editor.webp', alt: 'The editor: a content tree of sections and text blocks on the left, and a live preview of the document on cream paper on the right.' },
			{ src: '/images/genai-writer/generate.webp', alt: 'A generated document, shown on paper, after a local Gemma model wrote both sections.' }
		],
		changelog: [{ version: '0.1.0', date: '2026-10-06', notes: 'First release. Desktop app with shelves of data shards, AI drafting with any OpenAI-compatible model, history, and five export formats.' }],
		downloads: [],
		downloadsNote: 'Linux and Windows builds coming soon'
	},
	{
		slug: 'ide',
		name: 'IDE',
		zh: '编辑器',
		kind: 'desktop',
		status: 'idea',
		summary: 'Everything I need to write code, on one screen.',
		description: [
			'One screen holds the whole workflow. A terminal. A code editor that doubles as a notebook. An output panel for images and charts. And a Claude Code terminal, built in.'
		],
		stack: ['Wails', 'Go', 'SvelteKit'],
		downloads: []
	}
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
