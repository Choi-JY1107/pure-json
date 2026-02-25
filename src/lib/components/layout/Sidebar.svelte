<script lang="ts">
	import { page } from '$app/state';
	import * as m from '$lib/paraglide/messages.js';

	let { lang = 'en' }: { lang?: string } = $props();

	const tools = $derived([
		{ path: 'json-viewer', icon: '👁', label: m.sidebar_viewer() },
		{ path: 'json-formatter', icon: '✨', label: m.sidebar_formatter() },
		{ path: 'json-minifier', icon: '📦', label: m.sidebar_minifier() }
	]);

	const converters = $derived([
		{ path: 'json-to-typescript', icon: 'TS', label: m.sidebar_to_typescript() },
		{ path: 'json-to-yaml', icon: '📄', label: m.sidebar_to_yaml() }
	]);
</script>

<aside class="sidebar">
	<nav>
		<div class="sidebar__group-title">
			{m.sidebar_group_tools()}
		</div>
		<ul class="sidebar__menu menu menu-sm">
			{#each tools as tool (tool.path)}
				{@const href = `/${lang}/${tool.path}`}
				{@const isActive = page.url?.pathname === href}
				<li>
					<a
						{href}
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

		<div class="sidebar__group-title sidebar__group-title--convert">
			{m.sidebar_group_convert()}
		</div>
		<ul class="sidebar__menu menu menu-sm">
			{#each converters as tool (tool.path)}
				{@const href = `/${lang}/${tool.path}`}
				{@const isActive = page.url?.pathname === href}
				<li>
					<a
						{href}
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
		@apply w-56 bg-base-200 border-r border-base-300 p-4 hidden lg:block;
	}
	.sidebar__group-title {
		@apply text-xs font-semibold text-base-content/70
		       uppercase tracking-wider px-3 mb-1;
	}
	.sidebar__group-title--convert {
		@apply mt-3;
	}
	.sidebar__menu {
		@apply gap-1;
	}
	.sidebar__item {
		@apply rounded-lg flex items-center gap-2;
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
		@apply mt-6 p-3 bg-base-100 rounded-lg border border-base-300
		       text-xs text-base-content/60 leading-relaxed;
	}
</style>
