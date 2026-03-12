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
	faqs={[
		{ question: m.csv_to_json_faq_q1(), answer: m.csv_to_json_faq_a1() },
		{ question: m.csv_to_json_faq_q2(), answer: m.csv_to_json_faq_a2() }
	]}
/>
