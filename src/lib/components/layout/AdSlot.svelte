<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let {
		client = '',
		slot = 'default',
		format = 'auto',
		responsive = true,
		width = '100%',
		height = '90px'
	}: {
		client?: string;
		slot?: string;
		format?: string;
		responsive?: boolean;
		width?: string;
		height?: string;
	} = $props();

	let adRef: HTMLElement | undefined = $state();

	onMount(() => {
		if (!client || !browser) return;
		try {
			const win = window as Window & { adsbygoogle?: Record<string, unknown>[] };
			(win.adsbygoogle = win.adsbygoogle || []).push({});
		} catch {
			// AdSense not loaded yet — silently ignore
		}
	});
</script>

{#if client}
	<div class="ad-slot" style="width: {width}; min-height: {height};">
		<ins
			bind:this={adRef}
			class="adsbygoogle ad-slot__ins"
			style="display:block;"
			data-ad-client={client}
			data-ad-slot={slot}
			data-ad-format={format}
			data-full-width-responsive={responsive ? 'true' : 'false'}
		></ins>
	</div>
{:else}
	<div
		class="ad-slot ad-slot--placeholder"
		style="width: {width}; min-height: {height};"
		data-ad-slot={slot}
		data-ad-format={format}
	>
		<span class="ad-slot__label">Ad</span>
	</div>
{/if}

<style>
	@reference "../../../app.css";

	.ad-slot {
		@apply flex items-center justify-center overflow-hidden rounded-xl;
		background: var(--md-surface-container-low);
		border: 1px solid color-mix(in srgb, var(--md-outline-variant) 40%, transparent);
	}
	.ad-slot__ins {
		@apply w-full;
		background: transparent;
	}
	.ad-slot__label {
		@apply font-mono text-[0.625rem] uppercase tracking-widest;
		color: var(--md-on-surface-variant);
		opacity: 0.5;
	}
</style>
