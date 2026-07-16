<script lang="ts">
	import GuidePage from '$lib/components/guide/GuidePage.svelte';
	import * as m from '$lib/paraglide/messages.js';
</script>

<GuidePage
	metaTitle={m.guide_json_rest_api_title()}
	metaDescription={m.guide_json_rest_api_description()}
	title={m.guide_json_rest_api_h1()}
	intro={m.guide_json_rest_api_intro()}
	sections={[
		{
			title: m.guide_json_rest_api_s1_title(),
			paragraphs: [m.guide_json_rest_api_s1_p1()],
			codeExample: 'POST /api/users HTTP/1.1\nContent-Type: application/json\n\n{\n  "name": "Jane Doe",\n  "email": "jane@example.com",\n  "role": "developer"\n}'
		},
		{
			title: m.guide_json_rest_api_s2_title(),
			paragraphs: [m.guide_json_rest_api_s2_p1()],
			codeExample: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "data": {\n    "id": 1,\n    "name": "Jane Doe",\n    "email": "jane@example.com"\n  },\n  "meta": {\n    "timestamp": "2024-01-15T10:30:00Z"\n  }\n}'
		},
		{
			title: m.guide_json_rest_api_s3_title(),
			paragraphs: [m.guide_json_rest_api_s3_p1()],
			list: [
				m.guide_json_rest_api_s3_li1(),
				m.guide_json_rest_api_s3_li2(),
				m.guide_json_rest_api_s3_li3(),
				m.guide_json_rest_api_s3_li4()
			]
		},
		{
			title: m.guide_json_rest_api_s4_title(),
			paragraphs: [m.guide_json_rest_api_s4_p1(), m.guide_json_rest_api_s4_p2()]
		},
		{
			title: m.guide_json_rest_api_s5_title(),
			paragraphs: [m.guide_json_rest_api_s5_p1()],
			list: [
				m.guide_json_rest_api_s5_li1(),
				m.guide_json_rest_api_s5_li2(),
				m.guide_json_rest_api_s5_li3(),
				m.guide_json_rest_api_s5_li4(),
				m.guide_json_rest_api_s5_li5()
			]
		},
		{
			title: m.guide_json_rest_api_s6_title(),
			paragraphs: [
				m.guide_json_rest_api_s6_p1(),
				m.guide_json_rest_api_s6_p2(),
				m.guide_json_rest_api_s6_p3()
			]
		}
	]}
	relatedTools={[
		{ href: '/', label: 'JSON Viewer' },
		{ href: '/json-to-typescript', label: 'JSON → TypeScript' },
		{ href: '/json-diff', label: 'JSON Diff' }
	]}
	faqs={[
		{ question: m.guide_json_rest_api_faq_q1(), answer: m.guide_json_rest_api_faq_a1() },
		{ question: m.guide_json_rest_api_faq_q2(), answer: m.guide_json_rest_api_faq_a2() },
		{ question: m.guide_json_rest_api_faq_q3(), answer: m.guide_json_rest_api_faq_a3() },
		{ question: m.guide_json_rest_api_faq_q4(), answer: m.guide_json_rest_api_faq_a4() }
	]}
/>
