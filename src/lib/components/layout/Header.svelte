<script lang="ts">
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
	import LocaleSwitcher from '$lib/components/ui/LocaleSwitcher.svelte';
	import * as m from '$lib/paraglide/messages.js';

	let { onMenuToggle }: { onMenuToggle?: () => void } = $props();
</script>

<header class="header">
	<!-- Mobile menu button -->
	{#if onMenuToggle}
		<button class="header__menu-btn" onclick={onMenuToggle} aria-label="Toggle menu">
			<span class="material-symbols-outlined">menu</span>
		</button>
	{/if}

	<div class="header__brand">
		<a href="/" class="header__logo">
			{m.site_name()}
		</a>
	</div>
	<div class="header__actions">
		<LocaleSwitcher />
		<ThemeToggle />
	</div>
</header>

<style>
	@reference "../../../app.css";

	.header {
		@apply sticky top-0 z-30 flex items-center justify-between
		       bg-surface border-b border-outline-variant/15
		       px-6 h-16 font-headline text-sm tracking-tight;
	}
	.header__menu-btn {
		@apply p-2 text-secondary hover:text-on-surface transition-colors rounded-lg
		       hover:bg-surface-container;
	}
	@media (width >= 64rem) {
		.header__menu-btn {
			display: none;
		}
	}
	.header__brand {
		@apply flex-1;
	}
	.header__logo {
		@apply text-xl font-bold tracking-tighter text-primary no-underline;
	}
	.header__actions {
		@apply flex-none flex items-center gap-2;
	}
</style>
