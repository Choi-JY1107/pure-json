<script lang="ts">
	import DualPanelToolPage from '$lib/components/tool/DualPanelToolPage.svelte';
	import { getEditorStore } from '$lib/stores/editor';
	import { jsonToXml } from '$lib/utils/json-to-xml';
	import * as m from '$lib/paraglide/messages.js';

	const editor = getEditorStore('json-to-xml');
</script>

<DualPanelToolPage
	{editor}
	transform={jsonToXml}
	metaTitle={m.to_xml_title()}
	metaDescription={m.to_xml_description()}
	title={m.to_xml_h1()}
	actionLabel={m.btn_convert()}
	outputLabel={m.xml_output_label()}
	outputLanguage="xml"
	intro={m.to_xml_intro()}
	faqs={[
		{ question: m.to_xml_faq_q1(), answer: m.to_xml_faq_a1() },
		{ question: m.to_xml_faq_q2(), answer: m.to_xml_faq_a2() }
	]}
/>
