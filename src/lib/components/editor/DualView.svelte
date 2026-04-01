<script lang="ts">
	import MonacoEditor from './MonacoEditor.svelte';
	import TreeView from './TreeView.svelte';
	import { parseJsonToTree } from '$lib/utils/tree-parser';
	import type { TreeNode } from '$lib/types/tree';
	import * as m from '$lib/paraglide/messages.js';

	let {
		value = $bindable(''),
		placeholder = '',
		readOnly = false
	}: {
		value?: string;
		placeholder?: string;
		readOnly?: boolean;
	} = $props();

	let activeTab = $state<'code' | 'tree'>('code');
	let treeData = $state<TreeNode | null>(null);

	$effect(() => {
		if (activeTab === 'tree' && value) {
			try {
				const parsed = JSON.parse(value);
				treeData = parseJsonToTree(parsed);
			} catch {
				treeData = null;
			}
		}
	});
</script>

<div class="dual-view">
	<div role="tablist" class="dual-view__tabs flex border-b border-surface-container">
		<button
			role="tab"
			class="dual-view__tab px-4 py-2 text-sm font-medium transition-colors border-b-2"
			class:dual-view__tab--active={activeTab === 'code'}
			class:border-primary={activeTab === 'code'}
			class:text-primary={activeTab === 'code'}
			class:border-transparent={activeTab !== 'code'}
			onclick={() => (activeTab = 'code')}
		>
			{m.tab_code()}
		</button>
		<div class="dual-view__divider"></div>
		<button
			role="tab"
			class="dual-view__tab px-4 py-2 text-sm font-medium transition-colors border-b-2"
			class:dual-view__tab--active={activeTab === 'tree'}
			class:border-primary={activeTab === 'tree'}
			class:text-primary={activeTab === 'tree'}
			class:border-transparent={activeTab !== 'tree'}
			onclick={() => (activeTab = 'tree')}
		>
			{m.tab_tree()}
		</button>
	</div>

	<div class="dual-view__content">
		{#if activeTab === 'code'}
			<MonacoEditor bind:value {placeholder} {readOnly} />
		{:else if treeData}
			<div class="dual-view__tree">
				<TreeView node={treeData} />
			</div>
		{:else}
			<div class="dual-view__empty">
				{value ? m.tree_invalid_json() : m.tree_paste_json()}
			</div>
		{/if}
	</div>
</div>

<style>
	@reference "../../../app.css";

	.dual-view {
		@apply flex flex-col h-full;
	}
	.dual-view__divider {
		@apply w-px h-4 bg-surface-container self-center;
	}
	.dual-view__tab {
		@apply text-on-surface/70;
	}
	.dual-view__content {
		@apply flex-1 min-h-0;
	}
	.dual-view__tree {
		@apply h-full overflow-auto p-2 bg-surface
		       rounded-b-lg border border-surface-container border-t-0;
	}
	.dual-view__empty {
		@apply h-full flex items-center justify-center
		       text-on-surface/70 bg-surface
		       rounded-b-lg border border-surface-container border-t-0;
	}
</style>
