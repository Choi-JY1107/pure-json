<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { MetaTags, JsonLd } from 'svelte-meta-tags';
	import { onMount } from 'svelte';
	import { BASE_URL, ADSENSE_CLIENT, ADSENSE_SLOT } from '$lib/config/site';
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

<div class="app-layout">
	<div class="app-layout__content">
		{#key locale.current}
			<Header />

			<main class="app-layout__main">
				{@render children()}
			</main>

			<div class="app-layout__ad-bottom">
				<AdSlot client={ADSENSE_CLIENT} slot={ADSENSE_SLOT} height="90px" />
			</div>

			<Footer />
		{/key}
	</div>

	{#if drawerOpen}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="app-layout__overlay"
			onclick={() => (drawerOpen = false)}
			onkeydown={(e) => e.key === 'Escape' && (drawerOpen = false)}
		></div>
	{/if}

	<div class="app-layout__sidebar" class:app-layout__sidebar--open={drawerOpen}>
		{#key locale.current}
			<Sidebar />
		{/key}
	</div>
</div>

<button
	class="app-layout__mobile-btn"
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
		@apply min-h-screen flex;
	}
	.app-layout__content {
		@apply flex flex-col flex-1;
	}
	.app-layout__main {
		@apply flex-1 p-4 md:p-6;
	}
	.app-layout__ad-bottom {
		@apply px-4 pb-2;
	}
	.app-layout__overlay {
		@apply fixed inset-0 z-30 bg-black/50 lg:hidden;
	}
	.app-layout__sidebar {
		@apply fixed inset-y-0 left-0 z-40 -translate-x-full transition-transform duration-200
		       lg:static lg:translate-x-0;
	}
	.app-layout__sidebar--open {
		@apply translate-x-0;
	}
	.app-layout__mobile-btn {
		@apply fixed bottom-4 right-4
		       z-50 lg:hidden inline-flex items-center justify-center
		       w-12 h-12 rounded-full bg-primary text-on-primary shadow-lg
		       transition-colors;
	}
	.app-layout__mobile-icon {
		@apply w-6 h-6;
	}
</style>
