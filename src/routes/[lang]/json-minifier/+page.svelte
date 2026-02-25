<script lang="ts">
	import DualPanelToolPage from '$lib/components/tool/DualPanelToolPage.svelte';
	import { getEditorStore } from '$lib/stores/editor';
	import { minifyJson } from '$lib/utils/json-formatter';
	import * as m from '$lib/paraglide/messages.js';

	const editor = getEditorStore('json-minifier');

	const savings = $derived.by(() => {
		if (!editor.input || !editor.output) return null;
		const original = new Blob([editor.input]).size;
		const minified = new Blob([editor.output]).size;
		const saved = original - minified;
		const percent = ((saved / original) * 100).toFixed(1);
		return { original, minified, saved, percent };
	});
</script>

<DualPanelToolPage
	{editor}
	transform={minifyJson}
	metaTitle={m.minifier_title()}
	metaDescription={m.minifier_description()}
	title={m.minifier_h1()}
	actionLabel={m.btn_minify()}
	inputLabel={m.input_label()}
	outputLabel={m.output_label()}
	intro={m.minifier_intro()}
	faqs={[
		{ question: m.minifier_faq_q1(), answer: m.minifier_faq_a1() },
		{ question: m.minifier_faq_q2(), answer: m.minifier_faq_a2() }
	]}
>
	{#snippet beforeGrid()}
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
					<div class="tool-page__stat-value stat-value tool-page__stat-value--success">{s.percent}%</div>
				</div>
			</div>
		{/if}
	{/snippet}
</DualPanelToolPage>

<style>
	@reference "../../../app.css";

	.tool-page__stats {
		@apply shadow bg-base-200 w-full;
	}
	.tool-page__stat-value {
		@apply text-lg;
	}
	.tool-page__stat-value--success {
		@apply text-success;
	}
</style>
