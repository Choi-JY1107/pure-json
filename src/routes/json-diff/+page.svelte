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
		{ question: m.diff_faq_q5(), answer: m.diff_faq_a5() }
	]}
/>
