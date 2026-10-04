// About page. Keep the bio short; the timeline and principles do the heavy lifting.
export const about = {
	// Personal name seal (姓名印): full name, read right column first. 安迪 Andy + 凯恩 Kane.
	seal: { text: '安迪凯恩', label: 'Seal: Andy Kane (安迪凯恩)' },
	portrait: '', // '/images/portrait.jpg' (put the file in static/images/). Empty = no image.
	intro: '‹One paragraph in first person: who you are, what you do for a living, what you explore on the side.›',
	bio: [
		'‹Paragraph 2: your path so far. Where you started, what changed.›',
		'‹Paragraph 3: what you care about in your work. Opinions welcome.›'
	],
	principles: [
		{ title: '‹Principle›', body: '‹One sentence on how you work. E.g. "Ship small, measure, then decide."›' },
		{ title: '‹Principle›', body: '‹…›' },
		{ title: '‹Principle›', body: '‹…›' }
	],
	timeline: [
		{ when: '‹2024–now›', what: '‹Role / company or independent›', note: '‹One line on what you did›' },
		{ when: '‹2019–2024›', what: '‹Role / company›', note: '‹…›' },
		{ when: '‹2015–2019›', what: '‹Role / company›', note: '‹…›' }
	],
	stack: ['‹Python›', '‹Go›', '‹Svelte›', '‹AWS / GCP›', '‹PyTorch›', '‹…›'],
	colophon: 'Built with SvelteKit and NEONDECK. Prerendered to static HTML. Hosted on Cloudflare.'
};
