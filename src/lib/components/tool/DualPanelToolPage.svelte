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
	<div class="tool-page__toolbar">
		<div class="tool-page__title-group">
			<h1 class="tool-page__title">{title}</h1>
			<button class="btn btn-sm btn-soft btn-primary" onclick={() => editor.loadSample()}>
				{m.btn_sample_short()}
			</button>
			<LoadFileButton onLoad={(content) => editor.setInput(content)} />
		</div>
		{#if toolbarExtra}
			{@render toolbarExtra()}
		{/if}
		<button class="tool-page__btn tool-page__btn--primary btn btn-sm btn-primary" onclick={handleAction}>
			{actionLabel}
		</button>
		<button class="tool-page__btn tool-page__btn--ghost btn btn-sm btn-ghost" onclick={() => (showClearModal = true)}>
			{m.btn_clear()}
		</button>
	</div>

	{#if beforeGrid}
		{@render beforeGrid()}
	{/if}

	<div class="tool-page__grid">
		<div class="tool-page__panel">
			<div class="tool-page__label-row">
				<span class="tool-page__label">{inputLabel}</span>
			</div>
			<div class="tool-page__editor">
				<MonacoEditor bind:value={editor.input} placeholder={m.editor_placeholder()} />
			</div>
		</div>
		<div class="tool-page__panel">
			<div class="tool-page__label-row">
				<span class="tool-page__label">{outputLabel}</span>
				<CopyButton text={editor.output} />
			</div>
			<div class="tool-page__editor">
				<MonacoEditor value={editor.output || editor.error} readOnly language={outputLanguage} />
			</div>
		</div>
	</div>

	{#if editor.error}
		<div class="tool-page__error alert alert-error">
			<span>{editor.error}</span>
		</div>
	{/if}

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
	.tool-page__toolbar {
		@apply flex flex-wrap gap-2 items-center;
	}
	.tool-page__title-group {
		@apply flex items-center gap-2 flex-1;
	}
	.tool-page__title {
		@apply text-lg font-bold;
	}
	.tool-page__grid {
		@apply grid grid-cols-1 lg:grid-cols-2 gap-4;
	}
	.tool-page__panel {
		@apply space-y-1;
	}
	.tool-page__label {
		@apply text-sm font-medium;
	}
	.tool-page__label-row {
		@apply flex items-center gap-2 h-8;
	}
	.tool-page__label-row .tool-page__label {
		@apply flex-1;
	}
	.tool-page__editor {
		@apply h-100 border border-base-300 rounded-lg overflow-hidden;
	}
	.tool-page__article {
		@apply max-w-none mt-8;
	}
</style>
