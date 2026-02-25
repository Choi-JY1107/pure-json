<script lang="ts">
	import DualPanelToolPage from '$lib/components/tool/DualPanelToolPage.svelte';
	import { getEditorStore } from '$lib/stores/editor';
	import { jsonToTypescript } from '$lib/utils/json-to-ts';
	import * as m from '$lib/paraglide/messages.js';

	const editor = getEditorStore('json-to-typescript');
</script>

<DualPanelToolPage
	{editor}
	transform={jsonToTypescript}
	metaTitle={m.to_typescript_title()}
	metaDescription={m.to_typescript_description()}
	title={m.to_typescript_h1()}
	actionLabel={m.btn_convert()}
	outputLabel={m.typescript_output_label()}
	outputLanguage="typescript"
	intro={m.to_typescript_intro()}
	faqs={[
		{ question: m.to_typescript_faq_q1(), answer: m.to_typescript_faq_a1() },
		{ question: m.to_typescript_faq_q2(), answer: m.to_typescript_faq_a2() }
	]}
/>
