// Vertical hanzi on the ink band of paper posts (PaperPost). Set per blog post with `zh:` in frontmatter.
// Lab deep dives always use 日志. Each word has an English label for screen readers.
export const bands = {
	文章: 'Article', // default
	随笔: 'Essay', // personal views
	电文: 'Dispatch', // release notes
	日志: 'Log' // technical posts, Lab logs
} as const;

export type Band = keyof typeof bands;
export const isBand = (s: string): s is Band => s in bands;
