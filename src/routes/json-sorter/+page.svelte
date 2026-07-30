<script lang="ts">
	import ToolPage from '$lib/components/tool/ToolPage.svelte';
	import { getEditorStore } from '$lib/stores/editor';
	import { sortJson } from '$lib/utils/json-sorter';
	import * as m from '$lib/paraglide/messages.js';

	const editor = getEditorStore('json-sorter');
	let order = $state<'asc' | 'desc'>('asc');
</script>

<ToolPage
	mode="dual"
	{editor}
	transform={(input) => sortJson(input, order)}
	metaTitle={m.sorter_title()}
	metaDescription={m.sorter_description()}
	title={m.sorter_h1()}
	actionLabel={m.btn_sort()}
	intro={m.sorter_intro()}
	body={[m.sorter_body1(), m.sorter_body2()]}
	deep={{
		title: m.sorter_deep_title(),
		paragraphs: [m.sorter_deep_p1(), m.sorter_deep_p2(), m.sorter_deep_p3()]
	}}
	reference={{
		title: m.sorter_ref_title(),
		intro: m.sorter_ref_intro(),
		headers: [m.sorter_ref_h1(), m.sorter_ref_h2(), m.table_note()],
		rows: [
			['"Beta", "alpha"', 'alpha, Beta', m.sorter_ref_n1()],
			['"Alpha", "alpha"', 'alpha, Alpha', m.sorter_ref_n2()],
			['"zebra", "école"', 'école, zebra', m.sorter_ref_n3()],
			['"item2", "item10"', 'item10, item2', m.sorter_ref_n4()],
			['"id", "_id"', '_id, id', m.sorter_ref_n5()]
		]
	}}
	examples={{
		title: m.sorter_ex_title(),
		intro: m.sorter_ex_intro(),
		input: `{
  "name": "Ada",
  "tags": ["z", "a"],
  "meta": { "updated": 2, "created": 1 },
  "active": true
}`,
		output: `{
  "active": true,
  "meta": {
    "created": 1,
    "updated": 2
  },
  "name": "Ada",
  "tags": [
    "z",
    "a"
  ]
}`,
		note: m.sorter_ex_note()
	}}
	pitfalls={{
		title: m.sorter_pit_title(),
		items: [
			{
				title: m.sorter_pit1_t(),
				desc: m.sorter_pit1_d(),
				code: 'descending: {"b":1,"10":2,"a":3,"2":4}\n       ->  {"2":4,"10":2,"b":1,"a":3}'
			},
			{ title: m.sorter_pit2_t(), desc: m.sorter_pit2_d() },
			{ title: m.sorter_pit3_t(), desc: m.sorter_pit3_d() }
		]
	}}
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
		{ question: m.sorter_faq_q5(), answer: m.sorter_faq_a5() },
		{ question: m.sorter_faq_q6(), answer: m.sorter_faq_a6() },
		{ question: m.sorter_faq_q7(), answer: m.sorter_faq_a7() }
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
</ToolPage>

<style>
	@reference "../../app.css";

	:global(.sort-toggle) {
		@apply flex bg-surface-container-low rounded-lg p-1;
	}
	:global(.sort-toggle__btn) {
		@apply inline-flex items-center gap-1 px-3 py-1 rounded
		       text-[0.625rem] font-bold uppercase tracking-wider
		       text-secondary cursor-pointer transition-colors;
	}
	:global(.sort-toggle__btn--active) {
		@apply bg-primary text-on-primary;
	}
</style>
