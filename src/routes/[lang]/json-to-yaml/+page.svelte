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
	faqs={[
		{ question: m.to_yaml_faq_q1(), answer: m.to_yaml_faq_a1() },
		{ question: m.to_yaml_faq_q2(), answer: m.to_yaml_faq_a2() }
	]}
/>
