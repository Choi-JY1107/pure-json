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

	const groups = $derived([
		{ title: m.sidebar_group_tools(), items: tools },
		{ title: m.sidebar_group_from_json(), items: fromJson },
		{ title: m.sidebar_group_to_json(), items: toJson },
		{ title: m.sidebar_group_guides(), items: guides }
	]);
</script>

<div class="sidebar">
	<!-- Logo -->
	<a href="/" class="sidebar__logo" aria-label="PureJSON home">
		<span class="sidebar__mark">&#123; &#125;</span>
		<span class="sidebar__wordmark">pure<span class="sidebar__wordmark-accent">json</span></span>
	</a>

	<!-- Navigation -->
	<nav class="sidebar__nav">
		{#each groups as group, gi (gi)}
			<div class="sidebar__group-title">{group.title}</div>
			{#each group.items as item (item.href)}
				{@const isActive = page.url?.pathname === item.href}
				<a href={item.href} class="sidebar__item" class:sidebar__item--active={isActive}>
					<span class="material-symbols-outlined sidebar__icon">{item.icon}</span>
					<span class="sidebar__label">{item.label}</span>
				</a>
			{/each}
		{/each}
	</nav>

	<!-- Privacy trust card -->
	<div class="sidebar__privacy">
		<div class="sidebar__privacy-head">
			<span class="material-symbols-outlined sidebar__privacy-icon" style="font-variation-settings: 'FILL' 1;">shield_lock</span>
			<span class="sidebar__privacy-title">{m.sidebar_privacy()}</span>
		</div>
		<p class="sidebar__privacy-detail">{m.sidebar_privacy_detail()}</p>
	</div>
</div>

<style>
	@reference "../../../app.css";

	.sidebar {
		@apply w-64 h-full py-6 flex flex-col overflow-x-hidden;
		background: var(--md-surface-container-low);
		border-right: 1px solid color-mix(in srgb, var(--md-outline-variant) 55%, transparent);
	}

	/* Logo */
	.sidebar__logo {
		@apply px-5 mb-6 flex items-center gap-2.5 no-underline;
	}
	.sidebar__mark {
		@apply flex items-center justify-center w-8 h-8 rounded-lg
		       font-mono text-sm font-semibold;
		color: var(--md-primary);
		background: var(--md-primary-container);
		letter-spacing: -0.05em;
	}
	.sidebar__wordmark {
		@apply font-headline text-lg font-bold tracking-tight;
		color: var(--md-on-surface);
	}
	.sidebar__wordmark-accent {
		color: var(--md-primary);
	}

	/* Navigation */
	.sidebar__nav {
		@apply flex-1 flex flex-col gap-0.5 overflow-y-auto overflow-x-hidden px-3;
	}

	/* Group title styled like a JSON key: "tools": */
	.sidebar__group-title {
		@apply font-mono text-[0.625rem] font-semibold px-2 mb-1 mt-5 first:mt-0;
		color: var(--md-primary);
		letter-spacing: 0.02em;
	}
	.sidebar__group-title::before {
		content: '"';
		opacity: 0.5;
	}
	.sidebar__group-title::after {
		content: '":';
		opacity: 0.5;
	}

	.sidebar__item {
		@apply flex items-center gap-3 px-2.5 py-2 rounded-lg
		       text-[0.8125rem] font-medium no-underline
		       transition-colors duration-150;
		color: var(--md-on-surface-variant);
	}
	.sidebar__item:hover {
		color: var(--md-on-surface);
		background: color-mix(in srgb, var(--md-on-surface) 5%, transparent);
	}
	.sidebar__item--active {
		color: var(--md-primary);
		background: var(--md-primary-container);
		font-weight: 600;
	}
	.sidebar__item--active:hover {
		color: var(--md-primary);
		background: var(--md-primary-container);
	}
	.sidebar__label {
		@apply truncate;
	}
	.sidebar__icon {
		font-size: 1.125rem;
		flex-shrink: 0;
	}

	/* Privacy trust card */
	.sidebar__privacy {
		@apply mt-5 mx-3 p-3 rounded-xl flex flex-col gap-1.5;
		background: color-mix(in srgb, var(--md-tertiary) 10%, transparent);
		border: 1px solid color-mix(in srgb, var(--md-tertiary) 25%, transparent);
	}
	.sidebar__privacy-head {
		@apply flex items-center gap-1.5;
	}
	.sidebar__privacy-icon {
		font-size: 1rem;
		color: var(--md-tertiary);
	}
	.sidebar__privacy-title {
		@apply text-xs font-semibold;
		color: var(--md-tertiary);
	}
	.sidebar__privacy-detail {
		@apply text-[0.6875rem] leading-relaxed m-0;
		color: var(--md-on-surface-variant);
	}
</style>
