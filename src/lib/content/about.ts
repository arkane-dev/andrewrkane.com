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
	// Principles: the higher-level idea first, then how it shows up day to day.
	// `tag` names the source idea in small mono text under the title.
	principles: [
		{
			title: 'Close the loop',
			tag: 'OODA · PDCA',
			body: 'Observe, orient, decide, act. Then go again. Day to day, that means ship small, measure, then decide. When the work needs rigor, the loop becomes plan, do, check, act. Agile where we can. Systematic where we must.'
		},
		{ title: '‹Principle›', tag: '‹source idea›', body: '‹The higher-level idea, then how it shows up in practice.›' },
		{ title: '‹Principle›', tag: '‹source idea›', body: '‹…›' }
	],
	// Lifepath: the story, told as Cyberpunk 2077 lifepaths. The CV lives on LinkedIn.
	timeline: [
		{ when: '1985–2003', what: 'Streetkid', zh: '街头小子', note: "Born in '85. Eighteen years learning to survive." },
		{ when: '2003–2010', what: 'Nomad', zh: '流浪者', note: 'Lived the nomad life. Studied. Spent a few years as an archaeologist, digging in the dirt. Learned to rebuild a lost world from fragments.' },
		{ when: '2010–2026', what: 'Corpo', zh: '公司员工', note: 'Turned corpo. Drove revenue. Chased that sweet shareholder return. The upside: a seat on some amazing projects.' },
		{ when: 'After hours', what: 'Netrunner', zh: '网络黑客', note: 'Jacking in after the shift. World models, robots and this site.' }
	],
	stack: ['‹Python›', '‹Go›', '‹Svelte›', '‹AWS / GCP›', '‹PyTorch›', '‹…›'],
	colophon: 'Built with SvelteKit and NEONDECK. Prerendered to static HTML. Hosted on Cloudflare.'
};
