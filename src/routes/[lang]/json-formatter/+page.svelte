<script lang="ts">
	import DualPanelToolPage from '$lib/components/tool/DualPanelToolPage.svelte';
	import { getEditorStore } from '$lib/stores/editor';
	import { formatJson } from '$lib/utils/json-formatter';
	import * as m from '$lib/paraglide/messages.js';

	const editor = getEditorStore('json-formatter');
	let indent = $state(2);
</script>

<DualPanelToolPage
	{editor}
	transform={(input) => formatJson(input, indent)}
	metaTitle={m.formatter_title()}
	metaDescription={m.formatter_description()}
	title={m.formatter_h1()}
	actionLabel={m.btn_format()}
	inputLabel={m.input_label()}
	outputLabel={m.output_label()}
	intro={m.formatter_intro()}
	faqs={[
		{ question: m.formatter_faq_q1(), answer: m.formatter_faq_a1() },
		{ question: m.formatter_faq_q2(), answer: m.formatter_faq_a2() }
	]}
>
	{#snippet toolbarExtra()}
		<select class="tool-page__select select select-sm select-bordered" bind:value={indent}>
			<option value={2}>{m.indent_2_spaces()}</option>
			<option value={4}>{m.indent_4_spaces()}</option>
			<option value={1}>{m.indent_1_tab()}</option>
		</select>
	{/snippet}
</DualPanelToolPage>
