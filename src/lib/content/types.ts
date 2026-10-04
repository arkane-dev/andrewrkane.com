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
	href: string; // where the tool lives (/tools/<slug>/ or a subdomain)
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
