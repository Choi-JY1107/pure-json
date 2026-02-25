<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import AdSlot from '$lib/components/layout/AdSlot.svelte';
	import { page } from '$app/state';
	import { LOCALES, BASE_URL } from '$lib/config/site';
	import { browser } from '$app/environment';

	let { children, data } = $props();
	const lang = $derived(data.lang);

	function getAlternatePaths(): Array<{ lang: string; href: string }> {
		const pathname = page.url?.pathname ?? '';
		return LOCALES.map((loc) => {
			const path = pathname.replace(/^\/(en|ko|ja)/, `/${loc}`);
			return { lang: loc, href: BASE_URL + path };
		});
	}

	$effect(() => {
		if (browser) {
			document.documentElement.lang = lang;
		}
	});

	let drawerOpen = $state(false);
</script>

<svelte:head>
	{#each getAlternatePaths() as alt}
		<link rel="alternate" hreflang={alt.lang} href={alt.href} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={BASE_URL + (page.url?.pathname?.replace(/^\/(en|ko|ja)/, '/en') ?? '/')} />
</svelte:head>

<div class="app-layout drawer lg:drawer-open">
	<input id="sidebar-drawer" type="checkbox" class="drawer-toggle" bind:checked={drawerOpen} />

	<div class="app-layout__content drawer-content">
		<div class="app-layout__ad-top">
			<AdSlot slot="top-banner" height="90px" />
		</div>

		<Header {lang} />

		<main class="app-layout__main">
			{@render children()}
		</main>

		<div class="app-layout__ad-bottom">
			<AdSlot slot="bottom-banner" height="90px" />
		</div>

		<Footer {lang} />
	</div>

	<div class="app-layout__sidebar drawer-side">
		<label for="sidebar-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<Sidebar {lang} />
	</div>
</div>

<button
	class="app-layout__mobile-btn btn btn-ghost btn-circle"
	onclick={() => (drawerOpen = !drawerOpen)}
	aria-label="Open menu"
>
	<svg class="app-layout__mobile-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
	</svg>
</button>

<style>
	@reference "../../app.css";

	.app-layout {
		@apply min-h-screen;
	}
	.app-layout__content {
		@apply flex flex-col;
	}
	.app-layout__ad-top {
		@apply px-4 pt-2 hidden md:block;
	}
	.app-layout__main {
		@apply flex-1 p-4 md:p-6;
	}
	.app-layout__ad-bottom {
		@apply px-4 pb-2;
	}
	.app-layout__sidebar {
		@apply z-40;
	}
	.app-layout__mobile-btn {
		@apply fixed bottom-4 right-4
		       z-50 lg:hidden bg-primary text-primary-content shadow-lg;
	}
	.app-layout__mobile-icon {
		@apply w-6 h-6;
	}
</style>
