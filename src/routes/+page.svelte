<script lang="ts">
	import ToolPage from '$lib/components/tool/ToolPage.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import ToolsGrid from '$lib/components/home/ToolsGrid.svelte';
	import { getEditorStore } from '$lib/stores/editor';
	import * as m from '$lib/paraglide/messages.js';

	const editor = getEditorStore('json-viewer');
</script>

<ToolPage
	mode="viewer"
	{editor}
	metaTitle={m.viewer_title()}
	metaDescription={m.viewer_description()}
	title={m.viewer_h1()}
	intro={m.viewer_intro()}
	body={[m.viewer_body1(), m.viewer_body2()]}
	deep={{
		title: m.viewer_deep_title(),
		paragraphs: [m.viewer_deep_p1(), m.viewer_deep_p2(), m.viewer_deep_p3()]
	}}
	reference={{
		title: m.viewer_ref_title(),
		intro: m.viewer_ref_intro(),
		headers: [m.viewer_ref_h1(), m.viewer_ref_h2(), m.table_note()],
		rows: [
			['"42"', 'string', m.viewer_ref_n1()],
			['42', 'number', m.viewer_ref_n2()],
			['null', 'null', m.viewer_ref_n3()],
			['""', 'string', m.viewer_ref_n4()],
			['[] / {}', 'array / object', m.viewer_ref_n5()],
			['root.user.address.city', 'path', m.viewer_ref_n6()],
			['root.items[2].id', 'path', m.viewer_ref_n7()]
		]
	}}
	examples={{
		title: m.viewer_ex_title(),
		intro: m.viewer_ex_intro(),
		input: `{
  "user": { "name": "Ada", "zip": "07030" },
  "items": [
    { "id": 1, "score": 9.5 },
    { "id": 2, "score": null }
  ]
}`,
		output: `root.user.name      string   "Ada"
root.user.zip       string   "07030"
root.items[0].id    number   1
root.items[0].score number   9.5
root.items[1].id    number   2
root.items[1].score null     null`,
		note: m.viewer_ex_note()
	}}
	pitfalls={{
		title: m.viewer_pit_title(),
		items: [
			{ title: m.viewer_pit1_t(), desc: m.viewer_pit1_d() },
			{
				title: m.viewer_pit2_t(),
				desc: m.viewer_pit2_d(),
				code: '{"a":1,"a":2}  ->  one node, a = 2'
			},
			{
				title: m.viewer_pit3_t(),
				desc: m.viewer_pit3_d(),
				code: '12345678901234567890  ->  12345678901234567000'
			}
		]
	}}
	howto={[
		{ step: m.viewer_howto_s1(), desc: m.viewer_howto_s1_desc() },
		{ step: m.viewer_howto_s2(), desc: m.viewer_howto_s2_desc() },
		{ step: m.viewer_howto_s3(), desc: m.viewer_howto_s3_desc() }
	]}
	features={[m.viewer_feature1(), m.viewer_feature2(), m.viewer_feature3(), m.viewer_feature4()]}
	usecases={[m.viewer_usecase1(), m.viewer_usecase2(), m.viewer_usecase3()]}
	faqs={[
		{ question: m.viewer_faq_q1(), answer: m.viewer_faq_a1() },
		{ question: m.viewer_faq_q2(), answer: m.viewer_faq_a2() },
		{ question: m.viewer_faq_q3(), answer: m.viewer_faq_a3() },
		{ question: m.viewer_faq_q4(), answer: m.viewer_faq_a4() },
		{ question: m.viewer_faq_q5(), answer: m.viewer_faq_a5() },
		{ question: m.viewer_faq_q6(), answer: m.viewer_faq_a6() },
		{ question: m.viewer_faq_q7(), answer: m.viewer_faq_a7() }
	]}
>
	{#snippet hero()}
		<Hero />
	{/snippet}
	{#snippet belowContent()}
		<ToolsGrid />
	{/snippet}
</ToolPage>
