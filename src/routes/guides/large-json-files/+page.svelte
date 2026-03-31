<script lang="ts">
	import GuidePage from '$lib/components/guide/GuidePage.svelte';
	import * as m from '$lib/paraglide/messages.js';
</script>

<GuidePage
	metaTitle={m.guide_large_json_files_title()}
	metaDescription={m.guide_large_json_files_description()}
	title={m.guide_large_json_files_h1()}
	intro={m.guide_large_json_files_intro()}
	sections={[
		{
			title: m.guide_large_json_files_s1_title(),
			paragraphs: [m.guide_large_json_files_s1_p1(), m.guide_large_json_files_s1_p2()]
		},
		{
			title: m.guide_large_json_files_s2_title(),
			paragraphs: [m.guide_large_json_files_s2_p1()]
		},
		{
			title: m.guide_large_json_files_s3_title(),
			paragraphs: [m.guide_large_json_files_s3_p1()],
			list: [
				m.guide_large_json_files_s3_li1(),
				m.guide_large_json_files_s3_li2(),
				m.guide_large_json_files_s3_li3()
			]
		},
		{
			title: m.guide_large_json_files_s4_title(),
			paragraphs: [m.guide_large_json_files_s4_p1(), m.guide_large_json_files_s4_p2()]
		},
		{
			title: m.guide_large_json_files_s5_title(),
			paragraphs: [m.guide_large_json_files_s5_p1()],
			list: [
				m.guide_large_json_files_s5_li1(),
				m.guide_large_json_files_s5_li2(),
				m.guide_large_json_files_s5_li3(),
				m.guide_large_json_files_s5_li4()
			]
		},
		{
			title: m.guide_large_json_files_s6_title(),
			paragraphs: [m.guide_large_json_files_s6_p1()],
			list: [
				m.guide_large_json_files_s6_li1(),
				m.guide_large_json_files_s6_li2(),
				m.guide_large_json_files_s6_li3(),
				m.guide_large_json_files_s6_li4()
			]
		}
	]}
	relatedTools={[
		{ href: '/json-minifier', label: 'JSON Minifier' },
		{ href: '/json-formatter', label: 'JSON Formatter' },
		{ href: '/json-to-csv', label: 'JSON → CSV' }
	]}
	faqs={[
		{ question: m.guide_large_json_files_faq_q1(), answer: m.guide_large_json_files_faq_a1() },
		{ question: m.guide_large_json_files_faq_q2(), answer: m.guide_large_json_files_faq_a2() }
	]}
/>
