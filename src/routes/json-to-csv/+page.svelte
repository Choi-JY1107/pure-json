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
		{ question: m.to_csv_faq_q5(), answer: m.to_csv_faq_a5() }
	]}
/>
