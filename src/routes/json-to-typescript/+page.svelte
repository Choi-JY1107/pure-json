<script lang="ts">
	import ToolPage from '$lib/components/tool/ToolPage.svelte';
	import { getEditorStore } from '$lib/stores/editor';
	import { jsonToTypescript } from '$lib/utils/json-to-ts';
	import * as m from '$lib/paraglide/messages.js';

	const editor = getEditorStore('json-to-typescript');
</script>

<ToolPage
	mode="dual"
	{editor}
	transform={jsonToTypescript}
	metaTitle={m.to_typescript_title()}
	metaDescription={m.to_typescript_description()}
	title={m.to_typescript_h1()}
	actionLabel={m.btn_convert()}
	outputLabel={m.typescript_output_label()}
	outputLanguage="typescript"
	intro={m.to_typescript_intro()}
	body={[m.to_typescript_body1(), m.to_typescript_body2()]}
	deep={{
		title: m.to_typescript_deep_title(),
		paragraphs: [
			m.to_typescript_deep_p1(),
			m.to_typescript_deep_p2(),
			m.to_typescript_deep_p3()
		]
	}}
	reference={{
		title: m.to_typescript_ref_title(),
		intro: m.to_typescript_ref_intro(),
		headers: [m.to_typescript_ref_h1(), m.to_typescript_ref_h2(), m.table_note()],
		rows: [
			['42', 'number', m.to_typescript_ref_n1()],
			['true', 'boolean', m.to_typescript_ref_n2()],
			['{"meta":{"city":"Seoul"}}', 'meta: Meta', m.to_typescript_ref_n3()],
			['[1, "a"]', '(number | string)[]', m.to_typescript_ref_n4()],
			['null', 'null', m.to_typescript_ref_n5()],
			['[]', 'any[]', m.to_typescript_ref_n6()],
			['[{"a":1},{"a":1,"b":2}]', 'b?: number', m.to_typescript_ref_n7()]
		]
	}}
	examples={{
		title: m.to_typescript_ex_title(),
		intro: m.to_typescript_ex_intro(),
		input: `[
  { "id": 1, "name": "Ada", "nickname": "ada",
    "tags": ["admin"], "meta": { "city": "Seoul" },
    "deleted": null, "extras": [] },
  { "id": 2, "name": "Alan",
    "tags": ["dev", "ops"], "meta": { "city": "Busan" },
    "deleted": null, "extras": [] }
]`,
		output: `interface RootObject {
  id: number;
  name: string;
  nickname?: string;
  tags: string[];
  meta: Meta;
  deleted: null;
  extras: any[];
}

interface Meta {
  city: string;
}`,
		note: m.to_typescript_ex_note()
	}}
	pitfalls={{
		title: m.to_typescript_pit_title(),
		items: [
			{
				title: m.to_typescript_pit1_t(),
				desc: m.to_typescript_pit1_d(),
				code: '{"a":1}          ->  a: number\n[{"a":1},{}]     ->  a?: number'
			},
			{ title: m.to_typescript_pit2_t(), desc: m.to_typescript_pit2_d() },
			{ title: m.to_typescript_pit3_t(), desc: m.to_typescript_pit3_d() }
		]
	}}
	howto={[
		{ step: m.to_typescript_howto_s1(), desc: m.to_typescript_howto_s1_desc() },
		{ step: m.to_typescript_howto_s2(), desc: m.to_typescript_howto_s2_desc() },
		{ step: m.to_typescript_howto_s3(), desc: m.to_typescript_howto_s3_desc() }
	]}
	features={[m.to_typescript_feature1(), m.to_typescript_feature2(), m.to_typescript_feature3(), m.to_typescript_feature4()]}
	usecases={[m.to_typescript_usecase1(), m.to_typescript_usecase2(), m.to_typescript_usecase3()]}
	faqs={[
		{ question: m.to_typescript_faq_q1(), answer: m.to_typescript_faq_a1() },
		{ question: m.to_typescript_faq_q2(), answer: m.to_typescript_faq_a2() },
		{ question: m.to_typescript_faq_q3(), answer: m.to_typescript_faq_a3() },
		{ question: m.to_typescript_faq_q4(), answer: m.to_typescript_faq_a4() },
		{ question: m.to_typescript_faq_q5(), answer: m.to_typescript_faq_a5() },
		{ question: m.to_typescript_faq_q6(), answer: m.to_typescript_faq_a6() },
		{ question: m.to_typescript_faq_q7(), answer: m.to_typescript_faq_a7() }
	]}
/>
