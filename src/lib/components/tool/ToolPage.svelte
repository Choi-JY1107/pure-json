<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import MonacoEditor from '$lib/components/editor/MonacoEditor.svelte';
	import TreeView from '$lib/components/editor/TreeView.svelte';
	import CopyButton from '$lib/components/ui/CopyButton.svelte';
	import ConfirmModal from '$lib/components/ui/ConfirmModal.svelte';
	import LoadFileButton from '$lib/components/ui/LoadFileButton.svelte';
	import { parseJsonToTree } from '$lib/utils/tree-parser';
	import type { EditorStore } from '$lib/stores/editor';
	import * as m from '$lib/paraglide/messages.js';
	import type { Snippet } from 'svelte';

	let {
		mode = 'dual',
		metaTitle,
		metaDescription,
		title,

		// dual & viewer mode
		editor,
		transform,
		actionLabel = '',
		inputLabel = m.json_input_label(),
		outputLabel = m.output_label(),
		outputLanguage = 'json',

		// diff mode
		diffTransform,
		diffLeftLabel,
		diffRightLabel,
		diffResultLabel,

		// content
		intro,
		howto,
		features,
		usecases,
		faqs,

		// slots
		toolbarExtra,
		beforePanels
	}: {
		mode?: 'dual' | 'viewer' | 'diff';
		metaTitle: string;
		metaDescription: string;
		title: string;

		editor?: EditorStore;
		transform?: (input: string) => string;
		actionLabel?: string;
		inputLabel?: string;
		outputLabel?: string;
		outputLanguage?: string;

		diffTransform?: (left: string, right: string) => string;
		diffLeftLabel?: string;
		diffRightLabel?: string;
		diffResultLabel?: string;

		intro: string;
		howto?: Array<{ step: string; desc: string }>;
		features?: string[];
		usecases?: string[];
		faqs: Array<{ question: string; answer: string }>;

		toolbarExtra?: Snippet;
		beforePanels?: Snippet;
	} = $props();

	let showClearModal = $state(false);

	// diff mode state
	let diffLeft = $state('');
	let diffRight = $state('');
	let diffOutput = $state('');
	let diffError = $state('');

	// viewer mode: derived tree
	let treeData = $derived.by(() => {
		if (mode !== 'viewer' || !editor?.input) return null;
		try {
			return parseJsonToTree(JSON.parse(editor.input));
		} catch {
			return null;
		}
	});

	function handleAction() {
		if (mode === 'diff') {
			try {
				diffError = '';
				diffOutput = diffTransform!(diffLeft, diffRight);
			} catch (e) {
				diffError = (e as Error).message;
				diffOutput = '';
			}
		} else if (editor && transform) {
			try {
				editor.setOutput(transform(editor.input));
			} catch (e) {
				editor.setError((e as Error).message);
			}
		}
	}

	function handleClear() {
		if (mode === 'diff') {
			diffLeft = '';
			diffRight = '';
			diffOutput = '';
			diffError = '';
		} else {
			editor?.clear();
		}
	}

	function loadDiffSample() {
		diffLeft = JSON.stringify({ name: "John", age: 30, city: "Seoul" }, null, 2);
		diffRight = JSON.stringify({ name: "John", age: 31, city: "Busan", email: "john@example.com" }, null, 2);
	}

	// error state (unified)
	let errorMessage = $derived(mode === 'diff' ? diffError : editor?.error ?? '');
</script>

<MetaTags title={metaTitle} description={metaDescription} />

<div class="tp">
	<!-- ── Toolbar ── -->
	<div class="tp__toolbar">
		<div class="tp__toolbar-left">
			<h1 class="tp__title">{title}</h1>
		</div>
		<div class="tp__toolbar-right">
			{#if toolbarExtra}
				{@render toolbarExtra()}
				<div class="tp__divider"></div>
			{/if}

			{#if mode === 'diff'}
				<button class="tp__btn tp__btn--soft" onclick={loadDiffSample}>
					<span class="material-symbols-outlined tp__btn-icon">edit_note</span>
					{m.btn_sample_short()}
				</button>
			{:else}
				<button class="tp__btn tp__btn--soft" onclick={() => editor?.loadSample()}>
					<span class="material-symbols-outlined tp__btn-icon">edit_note</span>
					{m.btn_sample_short()}
				</button>
				<LoadFileButton onLoad={(content) => editor?.setInput(content)} />
			{/if}

			{#if actionLabel}
				<div class="tp__divider"></div>
				<button class="tp__btn tp__btn--primary" onclick={handleAction}>
					<span class="material-symbols-outlined tp__btn-icon" style="font-variation-settings: 'FILL' 1;">bolt</span>
					{actionLabel}
				</button>
			{/if}

			<button class="tp__btn tp__btn--ghost" onclick={() => (showClearModal = true)}>
				<span class="material-symbols-outlined tp__btn-icon">delete_outline</span>
				{m.btn_clear()}
			</button>
		</div>
	</div>

	<!-- ── Before Panels ── -->
	{#if beforePanels}
		{@render beforePanels()}
	{/if}

	<!-- Diff result panel (above grid) -->
	{#if mode === 'diff' && (diffOutput || diffError)}
		<div class="tp__panel">
			<div class="tp__panel-header">
				<span class="material-symbols-outlined tp__panel-icon tp__panel-icon--primary">task_alt</span>
				<span class="tp__panel-label">{diffResultLabel}</span>
				<div class="tp__panel-actions">
					<CopyButton text={diffOutput || diffError} />
				</div>
			</div>
			<div class="tp__editor tp__editor--short">
				<MonacoEditor value={diffError || diffOutput} readOnly language="plaintext" />
			</div>
		</div>
	{/if}

	<!-- ── Panels ── -->
	<div class="tp__grid" class:tp__grid--triple={mode === 'diff'}>

		{#if mode === 'dual'}
			<!-- Input -->
			<div class="tp__panel">
				<div class="tp__panel-header">
					<span class="material-symbols-outlined tp__panel-icon tp__panel-icon--tertiary">data_object</span>
					<span class="tp__panel-label">{inputLabel}</span>
				</div>
				<div class="tp__editor">
					<MonacoEditor bind:value={editor!.input} placeholder={m.editor_placeholder()} />
				</div>
			</div>
			<!-- Output -->
			<div class="tp__panel">
				<div class="tp__panel-header">
					<span class="material-symbols-outlined tp__panel-icon tp__panel-icon--primary">task_alt</span>
					<span class="tp__panel-label">{outputLabel}</span>
					<div class="tp__panel-actions">
						<CopyButton text={editor!.output} />
					</div>
				</div>
				<div class="tp__editor">
					<MonacoEditor value={editor!.output || editor!.error} readOnly language={outputLanguage} />
				</div>
			</div>

		{:else if mode === 'viewer'}
			<!-- Input -->
			<div class="tp__panel">
				<div class="tp__panel-header">
					<span class="material-symbols-outlined tp__panel-icon tp__panel-icon--tertiary">data_object</span>
					<span class="tp__panel-label">Raw JSON Input</span>
				</div>
				<div class="tp__editor">
					<MonacoEditor bind:value={editor!.input} placeholder={m.editor_placeholder()} />
				</div>
			</div>
			<!-- Tree View -->
			<div class="tp__panel">
				<div class="tp__panel-header">
					<span class="material-symbols-outlined tp__panel-icon tp__panel-icon--primary">account_tree</span>
					<span class="tp__panel-label">Visual Tree</span>
					<div class="tp__panel-actions">
						<CopyButton text={editor!.input} />
					</div>
				</div>
				<div class="tp__tree">
					{#if treeData}
						<TreeView node={treeData} />
					{:else if editor!.input}
						<div class="tp__empty">
							<span class="material-symbols-outlined" style="font-size: 2rem; opacity: 0.3;">error_outline</span>
							<p>{m.tree_invalid_json()}</p>
						</div>
					{:else}
						<div class="tp__empty">
							<span class="material-symbols-outlined" style="font-size: 2rem; opacity: 0.3;">data_object</span>
							<p>{m.tree_paste_json()}</p>
						</div>
					{/if}
				</div>
			</div>

		{:else if mode === 'diff'}
			<!-- Left Input -->
			<div class="tp__panel">
				<div class="tp__panel-header">
					<span class="material-symbols-outlined tp__panel-icon tp__panel-icon--tertiary">data_object</span>
					<span class="tp__panel-label">{diffLeftLabel}</span>
					<div class="tp__panel-actions">
						<LoadFileButton onLoad={(content) => (diffLeft = content)} />
					</div>
				</div>
				<div class="tp__editor">
					<MonacoEditor bind:value={diffLeft} placeholder={m.editor_placeholder()} />
				</div>
			</div>
			<!-- Right Input -->
			<div class="tp__panel">
				<div class="tp__panel-header">
					<span class="material-symbols-outlined tp__panel-icon tp__panel-icon--tertiary">data_object</span>
					<span class="tp__panel-label">{diffRightLabel}</span>
					<div class="tp__panel-actions">
						<LoadFileButton onLoad={(content) => (diffRight = content)} />
					</div>
				</div>
				<div class="tp__editor">
					<MonacoEditor bind:value={diffRight} placeholder={m.editor_placeholder()} />
				</div>
			</div>
		{/if}
	</div>

	<!-- ── Error ── -->
	{#if errorMessage}
		<div class="tp__error">
			<span class="material-symbols-outlined" style="font-size: 1rem;">error</span>
			<span>{errorMessage}</span>
		</div>
	{/if}

	<!-- ── Article ── -->
	<article class="tp__article prose prose-sm">
		<h2>{title}</h2>
		<p>{intro}</p>

		{#if howto && howto.length > 0}
			<h3>{m.section_howto()}</h3>
			<ol>
				{#each howto as item, i (i)}
					<li><strong>{item.step}</strong> — {item.desc}</li>
				{/each}
			</ol>
		{/if}

		{#if features && features.length > 0}
			<h3>{m.section_features()}</h3>
			<ul>
				{#each features as feature, i (i)}
					<li>{feature}</li>
				{/each}
			</ul>
		{/if}

		{#if usecases && usecases.length > 0}
			<h3>{m.section_usecases()}</h3>
			<ul>
				{#each usecases as usecase, i (i)}
					<li>{usecase}</li>
				{/each}
			</ul>
		{/if}

		<h3>{m.section_faq()}</h3>
		{#each faqs as faq, i (i)}
			<details>
				<summary><strong>{faq.question}</strong></summary>
				<p>{faq.answer}</p>
			</details>
		{/each}
	</article>
</div>

<ConfirmModal
	bind:open={showClearModal}
	title={m.confirm_clear_title()}
	message={m.confirm_clear_message()}
	confirmLabel={m.btn_clear()}
	onConfirm={handleClear}
/>

<style>
	@reference "../../../app.css";

	.tp {
		@apply flex flex-col gap-4;
	}

	/* ── Toolbar ── */
	.tp__toolbar {
		@apply h-14 flex flex-wrap items-center justify-between gap-3 px-6
		       bg-surface-container-low border border-outline-variant/15 rounded-xl;
	}
	.tp__toolbar-left {
		@apply flex items-center gap-6;
	}
	.tp__toolbar-right {
		@apply flex items-center gap-2 flex-wrap;
	}
	.tp__title {
		@apply font-headline text-lg font-semibold tracking-tight;
	}
	.tp__divider {
		@apply h-6 border-l border-outline-variant/20;
	}

	/* ── Buttons ── */
	.tp__btn {
		@apply inline-flex items-center gap-1.5 px-3 py-1.5
		       text-[0.6875rem] font-semibold uppercase tracking-wider
		       rounded-lg transition-all duration-200 cursor-pointer;
	}
	.tp__btn-icon {
		font-size: 1rem;
	}
	.tp__btn--primary {
		@apply bg-linear-to-br from-primary to-primary-container
		       text-on-primary shadow-lg shadow-primary-container/20
		       active:scale-95;
	}
	.tp__btn--soft {
		@apply bg-surface-container-high text-on-surface
		       hover:bg-surface-container-highest;
	}
	.tp__btn--ghost {
		@apply bg-transparent text-secondary hover:text-on-surface
		       hover:bg-surface-container;
	}

	/* ── Panel Grid ── */
	.tp__grid {
		@apply grid grid-cols-1 lg:grid-cols-2 gap-4;
	}
	.tp__panel {
		@apply flex flex-col rounded-xl overflow-hidden
		       border border-outline-variant/10 shadow-lg;
	}
	.tp__panel-header {
		@apply h-10 px-4 flex items-center gap-2
		       bg-surface-container-low border-b border-outline-variant/5;
	}
	.tp__panel-icon {
		font-size: 0.875rem;
	}
	.tp__panel-icon--tertiary {
		color: var(--md-tertiary);
	}
	.tp__panel-icon--primary {
		color: var(--md-primary);
	}
	.tp__panel-label {
		@apply text-[0.625rem] uppercase tracking-widest font-bold text-secondary flex-1;
	}
	.tp__panel-actions {
		@apply flex items-center gap-1;
	}

	/* ── Editor / Tree ── */
	.tp__editor {
		@apply h-[calc(100vh-20rem)];
	}
	.tp__editor--short {
		@apply h-80;
	}
	.tp__tree {
		@apply h-[calc(100vh-20rem)] overflow-auto p-6;
	}
	.tp__empty {
		@apply h-full flex flex-col items-center justify-center gap-2
		       text-sm text-secondary;
	}

	/* ── Error ── */
	.tp__error {
		@apply flex items-center gap-2 px-4 py-3
		       rounded-lg bg-error-container/20 text-error
		       border border-error/20 text-sm;
	}

	/* ── Article ── */
	.tp__article {
		@apply max-w-none mt-4;
	}

	/* ── Responsive ── */
	@media (width < 64rem) {
		.tp__editor {
			@apply h-72;
		}
		.tp__tree {
			@apply h-72;
		}
	}
</style>
