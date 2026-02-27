<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { MetaTags, JsonLd } from 'svelte-meta-tags';
	import { onMount } from 'svelte';
	import { BASE_URL, ADSENSE_CLIENT } from '$lib/config/site';
	import { locale } from '$lib/stores/locale.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import AdSlot from '$lib/components/layout/AdSlot.svelte';

	let { children } = $props();

	onMount(() => {
		if ('serviceWorker' in navigator) {
			// PWA registration handled by @vite-pwa/sveltekit
		}
	});

	let drawerOpen = $state(false);
</script>

<MetaTags
	titleTemplate="%s | PureJSON"
	openGraph={{
		type: 'website',
		siteName: 'PureJSON',
		url: BASE_URL + (page.url?.pathname ?? '/')
	}}
	twitter={{
		cardType: 'summary_large_image'
	}}
/>

<JsonLd
	schema={{
		'@type': 'WebApplication',
		name: 'PureJSON',
		description: 'Free online JSON viewer, formatter, validator. No server, no data leak.',
		url: BASE_URL,
		applicationCategory: 'DeveloperApplication',
		operatingSystem: 'Any',
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD'
		}
	}}
/>

<div class="app-layout drawer lg:drawer-open">
	<input id="sidebar-drawer" type="checkbox" class="drawer-toggle" bind:checked={drawerOpen} />

	<div class="app-layout__content drawer-content">
		<div class="app-layout__ad-top">
			<AdSlot client={ADSENSE_CLIENT} slot="top-banner" height="90px" />
		</div>

		<Header />

		<main class="app-layout__main">
			{#key locale.current}
				{@render children()}
			{/key}
		</main>

		<div class="app-layout__ad-bottom">
			<AdSlot client={ADSENSE_CLIENT} slot="bottom-banner" height="90px" />
		</div>

		<Footer />
	</div>

	<div class="app-layout__sidebar drawer-side">
		<label for="sidebar-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
		<Sidebar />
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
	@reference "../app.css";

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
