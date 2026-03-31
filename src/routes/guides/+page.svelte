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
	<article class="guides-index__article prose prose-sm">
		<h1>{m.guides_h1()}</h1>
		<p>{m.guides_intro()}</p>
	</article>

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
	.guides-index__article {
		@apply max-w-none mb-6;
	}
	.guides-index__grid {
		@apply grid grid-cols-1 md:grid-cols-2 gap-4;
	}
	.guides-index__card {
		@apply block p-5 bg-base-200 rounded-lg border border-base-300
		       hover:border-primary transition-colors no-underline;
	}
	.guides-index__card-title {
		@apply text-base font-bold text-base-content m-0 mb-2;
	}
	.guides-index__card-desc {
		@apply text-sm text-base-content/70 m-0 mb-3;
	}
	.guides-index__card-link {
		@apply text-sm text-primary font-medium;
	}
</style>
