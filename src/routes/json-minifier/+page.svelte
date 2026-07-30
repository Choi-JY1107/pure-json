<script lang="ts">
	import ToolPage from '$lib/components/tool/ToolPage.svelte';
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

<ToolPage
	mode="dual"
	{editor}
	transform={minifyJson}
	metaTitle={m.minifier_title()}
	metaDescription={m.minifier_description()}
	title={m.minifier_h1()}
	actionLabel={m.btn_minify()}
	inputLabel={m.input_label()}
	outputLabel={m.output_label()}
	intro={m.minifier_intro()}
	body={[m.minifier_body1(), m.minifier_body2()]}
	deep={{
		title: m.minifier_deep_title(),
		paragraphs: [m.minifier_deep_p1(), m.minifier_deep_p2(), m.minifier_deep_p3()]
	}}
	reference={{
		title: m.minifier_ref_title(),
		intro: m.minifier_ref_intro(),
		headers: [m.minifier_ref_h1(), m.minifier_ref_h2(), m.table_note()],
		rows: [
			['JSON.stringify(v, null, 2)', '10,562 B', m.minifier_ref_n1()],
			['JSON.stringify(v)', '6,154 B', m.minifier_ref_n2()],
			['gzip(pretty)', '668 B', m.minifier_ref_n3()],
			['gzip(minified)', '599 B', m.minifier_ref_n4()]
		]
	}}
	examples={{
		title: m.minifier_ex_title(),
		intro: m.minifier_ex_intro(),
		input: `{
  "city": "New York",
  "coords": [
    40.71,
    -74.01
  ]
}`,
		output: '{"city":"New York","coords":[40.71,-74.01]}',
		note: m.minifier_ex_note()
	}}
	pitfalls={{
		title: m.minifier_pit_title(),
		items: [
			{ title: m.minifier_pit1_t(), desc: m.minifier_pit1_d() },
			{
				title: m.minifier_pit2_t(),
				desc: m.minifier_pit2_d(),
				code: '{"note":"line1\\nline2"}'
			},
			{ title: m.minifier_pit3_t(), desc: m.minifier_pit3_d() }
		]
	}}
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
		{ question: m.minifier_faq_q5(), answer: m.minifier_faq_a5() },
		{ question: m.minifier_faq_q6(), answer: m.minifier_faq_a6() },
		{ question: m.minifier_faq_q7(), answer: m.minifier_faq_a7() }
	]}
>
	{#snippet beforePanels()}
		{#if savings}
			{@const s = savings}
			<div class="bento">
				<div class="bento__card">
					<div class="bento__header">
						<span class="bento__label">{m.stats_original()}</span>
						<div class="bento__icon-box bento__icon-box--tertiary">
							<span class="material-symbols-outlined" style="font-size: 1rem;">data_usage</span>
						</div>
					</div>
					<div class="bento__value">{s.original} <span class="bento__unit">B</span></div>
				</div>
				<div class="bento__card">
					<div class="bento__header">
						<span class="bento__label">{m.stats_minified()}</span>
						<div class="bento__icon-box bento__icon-box--primary">
							<span class="material-symbols-outlined" style="font-size: 1rem;">speed</span>
						</div>
					</div>
					<div class="bento__value">{s.minified} <span class="bento__unit">B</span></div>
				</div>
				<div class="bento__card">
					<div class="bento__header">
						<span class="bento__label">{m.stats_saved()}</span>
						<div class="bento__icon-box bento__icon-box--tertiary">
							<span class="material-symbols-outlined" style="font-size: 1rem;">trending_up</span>
						</div>
					</div>
					<div class="bento__value bento__value--tertiary">{s.percent}<span class="bento__unit">%</span></div>
				</div>
			</div>
		{/if}
	{/snippet}
</ToolPage>

<style>
	@reference "../../app.css";

	:global(.bento) {
		@apply grid grid-cols-1 md:grid-cols-3 gap-4;
	}
	:global(.bento__card) {
		@apply p-5 rounded-xl border border-outline-variant/15
		       flex flex-col justify-between;
		background: color-mix(in srgb, var(--md-surface-container-highest) 80%, transparent);
		backdrop-filter: blur(20px);
	}
	:global(.bento__header) {
		@apply flex justify-between items-start;
	}
	:global(.bento__label) {
		@apply text-[0.65rem] uppercase tracking-widest text-secondary font-bold;
	}
	:global(.bento__icon-box) {
		@apply w-8 h-8 rounded-lg flex items-center justify-center;
	}
	:global(.bento__icon-box--tertiary) {
		@apply bg-tertiary/10 text-tertiary;
	}
	:global(.bento__icon-box--primary) {
		@apply bg-primary/10 text-primary;
	}
	:global(.bento__value) {
		@apply text-3xl font-headline font-bold text-on-surface mt-3;
	}
	:global(.bento__value--tertiary) {
		@apply text-tertiary;
	}
	:global(.bento__unit) {
		@apply text-lg text-secondary;
	}
</style>
