<script lang="ts">
	import DualPanelToolPage from '$lib/components/tool/DualPanelToolPage.svelte';
	import { getEditorStore } from '$lib/stores/editor';
	import { jsonToYaml } from '$lib/utils/json-to-yaml';
	import * as m from '$lib/paraglide/messages.js';

	const editor = getEditorStore('json-to-yaml');
</script>

<DualPanelToolPage
	{editor}
	transform={jsonToYaml}
	metaTitle={m.to_yaml_title()}
	metaDescription={m.to_yaml_description()}
	title={m.to_yaml_h1()}
	actionLabel={m.btn_convert()}
	outputLabel={m.yaml_output_label()}
	outputLanguage="yaml"
	intro={m.to_yaml_intro()}
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
		{ question: m.to_yaml_faq_q5(), answer: m.to_yaml_faq_a5() }
	]}
/>
