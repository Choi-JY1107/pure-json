<script lang="ts">
	import GuidePage from '$lib/components/guide/GuidePage.svelte';
	import * as m from '$lib/paraglide/messages.js';
</script>

<GuidePage
	metaTitle={m.guide_json_schema_title()}
	metaDescription={m.guide_json_schema_description()}
	title={m.guide_json_schema_h1()}
	intro={m.guide_json_schema_intro()}
	sections={[
		{
			title: m.guide_json_schema_s1_title(),
			paragraphs: [m.guide_json_schema_s1_p1()],
			codeExample: '{\n  "$schema": "https://json-schema.org/draft/2020-12/schema",\n  "type": "object",\n  "properties": {\n    "name": {"type": "string", "minLength": 1},\n    "age": {"type": "integer", "minimum": 0},\n    "email": {"type": "string", "format": "email"}\n  },\n  "required": ["name", "email"]\n}'
		},
		{
			title: m.guide_json_schema_s2_title(),
			paragraphs: [m.guide_json_schema_s2_p1()],
			list: [
				m.guide_json_schema_s2_li1(),
				m.guide_json_schema_s2_li2(),
				m.guide_json_schema_s2_li3(),
				m.guide_json_schema_s2_li4(),
				m.guide_json_schema_s2_li5(),
				m.guide_json_schema_s2_li6()
			]
		},
		{
			title: m.guide_json_schema_s3_title(),
			paragraphs: [m.guide_json_schema_s3_p1()],
			codeExample: '{\n  "type": "object",\n  "properties": {\n    "username": {\n      "type": "string",\n      "minLength": 3,\n      "maxLength": 20,\n      "pattern": "^[a-zA-Z0-9_]+$"\n    },\n    "email": {\n      "type": "string",\n      "format": "email"\n    },\n    "password": {\n      "type": "string",\n      "minLength": 8\n    },\n    "age": {\n      "type": "integer",\n      "minimum": 13,\n      "maximum": 120\n    }\n  },\n  "required": ["username", "email", "password"]\n}'
		},
		{
			title: m.guide_json_schema_s4_title(),
			paragraphs: [m.guide_json_schema_s4_p1()],
			list: [
				m.guide_json_schema_s4_li1(),
				m.guide_json_schema_s4_li2(),
				m.guide_json_schema_s4_li3(),
				m.guide_json_schema_s4_li4(),
				m.guide_json_schema_s4_li5()
			]
		},
		{
			title: m.guide_json_schema_s5_title(),
			paragraphs: [m.guide_json_schema_s5_p1(), m.guide_json_schema_s5_p2()]
		},
		{
			title: m.guide_json_schema_s6_title(),
			paragraphs: [
				m.guide_json_schema_s6_p1(),
				m.guide_json_schema_s6_p2(),
				m.guide_json_schema_s6_p3()
			]
		}
	]}
	relatedTools={[
		{ href: '/', label: 'JSON Viewer' },
		{ href: '/json-to-typescript', label: 'JSON → TypeScript' },
		{ href: '/json-diff', label: 'JSON Diff' }
	]}
	faqs={[
		{ question: m.guide_json_schema_faq_q1(), answer: m.guide_json_schema_faq_a1() },
		{ question: m.guide_json_schema_faq_q2(), answer: m.guide_json_schema_faq_a2() },
		{ question: m.guide_json_schema_faq_q3(), answer: m.guide_json_schema_faq_a3() },
		{ question: m.guide_json_schema_faq_q4(), answer: m.guide_json_schema_faq_a4() }
	]}
/>
