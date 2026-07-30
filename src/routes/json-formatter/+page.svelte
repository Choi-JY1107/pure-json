<script lang="ts">
	import ToolPage from '$lib/components/tool/ToolPage.svelte';
	import { getEditorStore } from '$lib/stores/editor';
	import { formatJson } from '$lib/utils/json-formatter';
	import * as m from '$lib/paraglide/messages.js';

	const editor = getEditorStore('json-formatter');
	// A number means "that many spaces"; '\t' is required for real tab indentation.
	let indent = $state<number | string>(2);
</script>

<ToolPage
	mode="dual"
	{editor}
	transform={(input) => formatJson(input, indent)}
	metaTitle={m.formatter_title()}
	metaDescription={m.formatter_description()}
	title={m.formatter_h1()}
	actionLabel={m.btn_format()}
	inputLabel={m.input_label()}
	outputLabel={m.output_label()}
	intro={m.formatter_intro()}
	body={[m.formatter_body1(), m.formatter_body2()]}
	deep={{
		title: m.formatter_deep_title(),
		paragraphs: [m.formatter_deep_p1(), m.formatter_deep_p2(), m.formatter_deep_p3()]
	}}
	reference={{
		title: m.formatter_ref_title(),
		intro: m.formatter_ref_intro(),
		headers: [m.formatter_ref_h1(), m.formatter_ref_h2(), m.table_note()],
		rows: [
			['1.0', '1', m.formatter_ref_n1()],
			['1e3', '1000', m.formatter_ref_n2()],
			['0.10', '0.1', m.formatter_ref_n3()],
			['{"a":1,"a":2}', '{"a":2}', m.formatter_ref_n4()],
			['{"10":1,"2":1,"b":1}', '{"2":1,"10":1,"b":1}', m.formatter_ref_n5()],
			['12345678901234567890', '12345678901234567000', m.formatter_ref_n6()]
		]
	}}
	examples={{
		title: m.formatter_ex_title(),
		intro: m.formatter_ex_intro(),
		input: '{"id":42,"user":{"name":"Ada","tags":["admin","dev"]},"active":true}',
		output: `{
  "id": 42,
  "user": {
    "name": "Ada",
    "tags": [
      "admin",
      "dev"
    ]
  },
  "active": true
}`,
		note: m.formatter_ex_note()
	}}
	pitfalls={{
		title: m.formatter_pit_title(),
		items: [
			{ title: m.formatter_pit1_t(), desc: m.formatter_pit1_d() },
			{
				title: m.formatter_pit2_t(),
				desc: m.formatter_pit2_d(),
				code: '{\n  // not valid JSON\n  "a": 1,\n}'
			},
			{ title: m.formatter_pit3_t(), desc: m.formatter_pit3_d() }
		]
	}}
	howto={[
		{ step: m.formatter_howto_s1(), desc: m.formatter_howto_s1_desc() },
		{ step: m.formatter_howto_s2(), desc: m.formatter_howto_s2_desc() },
		{ step: m.formatter_howto_s3(), desc: m.formatter_howto_s3_desc() }
	]}
	features={[m.formatter_feature1(), m.formatter_feature2(), m.formatter_feature3(), m.formatter_feature4()]}
	usecases={[m.formatter_usecase1(), m.formatter_usecase2(), m.formatter_usecase3()]}
	faqs={[
		{ question: m.formatter_faq_q1(), answer: m.formatter_faq_a1() },
		{ question: m.formatter_faq_q2(), answer: m.formatter_faq_a2() },
		{ question: m.formatter_faq_q3(), answer: m.formatter_faq_a3() },
		{ question: m.formatter_faq_q4(), answer: m.formatter_faq_a4() },
		{ question: m.formatter_faq_q5(), answer: m.formatter_faq_a5() },
		{ question: m.formatter_faq_q6(), answer: m.formatter_faq_a6() },
		{ question: m.formatter_faq_q7(), answer: m.formatter_faq_a7() }
	]}
>
	{#snippet toolbarExtra()}
		<div class="indent-toggle">
			<button class="indent-toggle__btn" class:indent-toggle__btn--active={indent === 2} onclick={() => (indent = 2)}>2 Space</button>
			<button class="indent-toggle__btn" class:indent-toggle__btn--active={indent === 4} onclick={() => (indent = 4)}>4 Space</button>
			<button class="indent-toggle__btn" class:indent-toggle__btn--active={indent === '\t'} onclick={() => (indent = '\t')}>Tab</button>
		</div>
	{/snippet}
</ToolPage>

<style>
	@reference "../../app.css";

	:global(.indent-toggle) {
		@apply flex bg-surface-container-low rounded-lg p-1;
	}
	:global(.indent-toggle__btn) {
		@apply px-3 py-1 rounded
		       text-[0.625rem] font-bold uppercase tracking-wider
		       text-secondary cursor-pointer transition-colors;
	}
	:global(.indent-toggle__btn--active) {
		@apply bg-primary text-on-primary;
	}
</style>
