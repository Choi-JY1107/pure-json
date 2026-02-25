<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { MetaTags, JsonLd } from 'svelte-meta-tags';
	import { onMount } from 'svelte';
	import { BASE_URL } from '$lib/config/site';

	let { children } = $props();

	onMount(() => {
		if ('serviceWorker' in navigator) {
			// PWA registration handled by @vite-pwa/sveltekit
		}
	});
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

{@render children()}
