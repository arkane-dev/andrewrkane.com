---
title: "Building NEONDECK: a cyberpunk design system"
date: 2026-10-04
summary: "How a folder of reference images became one design language for every app and site, with neon that passes WCAG."
tags: [design, svelte, accessibility]
zh: 日志
---

I have seven projects on the go. A website, desktop apps, a book series, a calculator. I wanted them to feel like one thing. Same colors, same type, same shapes. So before I built any of them, I built a design system. I called it NEONDECK.

It's a Svelte 5 library. It has design tokens, components, and a design language doc that says why each rule exists. Every app and site here starts from it.

## From mood boards to tokens

I didn't pick colors by eye. I collected reference images instead. Night City skylines, cyberpunk portraits, graffiti, cyberdeck HUDs, street posters. Then I gave the folder to Claude.

Claude sampled the palette from the images. The navy-black sky became the background. A lavender from a portrait became the secondary text color. The cyan came from a graffiti piece. The acid yellow came from an NC77 sign.

The layout came from the images too. A cyber-brutalist web page gave the numbered sections and the hairline grid. The HUDs gave the cut corners and tick rulers. One rule came from a photo of a neon alley:

> The glow is the only clean thing in the frame.

It took less than an hour to go from a folder of images to a design language that met all my expectations. Palette, type, shapes, layout and motion.

The values live in CSS custom properties. A TypeScript copy covers the places CSS can't reach, such as charts and the Go side of the desktop apps.

```ts
// tokens.ts: the palette, for places CSS variables can't reach
export const color = {
	bg: '#070818',
	magenta: '#ff2bd6',
	cyan: '#22f2f7'
} as const;
```

## Neon vs. accessibility

Neon on near-black looks great. It doesn't always pass WCAG. I wanted WCAG 2.2 AA everywhere, so we checked every pair.

The first pass failed in three places. Muted text sat at 3.1 to 4.1:1, under the 4.5:1 minimum. The blue was 3.7:1. Input edges were too faint to see. Each fix was a small lightness shift. The look didn't change. The numbers did.

Then axe-core found a bug the token check couldn't see. Button captions had `opacity: 0.7`, which cut their contrast to about 4:1. That gave us a rule: never dim text with opacity. Use a dimmer color instead.

Paper mode had its own fight. Red on cream paper was only 3.5:1. So inside paper blocks, the accent becomes ink.

The hardest one was the moon. The site's hero sets an inscription over a field of glowing dots. Against the brightest dots, the text fill was only 2.7:1. The fix was an outline. WCAG accepts a text outline as the background, and the dark outline gives 17:1. So the outline is mandatory, and light moon colors are banned.

This surprised me most. Claude was as good at tuning the palette for contrast as it was at building it.

Now `npm run contrast` checks 107 color pairs and fails if any pair drops below AA.

| Pair | Ratio | Verdict |
|---|---|---|
| text on bg | 16.9:1 | AAA |
| cyan on bg | 14.3:1 | AAA |
| magenta on bg | 6.2:1 | AA |
| muted text on bg | 5.8:1 | AA |
| muted text on surface-3 (the worst case) | 4.55:1 | AA |
| moon inscription on its outline | 17:1 | AAA |

## From Tokyo to Chongqing

The first version leaned Japanese. Japanese type for the accents, and a red sun on the posters. 1980s Tokyo, the classic cyberpunk look.

I switched for a few reasons.

The first is the aesthetic. 80s cyberpunk grew out of Japan's runaway growth in technology and wealth, and the fear of what that would mean, mostly for Americans. Today the new power in technology isn't Japan. It's China. Moving the setting to China keeps some of the fear that Japan brought to classic cyberpunk.

The second is Firefly. I love that show. It blends English and Chinese, built on the same idea of tech superpowers.

The third is the subject. China is home to much of today's state-of-the-art GenAI research and models. So Chinese fits the subject too.

The last is hope. Classic cyberpunk fears Japan. I'm more hopeful, like Firefly. Technologies merge. Languages merge. Growing together makes for a much more interesting world.

Every CJK character is now Simplified Chinese. The setting moved to Chongqing, Shanghai and Shenzhen. That brought new pieces: vertical neon signboards with one hanzi per lit cell, LED dot-matrix lettering like the drone shows over the Bund, and mist between the towers.

The red sun went too. It reads as the Japanese flag. A cinnabar seal took its place, and seals never glow. Every Chinese word is checked by meaning. No machine translation.

## What I'd do differently

- **Pick the setting before building components.** The switch to Chinese meant renaming components and swapping fonts.
- **Run the contrast check from the first commit.** We added it after the look was set.
- **Collect more reference images up front.** The Chinese set came in later and added a whole new layer.
