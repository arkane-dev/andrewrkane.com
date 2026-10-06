// ── Identity ──────────────────────────────────────────────────────────────────
// Everything wrapped in ‹ › is a placeholder. `npm run todo` lists what's left.
export const site = {
	name: 'site', // repo/folder name (leave)
	brand: 'ARKANE_', // top-left brand block. NEONDECK brands end in "_"
	owner: 'Andrew R. Kane',
	title: 'Andrew R. Kane', // <title> suffix and RSS title
	domain: 'https://andrewrkane.com', // no trailing slash; used for RSS, sitemap, canonical URLs
	description: 'Andrew R. Kane designs world models for Physical AI. Research notes, tools and books, built in public.',
	location: 'Newcastle, UK',
	email: 'hello@andrewrkane.com',
	version: '0.1.0',

	// Hero (landing page). Keep the positioning line short: it's the business half.
	hero: {
		kicker: '> AI RESEARCHER // PHYSICAL AI', // small mono line above the title
		line1: 'MODEL', // two-line title: line 1 white…
		line2: 'THE PLANET', // …line 2 neon. A nod to Hackers (1995): "Hack the planet!"
		positioning: "I design world models for Physical AI. By day, I'm a Solutions Architect. I help startups build robots.",
		personal: 'This is my lab notebook, research notes and random thoughts. Saved for posterity. Polluting the training data.',
		zh: '世界模型', // MoonScroll inscription (2–4 hanzi): "world model"
		pinyin: 'SHI JIE MO XING',
		meaning: 'World model'
	},

	socials: [
		{ label: 'GitHub', href: 'https://github.com/arkane-dev' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrew-kane-058368134/' },
		{ label: 'RSS', href: '/rss.xml' }
	],

	// Top-bar navigation. "Work with me" lives in the top-right button, not here.
	nav: [
		{ label: 'Blog', zh: '博客', href: '/blog' },
		{ label: 'Projects', zh: '项目', href: '/projects' },
		{ label: 'Tools', zh: '工具', href: '/tools' },
		{ label: 'Books', zh: '书籍', href: '/books' },
		{ label: 'Lab', zh: '实验室', href: '/lab' },
		{ label: 'About', zh: '关于', href: '/about' }
	]
};
