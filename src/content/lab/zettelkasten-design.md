---
title: "Zettelkasten: Obsidian plugin or ground-up build?"
zh: 卡片盒
date: 2026-10-07
status: live
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

## Spike results

The spike ran from 9 to 11 October. The plan holds. Two details changed, and GraphRAG got much cheaper.

The test corpus: 50 documents, about 244,000 words. 19 AI and robotics papers, 8 prop and cosplay books, and 23 Chinese recipes as PDFs and saved web pages. Three domains that shouldn't mix. That makes community quality easy to check.

### Readers

Word works through mammoth, Excel through SheetJS with a tab per sheet. PDFs use Obsidian's own viewer.

Saved web pages were the surprise. A "save complete" page keeps its assets in a `_files` folder, and Obsidian blocks the viewer from loading them. No styles, no images. A single file with everything inlined looks like the live page. So web capture must produce one self-contained file, as SingleFile does.

### Code

The plugin sends code to the service, and the service runs it in a Jupyter kernel, one per note. State carries between blocks. The first run takes about a second, to start the kernel. After that a run takes about 7 ms. Matplotlib plots come back as images.

One catch. A code block processor claims every block in its language, so it would make all Python in the vault runnable. The plugin checks for `run` in the fence line and leaves other blocks as plain code.

### GraphRAG

Everything ran on one RTX 5090 through Ollama. I tried four set-ups.

| Run | Time | Top-level purity |
|---|---|---|
| gemma3 27B, the paper's method | 5 h 29 min | 98.8% |
| qwen3 30B-A3B, the paper's method | 10 h 51 min | 96.0% |
| Noun-phrase graph, every report | 7 h 52 min | 98.9% |
| Hybrid | **35 min** | 98.8% |

Purity is the share of a community's chunks that come from its main domain, averaged over the top level. All four keep cooking, cosplay and AI apart.

The first gemma3 run worked, with two kinds of noise. Author names from reference lists became 3,085 of its 8,928 entities. Quantities such as "1 kg" and "105°C" became entities too. qwen3 built a bigger graph with the same noise, in twice the time. Some of its descriptions added facts that weren't in the source. That's the wrong trade for notes that must stay true to their sources.

The noun-phrase graph replaces LLM extraction with phrase matching. Phrases that share a chunk get an edge. It builds in 6 minutes, and its communities are as clean as the LLM graph's. They also join more documents. The slow part is the reports, because each one reads raw text.

The hybrid keeps what worked:

1. Cut reference lists and appendices from the papers.
2. Build the noun-phrase graph.
3. Write reports for the top two levels only. That's 85 reports, not 976.
4. Tag entities with [GLiNER](https://github.com/urchade/GLiNER), a small typed NER model. Types: concept, method, dataset, tool, material, ingredient. It took 8 seconds.

The top-level communities read like a table of contents for the corpus. There are 18. A few: the Hierarchical Reasoning Model, prompt caching for LLM inference, cosplay armor and props, Sichuan recipes, ReAct. Every finding in a report cites the chunks behind it.

GLiNER entities make good links. Cosplay armor links to worbla, EVA foam, hot air gun and Dremel. Game theory links to prisoner's dilemma, shadow of the future and theory of mind. The types are rough. Model names come out as datasets, and resin comes out as an ingredient. Better labels and a stop-list should fix most of it.

### Keeping it in sync

GraphRAG's update mode only appends. New documents form their own communities and never join old ones. Edited documents are skipped, because it compares titles. Deletions are ignored.

Clustering takes 7 seconds on this corpus. Reports take the time. So each rebuild will re-cluster the whole graph and pay the LLM only for what changed. Extract from changed notes only, found by content hash. Match new communities to old ones. Rewrite a report only when its membership moved by roughly 20% or more. Short notes stay whole as one chunk, so an edited note means one chunk to re-read.

Does a small change reshuffle the communities? Phase 4 tested it. Cluster 45 documents, add 5 more, cluster again. Every top-level community found its match, and 82 to 100% of them kept at least 80% of their phrases. One level down, about 70% held that well. So a new paper on a topic joins its community instead of starting its own.

### Built

All five phases shipped on 2026-10-24 as [version 0.1.0](https://github.com/arkane-dev/zettelkasten).

- **Sources:** PDFs, Office files and web pages saved whole, with readers inside the note and a summary from the local model.
- **Code:** blocks marked `run` run through Jupyter kernels, one per note. Notebooks open in their own view.
- **Communities:** the hybrid from the spike, in my own code instead of the graphrag library. The library's update mode can't re-cluster, and its install is 7 GB. On the 50 documents a first build takes 14 minutes. A one-note edit takes 35 seconds.
- **Theme:** NEONDECK for Obsidian, checked against WCAG 2.2 AA.
