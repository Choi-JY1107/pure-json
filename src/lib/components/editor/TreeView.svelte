<script lang="ts">
	import type { TreeNode } from '$lib/types/tree';
	import TreeView from './TreeView.svelte';

	let { node }: { node: TreeNode } = $props();
	let expanded = $derived(node.expanded ?? false);

	function toggle() {
		expanded = !expanded;
	}

	function getValueDisplay(n: TreeNode): string {
		switch (n.type) {
			case 'string':
				return `"${n.value}"`;
			case 'null':
				return 'null';
			case 'object':
				return `{${n.children?.length ?? 0}}`;
			case 'array':
				return `[${n.children?.length ?? 0}]`;
			default:
				return String(n.value);
		}
	}

	const hasChildren = $derived(node.children && node.children.length > 0);
</script>

<div class="tree-node" style="padding-left: {node.depth * 16}px">
	<div class="tree-node__row">
		{#if hasChildren}
			<button
				class="tree-node__toggle inline-flex items-center justify-center w-6 h-6 rounded-full bg-transparent hover:bg-surface-container transition-colors"
				onclick={toggle}
				aria-label={expanded ? 'Collapse' : 'Expand'}
			>
				<svg
					class="tree-node__toggle-icon"
					class:tree-node__toggle-icon--expanded={expanded}
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						fill-rule="evenodd"
						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		{:else}
			<span class="tree-node__spacer"></span>
		{/if}

		<span class="tree-node__key">{node.key}</span>
		<span class="tree-node__separator">:</span>
		<span class="tree-node__value tree-node__value--{node.type}">
			{getValueDisplay(node)}
		</span>
	</div>

	{#if hasChildren && expanded}
		{#each node.children! as child (child.path)}
			<TreeView node={child} />
		{/each}
	{/if}
</div>

<style>
	@reference "../../../app.css";

	.tree-node {
		@apply font-mono text-sm;
	}
	.tree-node__row {
		@apply flex items-center gap-1 py-0.5
		       hover:bg-surface-container-low rounded px-1;
	}
	.tree-node__toggle-icon {
		@apply w-3 h-3 transition-transform;
	}
	.tree-node__toggle-icon--expanded {
		@apply rotate-90;
	}
	.tree-node__spacer {
		@apply w-6;
	}
	.tree-node__key {
		@apply text-primary font-semibold;
	}
	.tree-node__separator {
		@apply text-on-surface/40;
	}
	.tree-node__value--string {
		@apply text-tertiary;
	}
	.tree-node__value--number {
		@apply text-primary-dim;
	}
	.tree-node__value--boolean {
		@apply text-tertiary-dim;
	}
	.tree-node__value--null {
		@apply text-error;
	}
</style>
