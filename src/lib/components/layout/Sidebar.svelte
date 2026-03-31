<script lang="ts">
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages.js';

	const tools = $derived([
		{ href: '/', icon: 'visibility', label: m.sidebar_viewer() },
		{ href: '/json-formatter', icon: 'format_align_left', label: m.sidebar_formatter() },
		{ href: '/json-minifier', icon: 'compress', label: m.sidebar_minifier() },
		{ href: '/json-sorter', icon: 'sort', label: m.sidebar_sorter() },
		{ href: '/json-diff', icon: 'difference', label: m.sidebar_diff() }
	]);

	const fromJson = $derived([
		{ href: '/json-to-typescript', icon: 'code', label: m.sidebar_to_typescript() },
		{ href: '/json-to-yaml', icon: 'description', label: m.sidebar_to_yaml() },
		{ href: '/json-to-csv', icon: 'table_chart', label: m.sidebar_to_csv() },
		{ href: '/json-to-xml', icon: 'terminal', label: m.sidebar_to_xml() }
	]);

	const toJson = $derived([
		{ href: '/csv-to-json', icon: 'upload_file', label: m.sidebar_csv_to_json() }
	]);

	const guides = $derived([
		{ href: '/guides/what-is-json', icon: 'menu_book', label: m.sidebar_guide_what_is_json() },
		{ href: '/guides/json-vs-yaml-xml', icon: 'compare_arrows', label: m.sidebar_guide_vs_formats() },
		{ href: '/guides/json-syntax-errors', icon: 'bug_report', label: m.sidebar_guide_syntax_errors() },
		{ href: '/guides/json-rest-api', icon: 'cloud', label: m.sidebar_guide_rest_api() },
		{ href: '/guides/json-schema', icon: 'verified', label: m.sidebar_guide_schema() },
		{ href: '/guides/large-json-files', icon: 'inventory_2', label: m.sidebar_guide_large_files() }
	]);
</script>

<div class="sidebar">
	<!-- Logo -->
	<div class="sidebar__logo">
		<div class="sidebar__logo-icon">
			<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1; font-size: 1rem;">architecture</span>
		</div>
		<div>
			<h2 class="sidebar__logo-title">{m.site_name()}</h2>
		</div>
	</div>

	<!-- Navigation -->
	<nav class="sidebar__nav">
		<div class="sidebar__group-title">{m.sidebar_group_tools()}</div>
		{#each tools as tool (tool.href)}
			{@const isActive = page.url?.pathname === tool.href}
			<a
				href={tool.href}
				class="sidebar__item"
				class:sidebar__item--active={isActive}
			>
				<span class="material-symbols-outlined sidebar__icon">{tool.icon}</span>
				<span>{tool.label}</span>
			</a>
		{/each}

		<div class="sidebar__divider"></div>
		<div class="sidebar__group-title">{m.sidebar_group_from_json()}</div>
		{#each fromJson as tool (tool.href)}
			{@const isActive = page.url?.pathname === tool.href}
			<a
				href={tool.href}
				class="sidebar__item"
				class:sidebar__item--active={isActive}
			>
				<span class="material-symbols-outlined sidebar__icon">{tool.icon}</span>
				<span>{tool.label}</span>
			</a>
		{/each}

		<div class="sidebar__divider"></div>
		<div class="sidebar__group-title">{m.sidebar_group_to_json()}</div>
		{#each toJson as tool (tool.href)}
			{@const isActive = page.url?.pathname === tool.href}
			<a
				href={tool.href}
				class="sidebar__item"
				class:sidebar__item--active={isActive}
			>
				<span class="material-symbols-outlined sidebar__icon">{tool.icon}</span>
				<span>{tool.label}</span>
			</a>
		{/each}

		<div class="sidebar__divider"></div>
		<div class="sidebar__group-title">{m.sidebar_group_guides()}</div>
		{#each guides as guide (guide.href)}
			{@const isActive = page.url?.pathname === guide.href}
			<a
				href={guide.href}
				class="sidebar__item"
				class:sidebar__item--active={isActive}
			>
				<span class="material-symbols-outlined sidebar__icon">{guide.icon}</span>
				<span>{guide.label}</span>
			</a>
		{/each}
	</nav>

	<!-- Privacy footer -->
	<div class="sidebar__privacy">
		<span class="material-symbols-outlined" style="font-size: 0.875rem;">lock</span>
		{m.sidebar_privacy()}<br />
		{m.sidebar_privacy_detail()}
	</div>
</div>

<style>
	@reference "../../../app.css";

	.sidebar {
		@apply w-64 h-full py-8 flex flex-col
		       bg-surface-container-low border-r border-outline-variant/15;
	}

	/* Logo */
	.sidebar__logo {
		@apply px-6 mb-8 flex items-center gap-3;
	}
	.sidebar__logo-icon {
		@apply w-8 h-8 rounded-lg flex items-center justify-center
		       bg-linear-to-br from-primary to-primary-container text-on-primary;
	}
	.sidebar__logo-title {
		@apply text-lg font-headline text-on-surface leading-tight;
	}

	/* Navigation */
	.sidebar__nav {
		@apply flex-1 flex flex-col overflow-y-auto;
	}
	.sidebar__group-title {
		@apply text-[0.625rem] font-semibold text-secondary
		       uppercase tracking-widest px-4 mb-1 mt-2;
	}
	.sidebar__item {
		@apply flex items-center gap-3 pl-4 py-2
		       text-secondary text-[0.6875rem] font-medium uppercase tracking-widest
		       no-underline transition-all duration-300
		       hover:text-on-surface hover:bg-surface-container/50;
	}
	.sidebar__item--active {
		@apply text-primary border-l-2 border-primary translate-x-0.5;
	}
	.sidebar__icon {
		font-size: 1.125rem;
	}

	/* Divider */
	.sidebar__divider {
		@apply border-t border-outline-variant/15 my-2 mx-4;
	}

	/* Privacy footer */
	.sidebar__privacy {
		@apply mt-auto mx-4 p-3 rounded-lg
		       border border-outline-variant/15
		       text-[0.625rem] text-secondary leading-relaxed
		       flex flex-col gap-1;
	}
</style>
