<script lang="ts">
	import DualPanelToolPage from '$lib/components/tool/DualPanelToolPage.svelte';
	import { getEditorStore } from '$lib/stores/editor';
	import { sortJson } from '$lib/utils/json-sorter';
	import * as m from '$lib/paraglide/messages.js';

	const editor = getEditorStore('json-sorter');
	let order = $state<'asc' | 'desc'>('asc');
</script>

<DualPanelToolPage
	{editor}
	transform={(input) => sortJson(input, order)}
	metaTitle={m.sorter_title()}
	metaDescription={m.sorter_description()}
	title={m.sorter_h1()}
	actionLabel={m.btn_sort()}
	intro={m.sorter_intro()}
	howto={[
		{ step: m.sorter_howto_s1(), desc: m.sorter_howto_s1_desc() },
		{ step: m.sorter_howto_s2(), desc: m.sorter_howto_s2_desc() },
		{ step: m.sorter_howto_s3(), desc: m.sorter_howto_s3_desc() }
	]}
	features={[m.sorter_feature1(), m.sorter_feature2(), m.sorter_feature3(), m.sorter_feature4()]}
	usecases={[m.sorter_usecase1(), m.sorter_usecase2(), m.sorter_usecase3()]}
	faqs={[
		{ question: m.sorter_faq_q1(), answer: m.sorter_faq_a1() },
		{ question: m.sorter_faq_q2(), answer: m.sorter_faq_a2() },
		{ question: m.sorter_faq_q3(), answer: m.sorter_faq_a3() },
		{ question: m.sorter_faq_q4(), answer: m.sorter_faq_a4() },
		{ question: m.sorter_faq_q5(), answer: m.sorter_faq_a5() }
	]}
>
	{#snippet toolbarExtra()}
		<select class="select select-sm select-bordered" bind:value={order}>
			<option value="asc">{m.sort_asc()}</option>
			<option value="desc">{m.sort_desc()}</option>
		</select>
	{/snippet}
</DualPanelToolPage>
