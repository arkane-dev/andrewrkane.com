<script lang="ts">
	import { Panel, Button, Tag } from '@cyberpunk-apps/neondeck';
	import StatusTag from './StatusTag.svelte';
	import type { Project } from '#lib';
	let { project, index }: { project: Project; index?: string } = $props();
	const kindLabel = { web: 'web', desktop: 'desktop', library: 'library', book: 'book' };
</script>

<Panel title={project.name} {index} meta={project.zh}>
	<div class="tags">
		<StatusTag status={project.status} />
		<Tag tone="muted">{kindLabel[project.kind]}</Tag>
	</div>
	<p>{project.summary}</p>
	<Button size="sm" variant="outline" arrow href="/projects/{project.slug}">Details</Button>
</Panel>

<style>
	.tags { display: flex; gap: var(--nd-space-2); margin-bottom: var(--nd-space-3); }
	p { color: var(--nd-text-dim); font-size: var(--nd-text-sm); min-height: 3em; }
</style>
