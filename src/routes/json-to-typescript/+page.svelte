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
		{ question: m.to_typescript_faq_q5(), answer: m.to_typescript_faq_a5() }
	]}
/>
