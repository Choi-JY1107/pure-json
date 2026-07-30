<script lang="ts">
	import ToolPage from '$lib/components/tool/ToolPage.svelte';
	import { getEditorStore } from '$lib/stores/editor';
	import { csvToJson } from '$lib/utils/csv-to-json';
	import * as m from '$lib/paraglide/messages.js';

	const editor = getEditorStore('csv-to-json');
</script>

<ToolPage
	mode="dual"
	{editor}
	transform={csvToJson}
	metaTitle={m.csv_to_json_title()}
	metaDescription={m.csv_to_json_description()}
	title={m.csv_to_json_h1()}
	actionLabel={m.btn_convert()}
	inputLabel={m.csv_input_label()}
	outputLabel={m.json_output_label()}
	outputLanguage="json"
	intro={m.csv_to_json_intro()}
	body={[m.csv_to_json_body1(), m.csv_to_json_body2()]}
	deep={{
		title: m.csv_to_json_deep_title(),
		paragraphs: [
			m.csv_to_json_deep_p1(),
			m.csv_to_json_deep_p2(),
			m.csv_to_json_deep_p3()
		]
	}}
	reference={{
		title: m.csv_to_json_ref_title(),
		intro: m.csv_to_json_ref_intro(),
		headers: [m.csv_to_json_ref_h1(), m.csv_to_json_ref_h2(), m.table_note()],
		rows: [
			['"Ada, A."', '"Ada, A."', m.csv_to_json_ref_n1()],
			['"said ""hi"""', '"said \\"hi\\""', m.csv_to_json_ref_n2()],
			['"line1<LF>line2"', '"line1\\nline2"', m.csv_to_json_ref_n3()],
			['07030', '"07030"', m.csv_to_json_ref_n4()],
			['1E5', '"1E5"', m.csv_to_json_ref_n5()],
			['a,b,c / 1,2', '{"a":"1","b":"2","c":""}', m.csv_to_json_ref_n6()],
			['x,y\\r\\n1,2\\r\\n', '{"x":"1","y":"2"}', m.csv_to_json_ref_n7()]
		]
	}}
	examples={{
		title: m.csv_to_json_ex_title(),
		intro: m.csv_to_json_ex_intro(),
		input: `name,zip,note
"Ada, A.",07030,"said ""hi"""
Alan,02101,`,
		output: `[
  {
    "name": "Ada, A.",
    "zip": "07030",
    "note": "said \\"hi\\""
  },
  {
    "name": "Alan",
    "zip": "02101",
    "note": ""
  }
]`,
		note: m.csv_to_json_ex_note()
	}}
	pitfalls={{
		title: m.csv_to_json_pit_title(),
		items: [
			{
				title: m.csv_to_json_pit1_t(),
				desc: m.csv_to_json_pit1_d(),
				code: '"9" + "1"   ->  "91"\nNumber("9") + Number("1")  ->  10'
			},
			{ title: m.csv_to_json_pit2_t(), desc: m.csv_to_json_pit2_d() },
			{ title: m.csv_to_json_pit3_t(), desc: m.csv_to_json_pit3_d() }
		]
	}}
	howto={[
		{ step: m.csv_to_json_howto_s1(), desc: m.csv_to_json_howto_s1_desc() },
		{ step: m.csv_to_json_howto_s2(), desc: m.csv_to_json_howto_s2_desc() },
		{ step: m.csv_to_json_howto_s3(), desc: m.csv_to_json_howto_s3_desc() }
	]}
	features={[m.csv_to_json_feature1(), m.csv_to_json_feature2(), m.csv_to_json_feature3(), m.csv_to_json_feature4()]}
	usecases={[m.csv_to_json_usecase1(), m.csv_to_json_usecase2(), m.csv_to_json_usecase3()]}
	faqs={[
		{ question: m.csv_to_json_faq_q1(), answer: m.csv_to_json_faq_a1() },
		{ question: m.csv_to_json_faq_q2(), answer: m.csv_to_json_faq_a2() },
		{ question: m.csv_to_json_faq_q3(), answer: m.csv_to_json_faq_a3() },
		{ question: m.csv_to_json_faq_q4(), answer: m.csv_to_json_faq_a4() },
		{ question: m.csv_to_json_faq_q5(), answer: m.csv_to_json_faq_a5() },
		{ question: m.csv_to_json_faq_q6(), answer: m.csv_to_json_faq_a6() },
		{ question: m.csv_to_json_faq_q7(), answer: m.csv_to_json_faq_a7() }
	]}
/>
