<script lang="ts">
	import ToolPage from '$lib/components/tool/ToolPage.svelte';
	import { jsonDiff, formatDiff } from '$lib/utils/json-diff';
	import * as m from '$lib/paraglide/messages.js';
</script>

<ToolPage
	mode="diff"
	metaTitle={m.diff_title()}
	metaDescription={m.diff_description()}
	title={m.diff_h1()}
	actionLabel={m.btn_compare()}
	diffTransform={(left, right) => formatDiff(jsonDiff(left, right))}
	diffLeftLabel={m.diff_left_label()}
	diffRightLabel={m.diff_right_label()}
	diffResultLabel={m.diff_result_label()}
	intro={m.diff_intro()}
	body={[m.diff_body1(), m.diff_body2()]}
	deep={{
		title: m.diff_deep_title(),
		paragraphs: [m.diff_deep_p1(), m.diff_deep_p2(), m.diff_deep_p3()]
	}}
	reference={{
		title: m.diff_ref_title(),
		intro: m.diff_ref_intro(),
		headers: [m.diff_ref_h1(), m.diff_ref_h2(), m.table_note()],
		rows: [
			['+ path: value', 'added', m.diff_ref_n1()],
			['- path: value', 'removed', m.diff_ref_n2()],
			['~ path:', 'changed', m.diff_ref_n3()],
			['user.address.city', 'object key', m.diff_ref_n4()],
			['items[2].id', 'array index', m.diff_ref_n5()],
			['(root)', 'whole document', m.diff_ref_n6()]
		]
	}}
	examples={{
		title: m.diff_ex_title(),
		intro: m.diff_ex_intro(),
		input: `left:  {"name":"Ada","age":30,"role":"dev"}
right: {"name":"Ada","age":31,"meta":{"city":"Seoul"}}`,
		output: `~ age:
    - 30
    + 31
- role: "dev"
+ meta: {"city":"Seoul"}`,
		note: m.diff_ex_note()
	}}
	pitfalls={{
		title: m.diff_pit_title(),
		items: [
			{
				title: m.diff_pit1_t(),
				desc: m.diff_pit1_d(),
				code: `left:  ["a","b","c"]
right: ["b","c","a"]

~ [0]:  - "a"  + "b"
~ [1]:  - "b"  + "c"
~ [2]:  - "c"  + "a"`
			},
			{ title: m.diff_pit2_t(), desc: m.diff_pit2_d() },
			{ title: m.diff_pit3_t(), desc: m.diff_pit3_d() }
		]
	}}
	howto={[
		{ step: m.diff_howto_s1(), desc: m.diff_howto_s1_desc() },
		{ step: m.diff_howto_s2(), desc: m.diff_howto_s2_desc() },
		{ step: m.diff_howto_s3(), desc: m.diff_howto_s3_desc() }
	]}
	features={[m.diff_feature1(), m.diff_feature2(), m.diff_feature3(), m.diff_feature4()]}
	usecases={[m.diff_usecase1(), m.diff_usecase2(), m.diff_usecase3()]}
	faqs={[
		{ question: m.diff_faq_q1(), answer: m.diff_faq_a1() },
		{ question: m.diff_faq_q2(), answer: m.diff_faq_a2() },
		{ question: m.diff_faq_q3(), answer: m.diff_faq_a3() },
		{ question: m.diff_faq_q4(), answer: m.diff_faq_a4() },
		{ question: m.diff_faq_q5(), answer: m.diff_faq_a5() },
		{ question: m.diff_faq_q6(), answer: m.diff_faq_a6() },
		{ question: m.diff_faq_q7(), answer: m.diff_faq_a7() }
	]}
/>
