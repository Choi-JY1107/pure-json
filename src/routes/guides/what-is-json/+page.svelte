<script lang="ts">
	import GuidePage from '$lib/components/guide/GuidePage.svelte';
	import * as m from '$lib/paraglide/messages.js';
</script>

<GuidePage
	metaTitle={m.guide_what_is_json_title()}
	metaDescription={m.guide_what_is_json_description()}
	title={m.guide_what_is_json_h1()}
	intro={m.guide_what_is_json_intro()}
	sections={[
		{
			title: m.guide_what_is_json_s1_title(),
			paragraphs: [m.guide_what_is_json_s1_p1(), m.guide_what_is_json_s1_p2()],
			codeExample: '{\n  "name": "John Doe",\n  "age": 30,\n  "isActive": true,\n  "email": null,\n  "hobbies": ["reading", "coding", "hiking"],\n  "address": {\n    "city": "Seoul",\n    "country": "South Korea"\n  }\n}'
		},
		{
			title: m.guide_what_is_json_s2_title(),
			paragraphs: [m.guide_what_is_json_s2_p1()],
			list: [
				m.guide_what_is_json_s2_li1(),
				m.guide_what_is_json_s2_li2(),
				m.guide_what_is_json_s2_li3(),
				m.guide_what_is_json_s2_li4(),
				m.guide_what_is_json_s2_li5(),
				m.guide_what_is_json_s2_li6()
			]
		},
		{
			title: m.guide_what_is_json_s3_title(),
			paragraphs: [m.guide_what_is_json_s3_p1(), m.guide_what_is_json_s3_p2(), m.guide_what_is_json_s3_p3()]
		},
		{
			title: m.guide_what_is_json_s4_title(),
			paragraphs: [m.guide_what_is_json_s4_p1()],
			list: [
				m.guide_what_is_json_s4_li1(),
				m.guide_what_is_json_s4_li2(),
				m.guide_what_is_json_s4_li3(),
				m.guide_what_is_json_s4_li4(),
				m.guide_what_is_json_s4_li5()
			]
		},
		{
			title: m.guide_what_is_json_s5_title(),
			paragraphs: [m.guide_what_is_json_s5_p1(), m.guide_what_is_json_s5_p2(), m.guide_what_is_json_s5_p3()]
		},
		{
			title: m.guide_what_is_json_s6_title(),
			paragraphs: [m.guide_what_is_json_s6_p1()],
			list: [
				m.guide_what_is_json_s6_li1(),
				m.guide_what_is_json_s6_li2(),
				m.guide_what_is_json_s6_li3(),
				m.guide_what_is_json_s6_li4(),
				m.guide_what_is_json_s6_li5()
			]
		}
	]}
	relatedTools={[
		{ href: '/', label: 'JSON Viewer' },
		{ href: '/json-formatter', label: 'JSON Formatter' }
	]}
	faqs={[
		{ question: m.guide_what_is_json_faq_q1(), answer: m.guide_what_is_json_faq_a1() },
		{ question: m.guide_what_is_json_faq_q2(), answer: m.guide_what_is_json_faq_a2() },
		{ question: m.guide_what_is_json_faq_q3(), answer: m.guide_what_is_json_faq_a3() }
	]}
/>
