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
	howto={[
		{ step: m.formatter_howto_s1(), desc: m.formatter_howto_s1_desc() },
		{ step: m.formatter_howto_s2(), desc: m.formatter_howto_s2_desc() },
		{ step: m.formatter_howto_s3(), desc: m.formatter_howto_s3_desc() }
	]}
	features={[m.formatter_feature1(), m.formatter_feature2(), m.formatter_feature3(), m.formatter_feature4()]}
	usecases={[m.formatter_usecase1(), m.formatter_usecase2(), m.formatter_usecase3()]}
	faqs={[
		{ question: m.formatter_faq_q1(), answer: m.formatter_faq_a1() },
		{ question: m.formatter_faq_q2(), answer: m.formatter_faq_a2() },
		{ question: m.formatter_faq_q3(), answer: m.formatter_faq_a3() },
		{ question: m.formatter_faq_q4(), answer: m.formatter_faq_a4() },
		{ question: m.formatter_faq_q5(), answer: m.formatter_faq_a5() }
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
