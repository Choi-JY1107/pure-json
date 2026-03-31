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
	howto={[
		{ step: m.minifier_howto_s1(), desc: m.minifier_howto_s1_desc() },
		{ step: m.minifier_howto_s2(), desc: m.minifier_howto_s2_desc() },
		{ step: m.minifier_howto_s3(), desc: m.minifier_howto_s3_desc() }
	]}
	features={[m.minifier_feature1(), m.minifier_feature2(), m.minifier_feature3(), m.minifier_feature4()]}
	usecases={[m.minifier_usecase1(), m.minifier_usecase2(), m.minifier_usecase3()]}
	faqs={[
		{ question: m.minifier_faq_q1(), answer: m.minifier_faq_a1() },
		{ question: m.minifier_faq_q2(), answer: m.minifier_faq_a2() },
		{ question: m.minifier_faq_q3(), answer: m.minifier_faq_a3() },
		{ question: m.minifier_faq_q4(), answer: m.minifier_faq_a4() },
		{ question: m.minifier_faq_q5(), answer: m.minifier_faq_a5() }
	]}
>
	{#snippet beforeGrid()}
		{#if savings}
			{@const s = savings}
			<div class="tool-page__stats flex flex-row">
				<div class="tool-page__stat flex flex-col gap-1 p-4">
					<div class="tool-page__stat-title text-xs text-secondary">{m.stats_original()}</div>
					<div class="tool-page__stat-value text-2xl font-bold">{s.original} B</div>
				</div>
				<div class="tool-page__stat flex flex-col gap-1 p-4">
					<div class="tool-page__stat-title text-xs text-secondary">{m.stats_minified()}</div>
					<div class="tool-page__stat-value text-2xl font-bold">{s.minified} B</div>
				</div>
				<div class="tool-page__stat flex flex-col gap-1 p-4">
					<div class="tool-page__stat-title text-xs text-secondary">{m.stats_saved()}</div>
					<div class="tool-page__stat-value text-2xl font-bold tool-page__stat-value--success">{s.percent}%</div>
				</div>
			</div>
		{/if}
	{/snippet}
</DualPanelToolPage>

<style>
	@reference "../../app.css";

	.tool-page__stats {
		@apply shadow bg-surface-container-low w-full;
	}
	.tool-page__stat-value {
		@apply text-lg;
	}
	.tool-page__stat-value--success {
		@apply text-tertiary;
	}
</style>
