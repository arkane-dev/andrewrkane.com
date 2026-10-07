// Shapes for all site content. Edit the data files next to this one, not the pages.
export type Status = 'idea' | 'building' | 'beta' | 'live' | 'archived';
export type Link = { label: string; href: string };

export interface Project {
	slug: string;
	name: string;
	zh?: string; // optional Chinese name for headers
	kind: 'web' | 'desktop' | 'library' | 'book';
	status: Status;
	summary: string; // one line, shows on cards
	description: string[]; // paragraphs on the detail page
	stack: string[];
	featured?: boolean; // show on the landing page
	started?: string; // YYYY-MM
	repo?: string; // source code URL
	url?: string; // live URL (web tools)
	downloads?: Download[]; // desktop builds
	downloadsNote?: string; // shown when there are no builds yet
	screenshots?: { src: string; alt: string }[]; // files in static/images/<slug>/, e.g. '/images/neondeck/home.png'
	changelog?: { version: string; date: string; notes: string }[];
}

export interface Download {
	platform: 'linux' | 'windows' | 'macos';
	arch: 'amd64' | 'arm64' | 'universal';
	file: string; // filename shown
	href: string; // download URL (e.g. a GitHub Release asset)
	size?: string; // "26 MB"
	version: string;
}

export interface Tool {
	slug: string;
	name: string;
	zh?: string;
	summary: string;
	kind?: 'web' | 'desktop'; // web (default) opens in a new tab. desktop links to its downloads.
	href: string; // where the tool lives (/tools/<slug>/ or a subdomain), or its downloads for a desktop tool
	status: Status;
	project?: string; // slug in projects.ts for the "how it's built" page
}

export interface Book {
	slug: string;
	volume: number;
	title: string;
	subtitle: string;
	zh?: string;
	summary: string;
	chapters: number;
	pages?: number;
	status: Status;
	readHref?: string; // web edition
	pdfHref?: string; // PDF download
	buyHref?: string; // store page, e.g. Amazon
	tone: 'magenta' | 'cyan' | 'violet' | 'gold';
}

export interface Post {
	slug: string;
	title: string;
	date: string; // YYYY-MM-DD
	summary: string;
	tags: string[];
	draft?: boolean;
	minutes: number; // reading time, computed
}

// Lab entries live in src/content/lab/<slug>.md (see src/lib/server/lab.ts).
// An entry links to a blog post (post), to its own deep-dive page (a Markdown body), or to nothing.
export interface LabEntry {
	slug: string;
	title: string;
	zh?: string;
	date: string; // YYYY-MM or YYYY-MM-DD
	status: Status | 'abandoned';
	summary: string;
	tags: string[];
	post?: string; // blog slug, optionally with #anchor: the entry links to /blog/<post>
	project?: string; // project slug, shown on the deep dive
	outputs?: { label: string; href: string }[]; // files, screenshots, repos shown beside a deep dive
	draft?: boolean;
	href?: string; // computed: /blog/<post>, /lab/<slug> or none
	link?: 'post' | 'deep-dive'; // computed: what href points at
}
