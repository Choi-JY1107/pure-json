<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import MonacoEditor from '$lib/components/editor/MonacoEditor.svelte';
	import CopyButton from '$lib/components/ui/CopyButton.svelte';
	import { getEditorStore } from '$lib/stores/editor.svelte';

	const editor = getEditorStore('json-formatter');
	import { formatJson } from '$lib/utils/json-formatter';
	import * as m from '$lib/paraglide/messages.js';

	let indent = $state(2);

	function handleFormat() {
		try {
			editor.setOutput(formatJson(editor.input, indent));
		} catch (e) {
			editor.setError((e as Error).message);
		}
	}
</script>

<MetaTags
	title={m.formatter_title()}
	description={m.formatter_description()}
/>

<div class="tool-page">
	<div class="tool-page__toolbar">
		<h1 class="tool-page__title">{m.formatter_h1()}</h1>
		<select class="tool-page__select select select-sm select-bordered" bind:value={indent}>
			<option value={2}>{m.indent_2_spaces()}</option>
			<option value={4}>{m.indent_4_spaces()}</option>
			<option value={1}>{m.indent_1_tab()}</option>
		</select>
		<button class="tool-page__btn tool-page__btn--primary btn btn-sm btn-primary" onclick={handleFormat}>{m.btn_format()}</button>
		<button class="tool-page__btn tool-page__btn--ghost btn btn-sm btn-ghost" onclick={() => editor.loadSample()}>{m.btn_sample_short()}</button>
		<button class="tool-page__btn tool-page__btn--ghost btn btn-sm btn-ghost" onclick={() => editor.clear()}>{m.btn_clear()}</button>
	</div>

	<div class="tool-page__grid">
		<div class="tool-page__panel">
			<div class="tool-page__label-row">
				<span class="tool-page__label">{m.input_label()}</span>
			</div>
			<div class="tool-page__editor">
				<MonacoEditor bind:value={editor.input} placeholder={m.editor_placeholder()} />
			</div>
		</div>
		<div class="tool-page__panel">
			<div class="tool-page__label-row">
				<span class="tool-page__label">{m.output_label()}</span>
				<CopyButton text={editor.output} />
			</div>
			<div class="tool-page__editor">
				<MonacoEditor value={editor.output || editor.error} readOnly />
			</div>
		</div>
	</div>

	{#if editor.error}
		<div class="tool-page__error alert alert-error">
			<span>{editor.error}</span>
		</div>
	{/if}

	<article class="tool-page__article prose prose-sm">
		<h2>{m.formatter_h1()}</h2>
		<p>{m.formatter_intro()}</p>
		<details>
			<summary><strong>{m.formatter_faq_q1()}</strong></summary>
			<p>{m.formatter_faq_a1()}</p>
		</details>
		<details>
			<summary><strong>{m.formatter_faq_q2()}</strong></summary>
			<p>{m.formatter_faq_a2()}</p>
		</details>
	</article>
</div>

<style>
	@reference "../../../app.css";

	.tool-page {
		@apply max-w-7xl mx-auto space-y-4;
	}
	.tool-page__toolbar {
		@apply flex flex-wrap gap-2 items-center;
	}
	.tool-page__title {
		@apply text-lg font-bold flex-1;
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
		@apply flex items-center gap-2 min-h-8;
	}
	.tool-page__label-row .tool-page__label {
		@apply flex-1;
	}
	.tool-page__editor {
		@apply h-[400px] border border-base-300 rounded-lg overflow-hidden;
	}
	.tool-page__article {
		@apply max-w-none mt-8;
	}
</style>
