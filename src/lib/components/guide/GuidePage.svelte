<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import * as m from '$lib/paraglide/messages.js';

	let {
		metaTitle,
		metaDescription,
		title,
		intro,
		sections,
		relatedTools,
		faqs = []
	}: {
		metaTitle: string;
		metaDescription: string;
		title: string;
		intro: string;
		sections: Array<{
			title: string;
			paragraphs: string[];
			list?: string[];
			codeExample?: string;
		}>;
		relatedTools: Array<{ href: string; label: string }>;
		faqs?: Array<{ question: string; answer: string }>;
	} = $props();
</script>

<MetaTags title={metaTitle} description={metaDescription} />

<div class="guide-page">
	<article class="guide-page__article prose prose-sm">
		<h1>{title}</h1>
		<!-- eslint-disable svelte/no-at-html-tags -- i18n values are first-party, not user input -->
		<p>{@html intro}</p>

		{#each sections as section, i (i)}
			<h2>{section.title}</h2>
			{#each section.paragraphs as paragraph, j (j)}
				<p>{@html paragraph}</p>
			{/each}
			{#if section.list && section.list.length > 0}
				<ul>
					{#each section.list as item, j (j)}
						<li>{@html item}</li>
					{/each}
				</ul>
			{/if}
			{#if section.codeExample}
				<pre><code>{section.codeExample}</code></pre>
			{/if}
		{/each}

		{#if relatedTools.length > 0}
			<h2>{m.guide_related_tools()}</h2>
			<ul>
				{#each relatedTools as tool (tool.href)}
					<li><a href={tool.href}>{tool.label}</a></li>
				{/each}
			</ul>
		{/if}

		{#if faqs.length > 0}
			<h2>{m.section_faq()}</h2>
			{#each faqs as faq, j (j)}
				<details>
					<summary><strong>{faq.question}</strong></summary>
					<p>{@html faq.answer}</p><!-- eslint-disable-line svelte/no-at-html-tags -->
				</details>
			{/each}
		{/if}
	</article>
</div>

<style>
	@reference "../../../app.css";

	.guide-page {
		@apply max-w-3xl mx-auto;
	}
	.guide-page__article {
		@apply max-w-none;
	}
</style>
