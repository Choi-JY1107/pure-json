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
		body,
		howto,
		features,
		usecases,
		faqs,

		// slots
		toolbarExtra,
		beforePanels,
		hero,
		belowContent
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
		body?: string[];
		howto?: Array<{ step: string; desc: string }>;
		features?: string[];
		usecases?: string[];
		faqs: Array<{ question: string; answer: string }>;

		toolbarExtra?: Snippet;
		beforePanels?: Snippet;
		hero?: Snippet;
		belowContent?: Snippet;
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

{#if hero}
	{@render hero()}
{/if}

<div class="tp" id="workspace">
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

		{#if body && body.length > 0}
			{#each body as para, i (i)}
				<p>{para}</p>
			{/each}
		{/if}

		{#if howto && howto.length > 0}
			<h3>{m.section_howto()}</h3>
			<ol>
				{#each howto as item, i (i)}
					<li><strong>{item.step}</strong>: {item.desc}</li>
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

	{#if belowContent}
		{@render belowContent()}
	{/if}
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
		@apply flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 md:px-5 py-3 rounded-2xl;
		background: var(--md-surface-container-low);
		border: 1px solid color-mix(in srgb, var(--md-outline-variant) 55%, transparent);
	}
	.tp__toolbar-left {
		@apply flex items-center gap-6 min-w-0;
	}
	.tp__toolbar-right {
		@apply flex items-center gap-1.5 flex-wrap;
	}
	.tp__title {
		@apply font-headline text-base md:text-lg font-bold tracking-tight truncate;
	}
	.tp__divider {
		@apply h-5 border-l mx-0.5;
		border-color: var(--md-outline-variant);
	}

	/* ── Buttons ── */
	.tp__btn {
		@apply inline-flex items-center gap-1.5 px-2.5 md:px-3 py-1.5
		       text-[0.8125rem] font-semibold
		       rounded-lg transition-all duration-150 cursor-pointer whitespace-nowrap;
	}
	.tp__btn-icon {
		font-size: 1.0625rem;
	}
	.tp__btn--primary {
		color: var(--md-on-primary);
		background: linear-gradient(135deg, var(--md-primary), var(--md-primary-dim));
		box-shadow: 0 6px 16px -6px color-mix(in srgb, var(--md-primary) 60%, transparent);
	}
	.tp__btn--primary:hover {
		filter: brightness(1.06);
	}
	.tp__btn--primary:active {
		@apply scale-95;
	}
	.tp__btn--soft {
		color: var(--md-on-surface);
		background: var(--md-surface-container-high);
	}
	.tp__btn--soft:hover {
		background: var(--md-surface-container-highest);
	}
	.tp__btn--ghost {
		@apply bg-transparent;
		color: var(--md-on-surface-variant);
	}
	.tp__btn--ghost:hover {
		color: var(--md-on-surface);
		background: var(--md-surface-container);
	}

	/* ── Panel Grid ── */
	.tp__grid {
		@apply grid grid-cols-1 lg:grid-cols-2 gap-4;
	}
	.tp__panel {
		@apply flex flex-col rounded-2xl overflow-hidden;
		background: var(--md-surface-container-lowest);
		border: 1px solid color-mix(in srgb, var(--md-outline-variant) 50%, transparent);
	}
	.tp__panel-header {
		@apply h-11 px-4 flex items-center gap-2;
		background: var(--md-surface-container-low);
		border-bottom: 1px solid color-mix(in srgb, var(--md-outline-variant) 40%, transparent);
	}
	.tp__panel-icon {
		font-size: 1rem;
	}
	.tp__panel-icon--tertiary {
		color: var(--md-tertiary);
	}
	.tp__panel-icon--primary {
		color: var(--md-primary);
	}
	.tp__panel-label {
		@apply font-mono text-[0.6875rem] tracking-wide font-semibold flex-1;
		color: var(--md-on-surface-variant);
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
		@apply h-[calc(100vh-20rem)] overflow-auto p-5;
	}
	.tp__empty {
		@apply h-full flex flex-col items-center justify-center gap-2 text-sm;
		color: var(--md-on-surface-variant);
	}

	/* ── Error ── */
	.tp__error {
		@apply flex items-center gap-2 px-4 py-3 rounded-xl text-sm;
		color: var(--md-error);
		background: color-mix(in srgb, var(--md-error) 12%, transparent);
		border: 1px solid color-mix(in srgb, var(--md-error) 30%, transparent);
	}

	/* ── Article ── */
	.tp__article {
		@apply max-w-3xl mt-6 pt-6;
		border-top: 1px solid color-mix(in srgb, var(--md-outline-variant) 45%, transparent);
	}
	.tp__article :global(details) {
		@apply py-1;
	}
	.tp__article :global(summary) {
		@apply cursor-pointer;
	}

	/* ── Responsive ── */
	@media (width < 64rem) {
		.tp__editor {
			@apply h-[24rem];
		}
		.tp__tree {
			@apply h-[24rem];
		}
	}
</style>
