import type { Tool } from './types';

// Web-hosted tools. Each tool is its own cyberpunk_apps project, deployed under /tools/<slug>/
// (or a subdomain). This page only lists and links them.
export const tools: Tool[] = [
	{
		slug: 'genai-calculator',
		name: 'GenAI Pricing & Sizing',
		zh: '算力计算器',
		summary: '‹Tokens in, dollars and GPUs out. Compare API cost with self-hosting.›',
		href: '/tools/genai-calculator/',
		status: 'idea',
		project: 'genai-calculator'
	},
	{
		slug: '‹next-tool›',
		name: '‹Next tool›',
		summary: '‹Placeholder: a second small web tool. Delete if you only have one.›',
		href: '#',
		status: 'idea'
	}
];
