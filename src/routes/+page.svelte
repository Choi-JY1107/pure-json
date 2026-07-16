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
		{ question: m.viewer_faq_q5(), answer: m.viewer_faq_a5() }
	]}
>
	{#snippet hero()}
		<Hero />
	{/snippet}
	{#snippet belowContent()}
		<ToolsGrid />
	{/snippet}
</ToolPage>
