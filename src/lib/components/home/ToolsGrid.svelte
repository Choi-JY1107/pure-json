<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';

	const tools = $derived([
		{ href: '/', icon: 'visibility', label: m.sidebar_viewer(), desc: m.viewer_description() },
		{ href: '/json-formatter', icon: 'format_align_left', label: m.sidebar_formatter(), desc: m.formatter_description() },
		{ href: '/json-minifier', icon: 'compress', label: m.sidebar_minifier(), desc: m.minifier_description() },
		{ href: '/json-sorter', icon: 'sort', label: m.sidebar_sorter(), desc: m.sorter_description() },
		{ href: '/json-diff', icon: 'difference', label: m.sidebar_diff(), desc: m.diff_description() },
		{ href: '/json-to-typescript', icon: 'code', label: m.sidebar_to_typescript(), desc: m.to_typescript_description() },
		{ href: '/json-to-yaml', icon: 'description', label: m.sidebar_to_yaml(), desc: m.to_yaml_description() },
		{ href: '/json-to-csv', icon: 'table_chart', label: m.sidebar_to_csv(), desc: m.to_csv_description() },
		{ href: '/json-to-xml', icon: 'terminal', label: m.sidebar_to_xml(), desc: m.to_xml_description() },
		{ href: '/csv-to-json', icon: 'upload_file', label: m.sidebar_csv_to_json(), desc: m.csv_to_json_description() }
	]);
</script>

<section class="tools" aria-labelledby="tools-heading">
	<div class="tools__head">
		<span class="eyebrow">"tools"</span>
		<h2 id="tools-heading" class="tools__title">{m.home_tools_title()}</h2>
		<p class="tools__subtitle">{m.home_tools_subtitle()}</p>
	</div>

	<div class="tools__grid">
		{#each tools as tool (tool.href + tool.label)}
			<a href={tool.href} class="tools__card">
				<span class="tools__card-icon">
					<span class="material-symbols-outlined">{tool.icon}</span>
				</span>
				<span class="tools__card-body">
					<span class="tools__card-title">
						{tool.label}
						<span class="material-symbols-outlined tools__card-arrow">arrow_outward</span>
					</span>
					<span class="tools__card-desc">{tool.desc}</span>
				</span>
			</a>
		{/each}
	</div>
</section>

<style>
	@reference "../../../app.css";

	.tools {
		@apply mt-10 pt-8;
		border-top: 1px solid color-mix(in srgb, var(--md-outline-variant) 45%, transparent);
	}
	.tools__head {
		@apply mb-6;
	}
	.tools__title {
		@apply font-headline text-2xl md:text-3xl font-bold tracking-tight mt-2 mb-2;
		color: var(--md-on-surface);
	}
	.tools__subtitle {
		@apply text-sm md:text-base max-w-2xl m-0;
		color: var(--md-on-surface-variant);
		white-space: pre-line;
	}

	.tools__grid {
		@apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3;
	}
	.tools__card {
		@apply flex items-start gap-3.5 p-4 rounded-2xl no-underline transition-all duration-150;
		background: var(--md-surface-container-lowest);
		border: 1px solid color-mix(in srgb, var(--md-outline-variant) 45%, transparent);
	}
	.tools__card:hover {
		border-color: color-mix(in srgb, var(--md-primary) 55%, transparent);
		background: var(--md-surface-container-low);
		transform: translateY(-2px);
		box-shadow: 0 14px 30px -18px color-mix(in srgb, var(--md-primary) 60%, transparent);
	}
	.tools__card-icon {
		@apply flex items-center justify-center w-10 h-10 rounded-xl shrink-0;
		color: var(--md-primary);
		background: var(--md-primary-container);
	}
	.tools__card-icon .material-symbols-outlined {
		font-size: 1.25rem;
	}
	.tools__card-body {
		@apply flex flex-col gap-1 min-w-0;
	}
	.tools__card-title {
		@apply flex items-center gap-1 font-semibold text-[0.9375rem];
		color: var(--md-on-surface);
	}
	.tools__card-arrow {
		font-size: 0.9375rem;
		color: var(--md-on-surface-variant);
		opacity: 0;
		transform: translate(-2px, 2px);
		transition: all 0.15s ease;
	}
	.tools__card:hover .tools__card-arrow {
		opacity: 1;
		transform: translate(0, 0);
		color: var(--md-primary);
	}
	.tools__card-desc {
		@apply text-[0.8125rem] leading-snug;
		color: var(--md-on-surface-variant);
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
