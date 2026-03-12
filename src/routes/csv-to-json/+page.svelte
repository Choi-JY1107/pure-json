<script lang="ts">
	import DualPanelToolPage from '$lib/components/tool/DualPanelToolPage.svelte';
	import { getEditorStore } from '$lib/stores/editor';
	import { csvToJson } from '$lib/utils/csv-to-json';
	import * as m from '$lib/paraglide/messages.js';

	const editor = getEditorStore('csv-to-json');
</script>

<DualPanelToolPage
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
		{ question: m.csv_to_json_faq_q5(), answer: m.csv_to_json_faq_a5() }
	]}
/>
