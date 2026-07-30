<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { MetaTags, JsonLd } from 'svelte-meta-tags';
	import { onMount } from 'svelte';
	import { BASE_URL, ADSENSE_CLIENT, ADSENSE_SLOT, AUTHOR, GITHUB_URL } from '$lib/config/site';
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

	let sidebarOpen = $state(false);

	function closeSidebar() {
		sidebarOpen = false;
	}

	// trailingSlash is 'never', so pathname is already the canonical form.
	let canonicalUrl = $derived(BASE_URL + (page.url?.pathname ?? '/'));
</script>

<MetaTags
	titleTemplate="%s | PureJSON"
	canonical={canonicalUrl}
	openGraph={{
		type: 'website',
		siteName: 'PureJSON',
		url: canonicalUrl
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
		},
		author: {
			'@type': 'Person',
			name: AUTHOR.name,
			url: AUTHOR.url
		},
		publisher: {
			'@type': 'Person',
			name: AUTHOR.name,
			url: AUTHOR.url
		},
		codeRepository: GITHUB_URL,
		isAccessibleForFree: true
	}}
/>

<!-- Mobile overlay -->
{#if sidebarOpen}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="layout__overlay"
		onclick={closeSidebar}
		onkeydown={(e) => e.key === 'Escape' && closeSidebar()}
	></div>
{/if}

<!-- Sidebar -->
<aside class="layout__sidebar" class:layout__sidebar--open={sidebarOpen}>
	{#key locale.current}
		<Sidebar />
	{/key}
</aside>

<!-- Main wrapper (offset by sidebar on desktop) -->
<div class="layout__main-wrapper">
	{#key locale.current}
		<Header onMenuToggle={() => (sidebarOpen = !sidebarOpen)} />

		<main class="layout__main">
			{@render children()}
		</main>
	{/key}

	<!--
		Deliberately outside {#key locale.current}: remounting the <ins> element pushes a
		second ad request into a slot that already holds one, which AdSense rejects with
		"All 'ins' elements in the DOM with class=adsbygoogle already have ads in them".
	-->
	<div class="layout__ad-bottom">
		<AdSlot client={ADSENSE_CLIENT} slot={ADSENSE_SLOT} height="90px" />
	</div>

	{#key locale.current}
		<Footer />
	{/key}
</div>

<style>
	@reference "../app.css";

	/* Sidebar: fixed left, hidden on mobile */
	.layout__sidebar {
		@apply fixed inset-y-0 left-0 z-40
		       w-64 -translate-x-full
		       transition-transform duration-200 ease-out;
	}
	@media (width >= 64rem) {
		.layout__sidebar {
			translate: 0;
		}
	}
	.layout__sidebar--open {
		translate: 0;
	}

	/* Mobile overlay */
	.layout__overlay {
		@apply fixed inset-0 z-30 bg-black/50;
	}
	@media (width >= 64rem) {
		.layout__overlay {
			display: none;
		}
	}

	/* Main content area: offset by sidebar on desktop */
	.layout__main-wrapper {
		@apply flex flex-col min-h-screen;
	}
	@media (width >= 64rem) {
		.layout__main-wrapper {
			padding-left: 16rem; /* w-64 = 16rem */
		}
	}

	.layout__main {
		@apply flex-1 p-4 md:p-6;
	}
	.layout__ad-bottom {
		@apply px-4 pb-2;
	}
</style>
