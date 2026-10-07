---
title: "Zettelkasten: Obsidian plugin or ground-up build?"
zh: 卡片盒
date: 2026-10-07
status: building
summary: The plan for a notes system that archives its sources, runs code and builds GraphRAG communities. Build on Obsidian, or start from scratch?
tags: [design, graphrag, obsidian]
project: zettelkasten
---

The Zettelkasten is my next desktop project. Before any code, there's one big call to make. Build it from scratch, or build it as Obsidian plugins?

## What it needs to do

Think Obsidian, plus [Shiori](https://github.com/go-shiori/shiori), plus Jupyter, plus GraphRAG. Three features.

**Sources as nodes.** Upload a PDF, a Word file, an Excel file or a web page. Each one becomes a node in the graph. I can read it in place. Web pages are archived when I save them, so a page can't change or vanish later. The link stays with it. Every source gets a GenAI summary and a space for my own notes.

**GraphRAG communities.** Not "it's a graph, so it's GraphRAG". The method from the paper: [From Local to Global](https://arxiv.org/abs/2404.16130) (Edge et al., 2024). The system finds groups on its own. Each group gets a node with a generated summary and a space for my notes. Groups link up to higher-level groups. The system decides how many levels there are. It rebuilds on a schedule.

**Code that runs.** Notebooks as nodes. Code blocks inside notes that run in place.

## What GraphRAG means here

The paper's method has five steps.

1. Split the text into chunks.
2. An LLM reads each chunk. It pulls out entities and the relationships between them.
3. Those become a graph.
4. Hierarchical Leiden clustering splits the graph into communities, then splits those again. The data sets the depth.
5. An LLM writes a report for each community.

One detail matters. The paper clusters entities, not documents. So a community isn't "these five notes". It's "these people, papers and ideas, which keep showing up together". A community node lists its key entities and links to the sources they came from. It links up to its parent and down to its children. Entities stay in the index. Making each one a note would flood the vault.

## The two options

**Ground up.** A Wails app with my own editor, links, search and graph view. Full control. The NEONDECK look everywhere. But months go into rebuilding what Obsidian already does well, before I reach any of the three features.

**Obsidian plugins.** Obsidian gives me the editor, links, backlinks, search, graph view, Canvas, sync and a plugin ecosystem. My notes stay plain Markdown files on disk.

Most of the work is the same either way. Archiving web pages. Converting Word and Excel files. The GraphRAG pipeline. Running code kernels. Obsidian can't show Word, Excel or saved web pages, so I'd write those viewers in both cases.

So I checked each feature against the plugin API.

| Need | In Obsidian |
|---|---|
| Read Word, Excel and saved pages | custom file views |
| A summary and notes per source | one Markdown note per source |
| Upload files and URLs | commands, ribbon, drag and drop |
| Community nodes | generated Markdown notes |
| A graph of community levels | a custom view. The core graph view can't show levels |
| Notebooks as nodes | a custom view for `.ipynb` files |
| Code blocks that run | code block processors, with output below |
| Scheduled rebuilds | a background service |

Everything fits. Only the community graph needs its own view, and I'd build that view either way.

## The decision

An Obsidian plugin, plus a local Python service. No ground-up build.

Why Python for the service? The reference GraphRAG is Python. So are the best document converters, and so is Jupyter. Using the real pipeline beats writing my own copy of it.

```text
Obsidian (my notes, the editor, links, graph)
  └─ zettelkasten plugin (TypeScript + Svelte)
       readers: Word, Excel, saved pages, notebooks
       runnable code blocks, community graph view
         │  HTTP on localhost
         ▼
     Python service (no UI)
       ingest: fetch, archive, convert, summarise
       graphrag: index, communities, reports
       kernels: Jupyter, one per note
         │
         ▼
     Ollama on the local GPU (or any OpenAI-compatible API)
```

The service has no UI. It runs on localhost, and the plugin talks to it over HTTP. If Obsidian ever gets in the way, a Wails front end can use the same service and the same vault. The door to a ground-up build stays open. I don't pay for one now.

What I give up. Obsidian is closed source. The heavy features need the service running. The NEONDECK look comes through an Obsidian theme, not full control.

## Choices made

- **A new vault.** It stays apart from my existing one until this is proven. GraphRAG writes notes into it.
- **Desktop only.** Ingest, GraphRAG and code all need the local service anyway.
- **Local models by default.** GraphRAG makes thousands of LLM calls per rebuild. Through Ollama on my own GPU, that costs nothing. Any OpenAI-compatible API can replace it.

## Keeping my notes when the groups change

This is the hardest design problem. Every rebuild can reshuffle the communities. If my notes sit on a community that disappears, they go with it.

So each rebuild matches new communities to old ones by how many members they share. A match keeps its ID, its file name and my notes. A community with my notes that finds no match moves to a retired folder. Nothing I write gets deleted.

## How a source is stored

Each source gets a folder.

```text
Sources/<name>/
  <name>.md        the node: reader, summary, notes
  original.pdf     or .docx, .xlsx, or snapshot-2026-10-07.html
  content.md       extracted text, for search and GraphRAG
```

The AI summary sits between markers, so a rebuild can replace it. Software never touches the notes section. Saving a web page again adds a new dated snapshot. It never overwrites the old one.

## The plan

0. **Spike, about a week.** Run GraphRAG on about 50 documents with a local model. Measure time, call count and community quality. Test the file viewers. Run a kernel from a plugin. If Obsidian can't do something, rethink before building on it.
1. **Scaffold.** Repo, plugin build, service, settings, vault.
2. **Sources.** Ingest, archive, convert, summarise, read.
3. **Code.** Notebook view, runnable code blocks.
4. **GraphRAG.** Index, community notes, matching, schedule, community graph view.
5. **Polish.** A NEONDECK Obsidian theme, then a public release.

The spike results go here when they're in: timings, call counts and sample community reports.
