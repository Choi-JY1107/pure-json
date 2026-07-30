<script lang="ts">
	import ToolPage from '$lib/components/tool/ToolPage.svelte';
	import { getEditorStore } from '$lib/stores/editor';
	import { jsonToYaml } from '$lib/utils/json-to-yaml';
	import * as m from '$lib/paraglide/messages.js';

	const editor = getEditorStore('json-to-yaml');
</script>

<ToolPage
	mode="dual"
	{editor}
	transform={jsonToYaml}
	metaTitle={m.to_yaml_title()}
	metaDescription={m.to_yaml_description()}
	title={m.to_yaml_h1()}
	actionLabel={m.btn_convert()}
	outputLabel={m.yaml_output_label()}
	outputLanguage="yaml"
	intro={m.to_yaml_intro()}
	body={[m.to_yaml_body1(), m.to_yaml_body2()]}
	deep={{
		title: m.to_yaml_deep_title(),
		paragraphs: [m.to_yaml_deep_p1(), m.to_yaml_deep_p2(), m.to_yaml_deep_p3()]
	}}
	reference={{
		title: m.to_yaml_ref_title(),
		intro: m.to_yaml_ref_intro(),
		headers: [m.to_yaml_ref_h1(), m.to_yaml_ref_h2(), m.table_note()],
		rows: [
			['"no"', "region: 'no'", m.to_yaml_ref_n1()],
			['"yes"', "enabled: 'yes'", m.to_yaml_ref_n2()],
			['"1.10"', "version: '1.10'", m.to_yaml_ref_n3()],
			['"Seoul"', 'city: Seoul', m.to_yaml_ref_n4()],
			['true', 'active: true', m.to_yaml_ref_n5()],
			['[80, 443]', 'ports:\n  - 80\n  - 443', m.to_yaml_ref_n6()],
			['[]', 'extras: []', m.to_yaml_ref_n7()],
			['"xxx... (140 chars)"', 'longtext: >-\n  xxx...', m.to_yaml_ref_n8()]
		]
	}}
	examples={{
		title: m.to_yaml_ex_title(),
		intro: m.to_yaml_ex_intro(),
		input: `{
  "region": "no",
  "enabled": "yes",
  "version": "1.10",
  "city": "Seoul",
  "active": true,
  "ports": [80, 443],
  "extras": []
}`,
		output: `region: 'no'
enabled: 'yes'
version: '1.10'
city: Seoul
active: true
ports:
  - 80
  - 443
extras: []`,
		note: m.to_yaml_ex_note()
	}}
	pitfalls={{
		title: m.to_yaml_pit_title(),
		items: [
			{
				title: m.to_yaml_pit1_t(),
				desc: m.to_yaml_pit1_d(),
				code: "region: 'no'   # string \"no\"\nregion: no     # boolean false in YAML 1.1"
			},
			{ title: m.to_yaml_pit2_t(), desc: m.to_yaml_pit2_d() },
			{ title: m.to_yaml_pit3_t(), desc: m.to_yaml_pit3_d() }
		]
	}}
	howto={[
		{ step: m.to_yaml_howto_s1(), desc: m.to_yaml_howto_s1_desc() },
		{ step: m.to_yaml_howto_s2(), desc: m.to_yaml_howto_s2_desc() },
		{ step: m.to_yaml_howto_s3(), desc: m.to_yaml_howto_s3_desc() }
	]}
	features={[m.to_yaml_feature1(), m.to_yaml_feature2(), m.to_yaml_feature3(), m.to_yaml_feature4()]}
	usecases={[m.to_yaml_usecase1(), m.to_yaml_usecase2(), m.to_yaml_usecase3()]}
	faqs={[
		{ question: m.to_yaml_faq_q1(), answer: m.to_yaml_faq_a1() },
		{ question: m.to_yaml_faq_q2(), answer: m.to_yaml_faq_a2() },
		{ question: m.to_yaml_faq_q3(), answer: m.to_yaml_faq_a3() },
		{ question: m.to_yaml_faq_q4(), answer: m.to_yaml_faq_a4() },
		{ question: m.to_yaml_faq_q5(), answer: m.to_yaml_faq_a5() },
		{ question: m.to_yaml_faq_q6(), answer: m.to_yaml_faq_a6() },
		{ question: m.to_yaml_faq_q7(), answer: m.to_yaml_faq_a7() }
	]}
/>
