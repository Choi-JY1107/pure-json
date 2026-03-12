<script lang="ts">
	import DualPanelToolPage from '$lib/components/tool/DualPanelToolPage.svelte';
	import { getEditorStore } from '$lib/stores/editor';
	import { jsonToCsv } from '$lib/utils/json-to-csv';
	import * as m from '$lib/paraglide/messages.js';

	const editor = getEditorStore('json-to-csv');
</script>

<DualPanelToolPage
	{editor}
	transform={jsonToCsv}
	metaTitle={m.to_csv_title()}
	metaDescription={m.to_csv_description()}
	title={m.to_csv_h1()}
	actionLabel={m.btn_convert()}
	outputLabel={m.csv_output_label()}
	outputLanguage="plaintext"
	intro={m.to_csv_intro()}
	faqs={[
		{ question: m.to_csv_faq_q1(), answer: m.to_csv_faq_a1() },
		{ question: m.to_csv_faq_q2(), answer: m.to_csv_faq_a2() }
	]}
/>
