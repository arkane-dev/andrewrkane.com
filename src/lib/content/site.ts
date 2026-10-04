// ── Identity ──────────────────────────────────────────────────────────────────
// Everything wrapped in ‹ › is a placeholder. `npm run todo` lists what's left.
export const site = {
	name: 'site', // repo/folder name (leave)
	brand: 'ANDREW_KANE_', // top-left brand block. NEONDECK brands end in "_"
	owner: 'Andrew R. Kane',
	title: 'Andrew R. Kane', // <title> suffix and RSS title
	domain: 'https://‹your-domain.dev›', // no trailing slash; used for RSS, sitemap, canonical URLs
	description: '‹One sentence for search engines and link previews: who you are and what this site is.›',
	location: 'Newcastle, UK',
	email: '‹hello@your-domain.dev›',
	version: '0.1.0',

	// Hero (landing page). Keep the positioning line short: it's the business half.
	hero: {
		kicker: '> AI RESEARCHER // PHYSICAL AI', // small mono line above the title
		line1: '‹BUILD›', // two-line title: line 1 white…
		line2: '‹EXPLORE›', // …line 2 neon
		positioning: "I design world models for Physical AI. By day, I'm a Solutions Architect. I help startups build robots.",
		personal: '‹One line in your own voice: why this site exists. E.g. "This is my lab notebook, in public."›',
		zh: '霓虹都市', // MoonScroll inscription (2–4 hanzi). Pick your own; check the meaning.
		pinyin: 'NI HONG DU SHI',
		meaning: 'Neon City'
	},

	socials: [
		{ label: 'GitHub', href: 'https://github.com/‹handle›' },
		{ label: 'LinkedIn', href: 'https://linkedin.com/in/‹handle›' },
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
