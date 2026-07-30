<script lang="ts">
	import ToolPage from '$lib/components/tool/ToolPage.svelte';
	import { getEditorStore } from '$lib/stores/editor';
	import { jsonToCsv } from '$lib/utils/json-to-csv';
	import * as m from '$lib/paraglide/messages.js';

	const editor = getEditorStore('json-to-csv');
</script>

<ToolPage
	mode="dual"
	{editor}
	transform={jsonToCsv}
	metaTitle={m.to_csv_title()}
	metaDescription={m.to_csv_description()}
	title={m.to_csv_h1()}
	actionLabel={m.btn_convert()}
	outputLabel={m.csv_output_label()}
	outputLanguage="plaintext"
	intro={m.to_csv_intro()}
	body={[m.to_csv_body1(), m.to_csv_body2()]}
	deep={{
		title: m.to_csv_deep_title(),
		paragraphs: [m.to_csv_deep_p1(), m.to_csv_deep_p2(), m.to_csv_deep_p3()]
	}}
	reference={{
		title: m.to_csv_ref_title(),
		intro: m.to_csv_ref_intro(),
		headers: [m.to_csv_ref_h1(), m.to_csv_ref_h2(), m.table_note()],
		rows: [
			['"Alan"', 'Alan', m.to_csv_ref_n1()],
			['"Ada, A."', '"Ada, A."', m.to_csv_ref_n2()],
			['"said \\"hi\\""', '"said ""hi"""', m.to_csv_ref_n3()],
			['{"city":"Seoul"}', '"{""city"":""Seoul""}"', m.to_csv_ref_n4()],
			['["x","y"]', '"[""x"",""y""]"', m.to_csv_ref_n5()],
			['null', '(empty)', m.to_csv_ref_n6()],
			['true / 9.5', 'true / 9.5', m.to_csv_ref_n7()]
		]
	}}
	examples={{
		title: m.to_csv_ex_title(),
		intro: m.to_csv_ex_intro(),
		input: `[
  { "id": 1, "name": "Ada, A.", "note": "said \\"hi\\"",
    "meta": { "city": "Seoul" }, "score": 9.5 },
  { "id": 2, "name": "Alan", "tags": ["x", "y"], "score": null }
]`,
		output: `id,name,note,meta,score,tags
1,"Ada, A.","said ""hi""","{""city"":""Seoul""}",9.5,
2,Alan,,,,"[""x"",""y""]"`,
		note: m.to_csv_ex_note()
	}}
	pitfalls={{
		title: m.to_csv_pit_title(),
		items: [
			{ title: m.to_csv_pit1_t(), desc: m.to_csv_pit1_d() },
			{ title: m.to_csv_pit2_t(), desc: m.to_csv_pit2_d() },
			{ title: m.to_csv_pit3_t(), desc: m.to_csv_pit3_d() }
		]
	}}
	howto={[
		{ step: m.to_csv_howto_s1(), desc: m.to_csv_howto_s1_desc() },
		{ step: m.to_csv_howto_s2(), desc: m.to_csv_howto_s2_desc() },
		{ step: m.to_csv_howto_s3(), desc: m.to_csv_howto_s3_desc() }
	]}
	features={[m.to_csv_feature1(), m.to_csv_feature2(), m.to_csv_feature3(), m.to_csv_feature4()]}
	usecases={[m.to_csv_usecase1(), m.to_csv_usecase2(), m.to_csv_usecase3()]}
	faqs={[
		{ question: m.to_csv_faq_q1(), answer: m.to_csv_faq_a1() },
		{ question: m.to_csv_faq_q2(), answer: m.to_csv_faq_a2() },
		{ question: m.to_csv_faq_q3(), answer: m.to_csv_faq_a3() },
		{ question: m.to_csv_faq_q4(), answer: m.to_csv_faq_a4() },
		{ question: m.to_csv_faq_q5(), answer: m.to_csv_faq_a5() },
		{ question: m.to_csv_faq_q6(), answer: m.to_csv_faq_a6() },
		{ question: m.to_csv_faq_q7(), answer: m.to_csv_faq_a7() }
	]}
/>
