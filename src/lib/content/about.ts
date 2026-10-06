// About page. Keep the bio short; the timeline and principles do the heavy lifting.
export const about = {
	// Personal name seal (姓名印): full name, read right column first. 安迪 Andy + 凯恩 Kane.
	seal: { text: '安迪凯恩', label: 'Seal: Andy Kane (安迪凯恩)' },
	portrait: '', // '/images/portrait.jpg' (put the file in static/images/). Empty = no image.
	intro: "I'm Andrew. I research world models for Physical AI. By day, I'm a Solutions Architect. I help startups build robots. After hours, I write books, build tools and run experiments in the Lab.",
	bio: [
		// Human-centric AI
		"I'm not worried about AI. I'm worried about what humans will do with it. So I build for people first. Human-centric AI means systems that improve lives. Better healthcare. Better disaster response. A better standard of living for all.",
		// Responsible AI
		"Responsible AI is about impact. Every system has outcomes nobody planned for. The second- and third-order effects are where the real risk hides. So I look for them early, and plan what to do about them. The question isn't what AI will do. It's what we will do with it."
	],
	// Principles: the higher-level idea first, then how it shows up day to day.
	// `tag` names the source idea in small mono text under the title.
	principles: [
		{
			title: 'Close the loop',
			tag: 'OODA · PDCA',
			body: 'Observe, orient, decide, act. Then go again. Day to day, that means ship small, measure, then decide. When the work needs rigor, the loop becomes plan, do, check, act. Agile where we can. Systematic where we must.'
		},
		{
			title: 'Question the premise',
			tag: 'FIRST PRINCIPLES · FEYNMAN',
			body: "Every plan rests on assumptions. Most go unspoken. Find the ones everyone missed. Test them first and get the real answer early. Then we know we're heading the right way. The easiest person to fool is yourself."
		},
		{
			title: 'Check the territory',
			tag: 'BOX · KORZYBSKI',
			body: 'All models are wrong. Some are useful. A world model is a map, never the territory. So build for useful, not perfect. Know where the map breaks. Then go back to the real world and check it again.'
		}
	],
	// Lifepath: the story, told as Cyberpunk 2077 lifepaths. The CV lives on LinkedIn.
	timeline: [
		{ when: '1985–2003', what: 'Streetkid', zh: '街头小子', note: "Born in '85. Eighteen years learning to survive." },
		{ when: '2003–2010', what: 'Nomad', zh: '流浪者', note: 'Lived the nomad life. Studied. Spent a few years as an archaeologist, digging in the dirt. Learned to rebuild a lost world from fragments.' },
		{ when: '2010–2026', what: 'Corpo', zh: '公司员工', note: 'Turned corpo. Drove revenue. Chased that sweet shareholder return. The upside: a seat on some amazing projects.' },
		{ when: 'After hours', what: 'Netrunner', zh: '网络黑客', note: 'Jacking in after the shift. World models, robots and this site.' }
	],
	// Technologies in real use. Add each new one used in a project or the Lab (see cyberpunk_apps/CLAUDE.md).
	stack: ['Python', 'Go', 'Svelte', 'Wails', 'AWS', 'PyTorch', 'CUDA', 'C/C++'],
	colophon: 'Built with SvelteKit and NEONDECK. Prerendered to static HTML. Hosted on Cloudflare.'
};
