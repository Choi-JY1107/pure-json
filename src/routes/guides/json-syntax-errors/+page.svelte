<script lang="ts">
	import GuidePage from '$lib/components/guide/GuidePage.svelte';
	import * as m from '$lib/paraglide/messages.js';
</script>

<GuidePage
	metaTitle={m.guide_json_syntax_errors_title()}
	metaDescription={m.guide_json_syntax_errors_description()}
	title={m.guide_json_syntax_errors_h1()}
	intro={m.guide_json_syntax_errors_intro()}
	sections={[
		{
			title: m.guide_json_syntax_errors_s1_title(),
			paragraphs: [m.guide_json_syntax_errors_s1_p1()],
			codeExample: '// ❌ Invalid: trailing comma\n{"name": "John", "age": 30,}\n\n// ✅ Valid: no trailing comma\n{"name": "John", "age": 30}'
		},
		{
			title: m.guide_json_syntax_errors_s2_title(),
			paragraphs: [m.guide_json_syntax_errors_s2_p1()],
			codeExample: "// ❌ Invalid: single quotes\n{'name': 'John'}\n\n// ✅ Valid: double quotes\n{\"name\": \"John\"}"
		},
		{
			title: m.guide_json_syntax_errors_s3_title(),
			paragraphs: [m.guide_json_syntax_errors_s3_p1()],
			codeExample: '// ❌ Invalid: comments not allowed\n{\n  // This is a comment\n  "name": "John"\n}\n\n// ✅ Valid: no comments\n{"name": "John"}'
		},
		{
			title: m.guide_json_syntax_errors_s4_title(),
			paragraphs: [m.guide_json_syntax_errors_s4_p1()],
			codeExample: '// ❌ Invalid: unquoted key\n{name: "John"}\n\n// ✅ Valid: quoted key\n{"name": "John"}'
		},
		{
			title: m.guide_json_syntax_errors_s5_title(),
			paragraphs: [m.guide_json_syntax_errors_s5_p1()],
			codeExample: '// ❌ Invalid values\n{"value": undefined}\n{"value": NaN}\n{"value": Infinity}\n\n// ✅ Use null for missing values\n{"value": null}'
		},
		{
			title: m.guide_json_syntax_errors_s6_title(),
			paragraphs: [m.guide_json_syntax_errors_s6_p1()],
			list: [
				m.guide_json_syntax_errors_s6_li1(),
				m.guide_json_syntax_errors_s6_li2(),
				m.guide_json_syntax_errors_s6_li3(),
				m.guide_json_syntax_errors_s6_li4(),
				m.guide_json_syntax_errors_s6_li5()
			]
		},
		{
			title: m.guide_json_syntax_errors_s7_title(),
			paragraphs: [
				m.guide_json_syntax_errors_s7_p1(),
				m.guide_json_syntax_errors_s7_p2(),
				m.guide_json_syntax_errors_s7_p3()
			]
		}
	]}
	relatedTools={[
		{ href: '/json-formatter', label: 'JSON Formatter' },
		{ href: '/', label: 'JSON Viewer' }
	]}
	faqs={[
		{ question: m.guide_json_syntax_errors_faq_q1(), answer: m.guide_json_syntax_errors_faq_a1() },
		{ question: m.guide_json_syntax_errors_faq_q2(), answer: m.guide_json_syntax_errors_faq_a2() },
		{ question: m.guide_json_syntax_errors_faq_q3(), answer: m.guide_json_syntax_errors_faq_a3() },
		{ question: m.guide_json_syntax_errors_faq_q4(), answer: m.guide_json_syntax_errors_faq_a4() }
	]}
/>
