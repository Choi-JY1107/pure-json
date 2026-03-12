<script lang="ts">
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages.js';

	const tools = $derived([
		{ href: '/', icon: '👁', label: m.sidebar_viewer() },
		{ href: '/json-formatter', icon: '✨', label: m.sidebar_formatter() },
		{ href: '/json-minifier', icon: '📦', label: m.sidebar_minifier() },
		{ href: '/json-sorter', icon: '🔤', label: m.sidebar_sorter() },
		{ href: '/json-diff', icon: '🔀', label: m.sidebar_diff() }
	]);

	const fromJson = $derived([
		{ href: '/json-to-typescript', icon: 'TS', label: m.sidebar_to_typescript() },
		{ href: '/json-to-yaml', icon: '📄', label: m.sidebar_to_yaml() },
		{ href: '/json-to-csv', icon: '📊', label: m.sidebar_to_csv() },
		{ href: '/json-to-xml', icon: '📝', label: m.sidebar_to_xml() }
	]);

	const toJson = $derived([
		{ href: '/csv-to-json', icon: '📋', label: m.sidebar_csv_to_json() }
	]);
</script>

<aside class="sidebar">
	<nav>
		<div class="sidebar__group-title">
			{m.sidebar_group_tools()}
		</div>
		<ul class="sidebar__menu menu menu-sm">
			{#each tools as tool (tool.href)}
				{@const isActive = page.url?.pathname === tool.href}
				<li>
					<a
						href={tool.href}
						class="sidebar__item"
						class:sidebar__item--active={isActive}
					>
						<span class="sidebar__icon">{tool.icon}</span>
						{tool.label}
					</a>
				</li>
			{/each}
		</ul>

		<div class="sidebar__divider"></div>

		<div class="sidebar__group-title sidebar__group-title--sub">
			{m.sidebar_group_from_json()}
		</div>
		<ul class="sidebar__menu menu menu-sm">
			{#each fromJson as tool (tool.href)}
				{@const isActive = page.url?.pathname === tool.href}
				<li>
					<a
						href={tool.href}
						class="sidebar__item"
						class:sidebar__item--active={isActive}
					>
						<span class="sidebar__icon">{tool.icon}</span>
						{tool.label}
					</a>
				</li>
			{/each}
		</ul>

		<div class="sidebar__divider"></div>

		<div class="sidebar__group-title sidebar__group-title--sub">
			{m.sidebar_group_to_json()}
		</div>
		<ul class="sidebar__menu menu menu-sm">
			{#each toJson as tool (tool.href)}
				{@const isActive = page.url?.pathname === tool.href}
				<li>
					<a
						href={tool.href}
						class="sidebar__item"
						class:sidebar__item--active={isActive}
					>
						<span class="sidebar__icon">{tool.icon}</span>
						{tool.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>

	<div class="sidebar__privacy">
		<p>
			🔒 {m.sidebar_privacy()}<br />
			{m.sidebar_privacy_detail()}
		</p>
	</div>
</aside>

<style>
	@reference "../../../app.css";

	.sidebar {
		@apply w-56 bg-base-200 border-r border-base-300 p-4 hidden min-h-screen;

		@media (width >= 64rem) {
			display: flex;
			flex-direction: column;
		}
	}
	.sidebar__group-title {
		@apply text-xs font-semibold text-base-content/70
		       uppercase tracking-wider px-3 mb-1;
	}
	.sidebar__group-title--sub {
		@apply mt-3;
	}
	.sidebar__item--active {
		@apply bg-primary text-primary-content;
	}
	.sidebar__icon {
		@apply w-6 text-center;
	}
	.sidebar__divider {
		@apply border-t border-base-300 my-2;
	}
	.sidebar__privacy {
		@apply mt-auto p-3 bg-base-100 rounded-lg border border-base-300
		       text-xs text-base-content/60 leading-relaxed;
	}
</style>
