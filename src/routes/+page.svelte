<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import MonacoEditor from '$lib/components/editor/MonacoEditor.svelte';
	import TreeView from '$lib/components/editor/TreeView.svelte';
	import CopyButton from '$lib/components/ui/CopyButton.svelte';
	import ConfirmModal from '$lib/components/ui/ConfirmModal.svelte';
	import LoadFileButton from '$lib/components/ui/LoadFileButton.svelte';
	import { parseJsonToTree } from '$lib/utils/tree-parser';
	import { getEditorStore } from '$lib/stores/editor';
import * as m from '$lib/paraglide/messages.js';

	const editor = getEditorStore('json-viewer');
	let showClearModal = $state(false);

	let treeData = $derived.by(() => {
		if (!editor.input) return null;
		try {
			const parsed = JSON.parse(editor.input);
			return parseJsonToTree(parsed);
		} catch {
			return null;
		}
	});
</script>

<MetaTags title={m.viewer_title()} description={m.viewer_description()} />

<div class="viewer">
	<!-- Toolbar -->
	<div class="viewer__toolbar">
		<div class="viewer__toolbar-left">
			<h1 class="viewer__title">{m.viewer_h1()}</h1>
		</div>
		<div class="viewer__toolbar-right">
			<button class="viewer__sample-btn" onclick={() => editor.loadSample()}>
				<span class="material-symbols-outlined" style="font-size: 0.875rem;">edit_note</span>
				{m.btn_load_sample()}
			</button>
			<LoadFileButton onLoad={(content) => editor.setInput(content)} />
			<CopyButton text={editor.input} />
			<button class="viewer__clear-btn" onclick={() => (showClearModal = true)}>
				<span class="material-symbols-outlined" style="font-size: 0.875rem;">delete_outline</span>
				{m.btn_clear()}
			</button>
		</div>
	</div>

	<!-- Split panels: Raw Input (left) + Tree View (right) -->
	<div class="viewer__panels">
		<!-- Left: Raw JSON Input -->
		<section class="viewer__panel viewer__panel--input">
			<div class="viewer__panel-header">
				<div class="viewer__header-left">
					<span class="material-symbols-outlined viewer__icon viewer__icon--tertiary">data_object</span>
					<span class="viewer__label">Raw JSON Input</span>
				</div>
				<div class="viewer__header-right"></div>
			</div>
			<div class="viewer__editor">
				<MonacoEditor bind:value={editor.input} placeholder={m.editor_placeholder()} />
			</div>
		</section>

		<!-- Right: Visual Tree Architecture -->
		<section class="viewer__panel viewer__panel--tree">
			<div class="viewer__panel-header">
				<div class="viewer__header-left">
					<span class="material-symbols-outlined viewer__icon viewer__icon--primary">account_tree</span>
					<span class="viewer__label">Visual Tree Architecture</span>
				</div>
			<div class="viewer__header-right"></div>
			</div>
			<div class="viewer__tree">
				{#if treeData}
					<TreeView node={treeData} />
				{:else if editor.input}
					<div class="viewer__empty">
						<span class="material-symbols-outlined" style="font-size: 2rem; opacity: 0.3;">error_outline</span>
						<p>{m.tree_invalid_json()}</p>
					</div>
				{:else}
					<div class="viewer__empty">
						<span class="material-symbols-outlined" style="font-size: 2rem; opacity: 0.3;">data_object</span>
						<p>{m.tree_paste_json()}</p>
					</div>
				{/if}
			</div>
		</section>
	</div>

	<!-- Article (SEO content) -->
	<article class="viewer__article prose prose-sm">
		<h2>{m.viewer_h1()}</h2>
		<p>{m.viewer_intro()}</p>

		<h3>{m.section_howto()}</h3>
		<ol>
			<li><strong>{m.viewer_howto_s1()}</strong> — {m.viewer_howto_s1_desc()}</li>
			<li><strong>{m.viewer_howto_s2()}</strong> — {m.viewer_howto_s2_desc()}</li>
			<li><strong>{m.viewer_howto_s3()}</strong> — {m.viewer_howto_s3_desc()}</li>
		</ol>

		<h3>{m.section_features()}</h3>
		<ul>
			<li>{m.viewer_feature1()}</li>
			<li>{m.viewer_feature2()}</li>
			<li>{m.viewer_feature3()}</li>
			<li>{m.viewer_feature4()}</li>
		</ul>

		<h3>{m.section_usecases()}</h3>
		<ul>
			<li>{m.viewer_usecase1()}</li>
			<li>{m.viewer_usecase2()}</li>
			<li>{m.viewer_usecase3()}</li>
		</ul>

		<h3>{m.section_faq()}</h3>
		<details>
			<summary><strong>{m.viewer_faq_q1()}</strong></summary>
			<p>{m.viewer_faq_a1()}</p>
		</details>
		<details>
			<summary><strong>{m.viewer_faq_q2()}</strong></summary>
			<p>{m.viewer_faq_a2()}</p>
		</details>
		<details>
			<summary><strong>{m.viewer_faq_q3()}</strong></summary>
			<p>{m.viewer_faq_a3()}</p>
		</details>
		<details>
			<summary><strong>{m.viewer_faq_q4()}</strong></summary>
			<p>{m.viewer_faq_a4()}</p>
		</details>
		<details>
			<summary><strong>{m.viewer_faq_q5()}</strong></summary>
			<p>{m.viewer_faq_a5()}</p>
		</details>
	</article>
</div>

<ConfirmModal
	bind:open={showClearModal}
	title={m.confirm_clear_title()}
	message={m.confirm_clear_message()}
	confirmLabel={m.btn_clear()}
	onConfirm={() => editor.clear()}
/>

<style>
	@reference "../app.css";

	.viewer {
		@apply flex flex-col gap-6;
	}

	/* Toolbar */
	.viewer__toolbar {
		@apply h-14 flex items-center justify-between px-6
		       bg-surface-container-low border border-outline-variant/15 rounded-xl;
	}
	.viewer__toolbar-left {
		@apply flex items-center gap-6;
	}
	.viewer__toolbar-right {
		@apply flex items-center gap-3;
	}
	.viewer__title {
		@apply font-headline text-lg font-semibold tracking-tight;
	}
	.viewer__sample-btn {
		@apply flex items-center gap-1.5 px-3 py-1.5
		       bg-surface-container-high text-on-surface
		       text-[0.7rem] font-semibold uppercase tracking-wider
		       rounded-lg transition-all cursor-pointer
		       hover:bg-surface-container-highest;
	}
	.viewer__clear-btn {
		@apply flex items-center gap-1.5 px-3 py-1.5
		       bg-transparent text-secondary
		       text-[0.7rem] font-semibold uppercase tracking-wider
		       rounded-lg transition-all cursor-pointer
		       hover:text-on-surface hover:bg-surface-container;
	}

	/* Split panels */
	.viewer__panels {
		@apply grid grid-cols-1 lg:grid-cols-2 gap-4;
	}
	.viewer__panel {
		@apply flex flex-col rounded-xl overflow-hidden
		       border border-outline-variant/10 shadow-lg;
	}
	.viewer__panel--input {
	}
	.viewer__panel--tree {
		@apply bg-surface;
	}

	/* Panel header */
	.viewer__panel-header {
		@apply h-10 px-4 flex items-center justify-between
		       bg-surface-container-low border-b border-outline-variant/5;
	}
	.viewer__header-left {
		@apply flex items-center gap-2;
	}
	.viewer__header-right {
		@apply flex items-center gap-3;
	}
	.viewer__icon {
		font-size: 0.875rem;
	}
	.viewer__icon--tertiary {
		color: var(--md-tertiary);
	}
	.viewer__icon--primary {
		color: var(--md-primary);
	}
	.viewer__label {
		@apply text-[0.625rem] uppercase tracking-widest font-bold text-secondary;
	}
	.viewer__text-btn {
		@apply text-[0.625rem] uppercase tracking-tighter font-semibold
		       text-secondary hover:text-primary transition-colors cursor-pointer;
	}
	.viewer__text-btn--danger {
		@apply hover:text-error;
	}

	/* Editor & Tree */
	.viewer__editor {
		@apply h-[calc(100vh-16rem)];
	}
	.viewer__tree {
		@apply h-[calc(100vh-16rem)] overflow-auto p-6;
	}
	.viewer__empty {
		@apply h-full flex flex-col items-center justify-center gap-2
		       text-sm text-secondary;
	}

	/* Article */
	.viewer__article {
		@apply max-w-none;
	}

	/* Mobile: both shrink equally */
	@media (width < 64rem) {
		.viewer__editor,
		.viewer__tree {
			@apply h-72;
		}
	}
</style>
