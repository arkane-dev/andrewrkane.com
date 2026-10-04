import type { Status } from './types';

// The Lab: the personal half. Experiments, sketches and half-finished ideas, in public.
// Unlike Projects, nothing here has to ship.
export const lab: { title: string; zh?: string; date: string; status: Status | 'abandoned'; summary: string; href?: string; tags: string[] }[] = [
	{ title: 'Chinese neon typography on the web', zh: '霓虹字', date: '2026-10', status: 'live', summary: '‹Notes from building MoonScroll and NeonSign: lang tags, glyph forms, contrast via outlines.›', tags: ['design', 'typography'] },
	{ title: '‹Experiment›', date: '‹YYYY-MM›', status: 'building', summary: '‹What you are poking at and why.›', tags: ['‹tag›'] },
	{ title: '‹Abandoned idea›', date: '‹YYYY-MM›', status: 'abandoned', summary: '‹Why you stopped. Abandoned experiments are content too.›', tags: ['‹tag›'] }
];
