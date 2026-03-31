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
		<div class="sort-toggle">
			<button
				class="sort-toggle__btn"
				class:sort-toggle__btn--active={order === 'asc'}
				onclick={() => (order = 'asc')}
			>
				<span class="material-symbols-outlined" style="font-size: 0.875rem;">arrow_upward</span>
				{m.sort_asc()}
			</button>
			<button
				class="sort-toggle__btn"
				class:sort-toggle__btn--active={order === 'desc'}
				onclick={() => (order = 'desc')}
			>
				<span class="material-symbols-outlined" style="font-size: 0.875rem;">arrow_downward</span>
				{m.sort_desc()}
			</button>
		</div>
	{/snippet}
</DualPanelToolPage>

<style>
	@reference "../../app.css";

	.sort-toggle {
		@apply flex bg-surface-container-low rounded-lg p-1;
	}
	.sort-toggle__btn {
		@apply inline-flex items-center gap-1 px-3 py-1 rounded
		       text-[0.625rem] font-bold uppercase tracking-wider
		       text-secondary cursor-pointer transition-colors;
	}
	.sort-toggle__btn--active {
		@apply bg-primary text-on-primary;
	}
</style>
