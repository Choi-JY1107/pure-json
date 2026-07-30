<script lang="ts">
	import ToolPage from '$lib/components/tool/ToolPage.svelte';
	import { getEditorStore } from '$lib/stores/editor';
	import { jsonToXml } from '$lib/utils/json-to-xml';
	import * as m from '$lib/paraglide/messages.js';

	const editor = getEditorStore('json-to-xml');
</script>

<ToolPage
	mode="dual"
	{editor}
	transform={jsonToXml}
	metaTitle={m.to_xml_title()}
	metaDescription={m.to_xml_description()}
	title={m.to_xml_h1()}
	actionLabel={m.btn_convert()}
	outputLabel={m.xml_output_label()}
	outputLanguage="xml"
	intro={m.to_xml_intro()}
	body={[m.to_xml_body1(), m.to_xml_body2()]}
	deep={{
		title: m.to_xml_deep_title(),
		paragraphs: [m.to_xml_deep_p1(), m.to_xml_deep_p2(), m.to_xml_deep_p3()]
	}}
	reference={{
		title: m.to_xml_ref_title(),
		intro: m.to_xml_ref_intro(),
		headers: [m.to_xml_ref_h1(), m.to_xml_ref_h2(), m.table_note()],
		rows: [
			['{"id":42}', '<id>42</id>', m.to_xml_ref_n1()],
			['{"tags":["a","b"]}', '<tags>a</tags>\n<tags>b</tags>', m.to_xml_ref_n2()],
			['{"x":null}', '<x />', m.to_xml_ref_n3()],
			['{"n":"Ada & Co"}', '<n>Ada &amp; Co</n>', m.to_xml_ref_n4()],
			['{"my key":1}', '<my_key>1</my_key>', m.to_xml_ref_n5()],
			['{"2nd":1}', '<_2nd>1</_2nd>', m.to_xml_ref_n6()],
			['[{"id":1}]', '<root>\n  <item>...</item>\n</root>', m.to_xml_ref_n7()]
		]
	}}
	examples={{
		title: m.to_xml_ex_title(),
		intro: m.to_xml_ex_intro(),
		input: `{
  "id": 42,
  "user": { "name": "Ada & Co" },
  "tags": ["admin", "dev"],
  "deleted": null
}`,
		output: `<?xml version="1.0" encoding="UTF-8"?>
<root>
  <id>42</id>
  <user>
    <name>Ada &amp; Co</name>
  </user>
  <tags>admin</tags>
  <tags>dev</tags>
  <deleted />
</root>`,
		note: m.to_xml_ex_note()
	}}
	pitfalls={{
		title: m.to_xml_pit_title(),
		items: [
			{
				title: m.to_xml_pit1_t(),
				desc: m.to_xml_pit1_d(),
				code: '{"tags":["a"]}   ->  <tags>a</tags>\n{"tags":"a"}     ->  <tags>a</tags>'
			},
			{ title: m.to_xml_pit2_t(), desc: m.to_xml_pit2_d() },
			{ title: m.to_xml_pit3_t(), desc: m.to_xml_pit3_d() }
		]
	}}
	howto={[
		{ step: m.to_xml_howto_s1(), desc: m.to_xml_howto_s1_desc() },
		{ step: m.to_xml_howto_s2(), desc: m.to_xml_howto_s2_desc() },
		{ step: m.to_xml_howto_s3(), desc: m.to_xml_howto_s3_desc() }
	]}
	features={[m.to_xml_feature1(), m.to_xml_feature2(), m.to_xml_feature3(), m.to_xml_feature4()]}
	usecases={[m.to_xml_usecase1(), m.to_xml_usecase2(), m.to_xml_usecase3()]}
	faqs={[
		{ question: m.to_xml_faq_q1(), answer: m.to_xml_faq_a1() },
		{ question: m.to_xml_faq_q2(), answer: m.to_xml_faq_a2() },
		{ question: m.to_xml_faq_q3(), answer: m.to_xml_faq_a3() },
		{ question: m.to_xml_faq_q4(), answer: m.to_xml_faq_a4() },
		{ question: m.to_xml_faq_q5(), answer: m.to_xml_faq_a5() },
		{ question: m.to_xml_faq_q6(), answer: m.to_xml_faq_a6() },
		{ question: m.to_xml_faq_q7(), answer: m.to_xml_faq_a7() }
	]}
/>
