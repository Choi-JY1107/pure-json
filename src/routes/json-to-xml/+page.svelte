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
		{ question: m.to_xml_faq_q5(), answer: m.to_xml_faq_a5() }
	]}
/>
