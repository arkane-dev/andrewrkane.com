import type { Tool } from './types';

// Tools. Each is its own cyberpunk_apps project. Web tools deploy under /tools/<slug>/
// (or a subdomain). Desktop tools link to the downloads on their project page.
// This page only lists and links them.
export const tools: Tool[] = [
	{
		slug: 'genai-calculator',
		name: 'GenAI Pricing & Sizing',
		zh: '算力计算器',
		summary: 'Tokens in, dollars and GPUs out. Compare API cost with running it yourself.',
		href: '/tools/genai-calculator/',
		status: 'live',
		project: 'genai-calculator'
	},
	{
		slug: 'genai-writer',
		name: 'GenAI Writer',
		zh: '写作',
		summary: 'Describe each part of a document in plain words. The AI writes the prose. Runs on your desktop, with any OpenAI-compatible model.',
		kind: 'desktop',
		href: '/projects/genai-writer#downloads',
		status: 'live',
		project: 'genai-writer'
	}
];
