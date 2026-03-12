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
	faqs={[
		{ question: m.sorter_faq_q1(), answer: m.sorter_faq_a1() },
		{ question: m.sorter_faq_q2(), answer: m.sorter_faq_a2() }
	]}
>
	{#snippet toolbarExtra()}
		<select class="select select-sm select-bordered" bind:value={order}>
			<option value="asc">{m.sort_asc()}</option>
			<option value="desc">{m.sort_desc()}</option>
		</select>
	{/snippet}
</DualPanelToolPage>
