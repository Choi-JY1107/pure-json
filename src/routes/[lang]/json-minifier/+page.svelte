<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import MonacoEditor from '$lib/components/editor/MonacoEditor.svelte';
	import CopyButton from '$lib/components/ui/CopyButton.svelte';
	import { getEditorStore } from '$lib/stores/editor.svelte';

	const editor = getEditorStore('json-minifier');
	import { minifyJson } from '$lib/utils/json-formatter';
	import * as m from '$lib/paraglide/messages.js';

	function handleMinify() {
		try {
			const result = minifyJson(editor.input);
			editor.setOutput(result);
		} catch (e) {
			editor.setError((e as Error).message);
		}
	}

	const savings = $derived.by(() => {
		if (!editor.input || !editor.output) return null;
		const original = new Blob([editor.input]).size;
		const minified = new Blob([editor.output]).size;
		const saved = original - minified;
		const percent = ((saved / original) * 100).toFixed(1);
		return { original, minified, saved, percent };
	});
</script>

<MetaTags
	title={m.minifier_title()}
	description={m.minifier_description()}
/>

<div class="tool-page">
	<div class="tool-page__toolbar">
		<h1 class="tool-page__title">{m.minifier_h1()}</h1>
		<button class="tool-page__btn tool-page__btn--primary btn btn-sm btn-primary" onclick={handleMinify}>{m.btn_minify()}</button>
		<button class="tool-page__btn tool-page__btn--ghost btn btn-sm btn-ghost" onclick={() => editor.loadSample()}>{m.btn_sample_short()}</button>
		<button class="tool-page__btn tool-page__btn--ghost btn btn-sm btn-ghost" onclick={() => editor.clear()}>{m.btn_clear()}</button>
	</div>

	{#if savings}
		{@const s = savings}
		<div class="tool-page__stats stats stats-horizontal">
			<div class="tool-page__stat stat">
				<div class="tool-page__stat-title stat-title">{m.stats_original()}</div>
				<div class="tool-page__stat-value stat-value">{s.original} B</div>
			</div>
			<div class="tool-page__stat stat">
				<div class="tool-page__stat-title stat-title">{m.stats_minified()}</div>
				<div class="tool-page__stat-value stat-value">{s.minified} B</div>
			</div>
			<div class="tool-page__stat stat">
				<div class="tool-page__stat-title stat-title">{m.stats_saved()}</div>
				<div class="tool-page__stat-value tool-page__stat-value--success stat-value">{s.percent}%</div>
			</div>
		</div>
	{/if}

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
		<h2>{m.minifier_h1()}</h2>
		<p>{m.minifier_intro()}</p>
		<details>
			<summary><strong>{m.minifier_faq_q1()}</strong></summary>
			<p>{m.minifier_faq_a1()}</p>
		</details>
		<details>
			<summary><strong>{m.minifier_faq_q2()}</strong></summary>
			<p>{m.minifier_faq_a2()}</p>
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
	.tool-page__stats {
		@apply shadow bg-base-200 w-full;
	}
	.tool-page__stat-value {
		@apply text-lg;
	}
	.tool-page__stat-value--success {
		@apply text-success;
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
