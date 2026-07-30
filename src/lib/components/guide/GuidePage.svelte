<script lang="ts">
	import { MetaTags, JsonLd } from 'svelte-meta-tags';
	import { page } from '$app/state';
	import { AUTHOR, BASE_URL, CONTENT_DATES } from '$lib/config/site';
	import { locale } from '$lib/stores/locale.svelte';
	import AuthorByline from '$lib/components/ui/AuthorByline.svelte';
	import * as m from '$lib/paraglide/messages.js';

	let {
		metaTitle,
		metaDescription,
		title,
		intro,
		sections,
		relatedTools,
		faqs = [],
		published = CONTENT_DATES.published,
		modified = CONTENT_DATES.modified
	}: {
		metaTitle: string;
		metaDescription: string;
		title: string;
		intro: string;
		published?: string;
		modified?: string;
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

<JsonLd
	schema={{
		'@type': 'Article',
		headline: title,
		description: metaDescription,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': BASE_URL + (page.url?.pathname ?? '/')
		},
		author: { '@type': 'Person', name: AUTHOR.name, url: AUTHOR.url },
		publisher: { '@type': 'Person', name: AUTHOR.name, url: AUTHOR.url },
		datePublished: published,
		dateModified: modified,
		inLanguage: locale.current
	}}
/>

{#if faqs.length > 0}
	<JsonLd
		schema={{
			'@type': 'FAQPage',
			mainEntity: faqs.map((faq) => ({
				'@type': 'Question',
				name: faq.question,
				acceptedAnswer: { '@type': 'Answer', text: faq.answer }
			}))
		}}
	/>
{/if}

<div class="guide-page">
	<a href="/guides" class="guide-page__back">
		<span class="material-symbols-outlined" style="font-size:1rem">arrow_back</span>
		{m.sidebar_group_guides()}
	</a>

	<header class="guide-page__header">
		<span class="eyebrow">"guide"</span>
		<h1 class="guide-page__title">{title}</h1>
		<AuthorByline updated={modified} />
	</header>

	<article class="guide-page__article prose prose-sm">
		<!-- eslint-disable svelte/no-at-html-tags -- i18n values are first-party, not user input -->
		<p class="guide-page__intro">{@html intro}</p>

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
			<div class="guide-page__tools not-prose">
				{#each relatedTools as tool (tool.href)}
					<a href={tool.href} class="guide-page__tool">
						<span class="material-symbols-outlined" style="font-size:1rem">bolt</span>
						{tool.label}
					</a>
				{/each}
			</div>
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
	.guide-page__back {
		@apply inline-flex items-center gap-1.5 mb-6 text-sm font-medium no-underline transition-colors;
		color: var(--md-on-surface-variant);
	}
	.guide-page__back:hover {
		color: var(--md-primary);
	}
	.guide-page__header {
		@apply mb-8 pb-6;
		border-bottom: 1px solid color-mix(in srgb, var(--md-outline-variant) 45%, transparent);
	}
	.guide-page__title {
		@apply font-headline font-extrabold tracking-tight mt-2 mb-0;
		font-size: clamp(1.9rem, 3.5vw, 2.6rem);
		line-height: 1.1;
		color: var(--md-on-surface);
	}
	.guide-page__article {
		@apply max-w-none;
	}
	.guide-page__intro {
		@apply text-lg;
		color: var(--md-on-surface-variant);
	}

	/* Related tools as pills */
	.guide-page__tools {
		@apply flex flex-wrap gap-2 mt-3;
	}
	.guide-page__tool {
		@apply inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl
		       text-sm font-semibold no-underline transition-all duration-150;
		color: var(--md-primary);
		background: var(--md-primary-container);
	}
	.guide-page__tool:hover {
		transform: translateY(-1px);
		box-shadow: 0 8px 20px -12px color-mix(in srgb, var(--md-primary) 70%, transparent);
	}
</style>
