<script lang="ts">
	import { Tag } from '@cyberpunk-apps/neondeck';
	import type { Status } from '#lib';
	let { status }: { status: Status | 'abandoned' } = $props();
	const tone = { idea: 'muted', building: 'warning', beta: 'info', live: 'success', archived: 'muted', abandoned: 'danger' } as const;
</script>

<Tag tone={tone[status]} dot={status === 'building' || status === 'live'}>{status}</Tag>
