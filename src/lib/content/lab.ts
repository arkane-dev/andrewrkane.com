import type { Status } from './types';

// The Lab: the personal half. Experiments, sketches and half-finished ideas, in public.
// Unlike Projects, nothing here has to ship.
export const lab: { title: string; zh?: string; date: string; status: Status | 'abandoned'; summary: string; href?: string; tags: string[] }[] = [
	{
		title: 'Chinese neon typography on the web',
		zh: '霓虹字',
		date: '2026-10',
		status: 'live',
		summary: 'Notes from building MoonScroll and NeonSign. Lang tags pick Chinese glyph forms. Outlines make white text on neon pass contrast.',
		tags: ['design', 'typography', 'accessibility']
	},
	{
		title: 'Desktop apps from one Linux box',
		date: '2026-10',
		status: 'live',
		summary: "Wails cross-compiles to Windows from Linux with no Windows tools. macOS refuses: it needs Apple's SDK, so Mac builds go to CI.",
		tags: ['wails', 'go', 'builds']
	},
	{
		title: 'A Tokyo-style kanji layer',
		date: '2026-10',
		status: 'abandoned',
		summary: 'The first NEONDECK used Japanese. Japanese-as-cyberpunk is a 1980s idea. Today China leads in tech. Switched to Simplified Chinese and Chongqing neon.',
		tags: ['design', 'typography']
	}
];
