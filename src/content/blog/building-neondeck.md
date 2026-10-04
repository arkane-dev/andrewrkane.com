---
title: "Building NEONDECK: a cyberpunk design system"
date: 2026-10-04
summary: "‹How one design language for every app and site came together, from mood boards to WCAG-checked neon.›"
tags: [design, svelte, accessibility]
---

‹Intro: you started a set of projects and wanted them to feel like one thing.›

## From mood boards to tokens

‹How you sampled the palette from reference images instead of picking colors by eye.›

```ts
// tokens.ts: the palette, for places CSS variables can't reach
export const color = {
	bg: '#070818',
	magenta: '#ff2bd6',
	cyan: '#22f2f7'
} as const;
```

## Neon vs. accessibility

‹The contrast fights: faded captions, light moons, sun-red on paper, and the outline trick.›

| Pair | Ratio | Verdict |
|---|---|---|
| text on bg | 16.9:1 | AAA |
| magenta on bg | 6.2:1 | AA |
| ‹…› | ‹…› | ‹…› |

## From Tokyo to Chongqing

‹Why the CJK layer switched from Japanese to Simplified Chinese, and what changed visually.›

> ‹A pull quote from the post.›

## What I'd do differently

‹Honest retrospective. Readers like this part most.›
