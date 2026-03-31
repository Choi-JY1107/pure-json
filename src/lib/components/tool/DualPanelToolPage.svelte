<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import MonacoEditor from '$lib/components/editor/MonacoEditor.svelte';
	import CopyButton from '$lib/components/ui/CopyButton.svelte';
	import ConfirmModal from '$lib/components/ui/ConfirmModal.svelte';
	import LoadFileButton from '$lib/components/ui/LoadFileButton.svelte';
	import type { EditorStore } from '$lib/stores/editor';
	import * as m from '$lib/paraglide/messages.js';
	import type { Snippet } from 'svelte';

	let {
		editor,
		transform,
		metaTitle,
		metaDescription,
		title,
		actionLabel,
		inputLabel = m.json_input_label(),
		outputLabel = m.output_label(),
		outputLanguage = 'json',
		intro,
		howto,
		features,
		usecases,
		faqs,
		toolbarExtra,
		beforeGrid
	}: {
		editor: EditorStore;
		transform: (input: string) => string;
		metaTitle: string;
		metaDescription: string;
		title: string;
		actionLabel: string;
		inputLabel?: string;
		outputLabel?: string;
		outputLanguage?: string;
		intro: string;
		howto?: Array<{ step: string; desc: string }>;
		features?: string[];
		usecases?: string[];
		faqs: Array<{ question: string; answer: string }>;
		toolbarExtra?: Snippet;
		beforeGrid?: Snippet;
	} = $props();

	let showClearModal = $state(false);

	function handleAction() {
		try {
			editor.setOutput(transform(editor.input));
		} catch (e) {
			editor.setError((e as Error).message);
		}
	}
</script>

<MetaTags title={metaTitle} description={metaDescription} />

<div class="tool-page">
	<!-- Toolbar -->
	<div class="tool-page__toolbar">
		<div class="tool-page__title-group">
			<h1 class="tool-page__title">{title}</h1>
		</div>

		<div class="tool-page__actions">
			<button class="tool-page__btn tool-page__btn--soft" onclick={() => editor.loadSample()}>
				<span class="material-symbols-outlined tool-page__btn-icon">edit_note</span>
				{m.btn_sample_short()}
			</button>
			<LoadFileButton onLoad={(content) => editor.setInput(content)} />

			{#if toolbarExtra}
				<div class="tool-page__divider"></div>
				{@render toolbarExtra()}
			{/if}

			<div class="tool-page__divider"></div>

			<button class="tool-page__btn tool-page__btn--primary" onclick={handleAction}>
				<span class="material-symbols-outlined tool-page__btn-icon" style="font-variation-settings: 'FILL' 1;">bolt</span>
				{actionLabel}
			</button>
			<button class="tool-page__btn tool-page__btn--ghost" onclick={() => (showClearModal = true)}>
				<span class="material-symbols-outlined tool-page__btn-icon">delete_outline</span>
				{m.btn_clear()}
			</button>
		</div>
	</div>

	{#if beforeGrid}
		{@render beforeGrid()}
	{/if}

	<!-- Editor Grid -->
	<div class="tool-page__grid">
		<!-- Input Panel -->
		<div class="tool-page__panel">
			<div class="tool-page__panel-header">
				<span class="material-symbols-outlined tool-page__panel-icon">data_object</span>
				<span class="tool-page__panel-label">{inputLabel}</span>
			</div>
			<div class="tool-page__editor">
				<MonacoEditor bind:value={editor.input} placeholder={m.editor_placeholder()} />
			</div>
		</div>

		<!-- Output Panel -->
		<div class="tool-page__panel">
			<div class="tool-page__panel-header">
				<span class="material-symbols-outlined tool-page__panel-icon">task_alt</span>
				<span class="tool-page__panel-label">{outputLabel}</span>
				<div class="tool-page__panel-actions">
					<CopyButton text={editor.output} />
				</div>
			</div>
			<div class="tool-page__editor">
				<MonacoEditor value={editor.output || editor.error} readOnly language={outputLanguage} />
			</div>
		</div>
	</div>

	<!-- Error -->
	{#if editor.error}
		<div class="tool-page__error">
			<span class="material-symbols-outlined" style="font-size: 1rem;">error</span>
			<span>{editor.error}</span>
		</div>
	{/if}

	<!-- Article -->
	<article class="tool-page__article prose prose-sm">
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
	onConfirm={() => editor.clear()}
/>

<style>
	@reference "../../../app.css";

	.tool-page {
		@apply max-w-7xl mx-auto space-y-4;
	}

	/* ── Toolbar ── */
	.tool-page__toolbar {
		@apply flex flex-wrap items-center justify-between gap-3
		       px-4 py-3 rounded-xl
		       bg-surface-container-low border border-outline-variant/10;
	}
	.tool-page__title-group {
		@apply flex items-center gap-3;
	}
	.tool-page__title {
		@apply text-base font-headline font-bold tracking-tight;
	}
	.tool-page__actions {
		@apply flex items-center gap-2 flex-wrap;
	}
	.tool-page__divider {
		@apply h-6 border-l border-outline-variant/20;
	}

	/* ── Buttons ── */
	.tool-page__btn {
		@apply inline-flex items-center gap-1.5 px-3 py-1.5
		       text-[0.6875rem] font-semibold uppercase tracking-wider
		       rounded-lg transition-all duration-200 cursor-pointer;
	}
	.tool-page__btn-icon {
		font-size: 1rem;
	}
	.tool-page__btn--primary {
		@apply bg-linear-to-br from-primary to-primary-container
		       text-on-primary shadow-lg shadow-primary-container/20
		       active:scale-95;
	}
	.tool-page__btn--soft {
		@apply bg-surface-container-high text-on-surface
		       hover:bg-surface-container-highest;
	}
	.tool-page__btn--ghost {
		@apply bg-transparent text-secondary hover:text-on-surface
		       hover:bg-surface-container;
	}

	/* ── Editor Grid ── */
	.tool-page__grid {
		@apply grid grid-cols-1 lg:grid-cols-2 gap-4;
	}
	.tool-page__panel {
		@apply flex flex-col rounded-xl overflow-hidden
		       border border-outline-variant/10 shadow-lg;
	}
	.tool-page__panel-header {
		@apply h-10 px-4 flex items-center gap-2
		       bg-surface-container-low border-b border-outline-variant/5;
	}
	.tool-page__panel-icon {
		font-size: 0.875rem;
		color: var(--md-tertiary);
	}
	.tool-page__panel-label {
		@apply text-[0.625rem] uppercase tracking-widest font-bold text-secondary flex-1;
	}
	.tool-page__panel-actions {
		@apply flex items-center gap-1;
	}
	.tool-page__editor {
		@apply h-100;
	}

	/* ── Error ── */
	.tool-page__error {
		@apply flex items-center gap-2 px-4 py-3
		       rounded-lg bg-error-container/20 text-error
		       border border-error/20 text-sm;
	}

	/* ── Article ── */
	.tool-page__article {
		@apply max-w-none mt-8;
	}
</style>
