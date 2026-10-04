# Content guide

Everything you need to edit lives in **`src/lib/content/`** (TypeScript data) and **`src/content/blog/`** (Markdown).
Pages only lay content out; you shouldn't need to touch `src/routes/` to change words.

Placeholders look like `‹this›`. Run `npm run todo` to list every one left.

## Fill in, in this order

| # | File | What | Notes |
|---|---|---|---|
| 1 | `site.ts` | name, brand, domain, email, location, socials, **hero** | The hero is the business/personal split: `positioning` = what you do for whom; `personal` = why the site exists. `domain` feeds RSS, sitemap and link previews. |
| 2 | `about.ts` | intro, bio, principles, timeline, stack, portrait | First person. Portrait goes in `static/images/`, shown greyscale on paper. |
| 3 | `work.ts` | intro, availability, 3 services, process, proof, CTA | The business page. Be concrete: deliverables and engagement length. `cta.href` is a `mailto:` or booking link. |
| 4 | `now.ts` | focus, reading, not-doing, `updated` date | Update monthly. The landing page shows the focus items. |
| 5 | `projects.ts` | summaries, descriptions, repo URLs, screenshots, downloads, changelog | Prefilled from BACKLOG.md with real statuses. `featured: true` puts a project on the landing page (max 4 shown). |
| 6 | `books.ts` | series summary, volume summaries, page counts, `readHref` / `pdfHref` | Real titles already in. Buttons stay disabled until the links exist. |
| 7 | `tools.ts` | real tools | Each tool is its own project deployed at `/tools/<slug>/`. "idea" tools show "Coming soon". |
| 8 | `lab.ts` | experiments, including abandoned ones | The personal half. Nothing here has to ship. |
| 9 | `pages.ts` | intros + search descriptions for blog, projects, tools, lab, now, work | One or two sentences each. |
| 10 | `src/content/blog/*.md` | posts | See below. Rewrite or delete the two starter posts. |

## Blog posts
One Markdown file per post. The filename is the URL: `src/content/blog/my-post.md` → `/blog/my-post`.

```md
---
title: "Post title"
date: 2026-10-04
summary: "One sentence. Shows on cards and in RSS."
tags: [design, svelte]
draft: true        # optional: visible in `npm run dev` only, never published
---
```
- Code fences get NEONDECK syntax highlighting (ts, js, svelte, python, go, bash, json, yaml, css, html, sql, md, diff).
- `style-guide.md` is a draft showing every element. Open `/blog/style-guide` in dev to check styling.
- Reading time and heading anchors are automatic.

## Images
Put files in `static/images/…` and reference them as `/images/…`. Always write alt text.

## Before publishing
1. `npm run todo` → 0 placeholders (or only ones you accept).
2. `npm run check` and `npm run build`. The build fails on broken internal links, which is a feature.
3. Upload `build/` to any static host. `404.html` is the not-found page.

## Site map
| URL | Purpose | Half |
|---|---|---|
| `/` | landing: hero, now, featured projects, writing, tools + books, work CTA, lab | both |
| `/about` | who you are, principles, timeline, stack, colophon | personal |
| `/work` | services, process, proof, contact | business |
| `/blog`, `/blog/<slug>` | writing, tag filter, RSS at `/rss.xml` | both |
| `/projects`, `/projects/<slug>` | everything you build: status, stack, code, downloads, changelog | business |
| `/tools` | links to hosted web tools | business |
| `/books` | the Field Guide series (paper surface) | both |
| `/lab` | experiments log | personal |
| `/now` | current focus (nownownow.com) | personal |
| `/sitemap.xml`, `/rss.xml` | for search engines and feed readers | |
