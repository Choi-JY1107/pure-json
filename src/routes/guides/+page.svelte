<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import * as m from '$lib/paraglide/messages.js';

	const guides = $derived([
		{ href: '/guides/what-is-json', title: m.guide_what_is_json_h1(), desc: m.guide_what_is_json_card() },
		{ href: '/guides/json-vs-yaml-xml', title: m.guide_json_vs_yaml_xml_h1(), desc: m.guide_json_vs_yaml_xml_card() },
		{ href: '/guides/json-syntax-errors', title: m.guide_json_syntax_errors_h1(), desc: m.guide_json_syntax_errors_card() },
		{ href: '/guides/json-rest-api', title: m.guide_json_rest_api_h1(), desc: m.guide_json_rest_api_card() },
		{ href: '/guides/json-schema', title: m.guide_json_schema_h1(), desc: m.guide_json_schema_card() },
		{ href: '/guides/large-json-files', title: m.guide_large_json_files_h1(), desc: m.guide_large_json_files_card() }
	]);
</script>

<MetaTags title={m.guides_title()} description={m.guides_description()} />

<div class="guides-index">
	<header class="guides-index__header">
		<span class="eyebrow">"guides"</span>
		<h1 class="guides-index__title">{m.guides_h1()}</h1>
		<p class="guides-index__intro">{m.guides_intro()}</p>
	</header>

	<div class="guides-index__grid">
		{#each guides as guide (guide.href)}
			<a href={guide.href} class="guides-index__card">
				<h2 class="guides-index__card-title">{guide.title}</h2>
				<p class="guides-index__card-desc">{guide.desc}</p>
				<span class="guides-index__card-link">{m.guide_card_read_more()}</span>
			</a>
		{/each}
	</div>
</div>

<style>
	@reference "../../app.css";

	.guides-index {
		@apply max-w-4xl mx-auto;
	}
	.guides-index__header {
		@apply mb-8 pb-6;
		border-bottom: 1px solid color-mix(in srgb, var(--md-outline-variant) 45%, transparent);
	}
	.guides-index__title {
		@apply font-headline font-extrabold tracking-tight mt-2 mb-3;
		font-size: clamp(1.9rem, 3.5vw, 2.6rem);
		line-height: 1.1;
		color: var(--md-on-surface);
	}
	.guides-index__intro {
		@apply text-base md:text-lg max-w-2xl m-0;
		color: var(--md-on-surface-variant);
	}
	.guides-index__grid {
		@apply grid grid-cols-1 md:grid-cols-2 gap-3;
	}
	.guides-index__card {
		@apply flex flex-col p-5 rounded-2xl no-underline transition-all duration-150;
		background: var(--md-surface-container-lowest);
		border: 1px solid color-mix(in srgb, var(--md-outline-variant) 45%, transparent);
	}
	.guides-index__card:hover {
		border-color: color-mix(in srgb, var(--md-primary) 55%, transparent);
		transform: translateY(-2px);
		box-shadow: 0 14px 30px -18px color-mix(in srgb, var(--md-primary) 60%, transparent);
	}
	.guides-index__card-title {
		@apply font-headline text-lg font-bold m-0 mb-2 tracking-tight;
		color: var(--md-on-surface);
	}
	.guides-index__card-desc {
		@apply text-sm m-0 mb-4 flex-1 leading-relaxed;
		color: var(--md-on-surface-variant);
	}
	.guides-index__card-link {
		@apply inline-flex items-center gap-1 text-sm font-semibold;
		color: var(--md-primary);
	}
</style>
