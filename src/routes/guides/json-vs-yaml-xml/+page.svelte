<script lang="ts">
	import GuidePage from '$lib/components/guide/GuidePage.svelte';
	import * as m from '$lib/paraglide/messages.js';
</script>

<GuidePage
	metaTitle={m.guide_json_vs_yaml_xml_title()}
	metaDescription={m.guide_json_vs_yaml_xml_description()}
	title={m.guide_json_vs_yaml_xml_h1()}
	intro={m.guide_json_vs_yaml_xml_intro()}
	sections={[
		{
			title: m.guide_json_vs_yaml_xml_s1_title(),
			paragraphs: [m.guide_json_vs_yaml_xml_s1_p1()],
			list: [
				m.guide_json_vs_yaml_xml_s1_li1(),
				m.guide_json_vs_yaml_xml_s1_li2(),
				m.guide_json_vs_yaml_xml_s1_li3()
			]
		},
		{
			title: m.guide_json_vs_yaml_xml_s2_title(),
			paragraphs: [m.guide_json_vs_yaml_xml_s2_p1(), m.guide_json_vs_yaml_xml_s2_p2()],
			codeExample: '{\n  "database": {\n    "host": "localhost",\n    "port": 5432,\n    "name": "myapp"\n  }\n}'
		},
		{
			title: m.guide_json_vs_yaml_xml_s3_title(),
			paragraphs: [m.guide_json_vs_yaml_xml_s3_p1(), m.guide_json_vs_yaml_xml_s3_p2()],
			codeExample: '# Database configuration\ndatabase:\n  host: localhost\n  port: 5432\n  name: myapp'
		},
		{
			title: m.guide_json_vs_yaml_xml_s4_title(),
			paragraphs: [m.guide_json_vs_yaml_xml_s4_p1(), m.guide_json_vs_yaml_xml_s4_p2()],
			codeExample: '<?xml version="1.0" encoding="UTF-8"?>\n<database>\n  <host>localhost</host>\n  <port>5432</port>\n  <name>myapp</name>\n</database>'
		},
		{
			title: m.guide_json_vs_yaml_xml_s5_title(),
			paragraphs: [m.guide_json_vs_yaml_xml_s5_p1()],
			list: [
				m.guide_json_vs_yaml_xml_s5_li1(),
				m.guide_json_vs_yaml_xml_s5_li2(),
				m.guide_json_vs_yaml_xml_s5_li3()
			]
		},
		{
			title: m.guide_json_vs_yaml_xml_s6_title(),
			paragraphs: [
				m.guide_json_vs_yaml_xml_s6_p1(),
				m.guide_json_vs_yaml_xml_s6_p2(),
				m.guide_json_vs_yaml_xml_s6_p3()
			]
		}
	]}
	relatedTools={[
		{ href: '/json-to-yaml', label: 'JSON → YAML' },
		{ href: '/json-to-xml', label: 'JSON → XML' }
	]}
	faqs={[
		{ question: m.guide_json_vs_yaml_xml_faq_q1(), answer: m.guide_json_vs_yaml_xml_faq_a1() },
		{ question: m.guide_json_vs_yaml_xml_faq_q2(), answer: m.guide_json_vs_yaml_xml_faq_a2() },
		{ question: m.guide_json_vs_yaml_xml_faq_q3(), answer: m.guide_json_vs_yaml_xml_faq_a3() },
		{ question: m.guide_json_vs_yaml_xml_faq_q4(), answer: m.guide_json_vs_yaml_xml_faq_a4() }
	]}
/>
