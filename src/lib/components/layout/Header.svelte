<script lang="ts">
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
	import LocaleSwitcher from '$lib/components/ui/LocaleSwitcher.svelte';
	import * as m from '$lib/paraglide/messages.js';

	let { onMenuToggle }: { onMenuToggle?: () => void } = $props();
</script>

<header class="header">
	<div class="header__left">
		<!-- Mobile menu button -->
		{#if onMenuToggle}
			<button class="header__icon-btn header__menu-btn" onclick={onMenuToggle} aria-label="Toggle menu">
				<span class="material-symbols-outlined">menu</span>
			</button>
		{/if}

		<a href="/" class="header__logo">{m.site_name()}</a>

		<nav class="header__nav">
			<a href="/guides" class="header__nav-link">{m.sidebar_group_guides()}</a>
			<a href="/about" class="header__nav-link">About</a>
		</nav>
	</div>

	<div class="header__right">
		<div class="header__divider"></div>
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
	.header__left {
		@apply flex items-center gap-8;
	}
	.header__logo {
		@apply text-xl font-bold tracking-tighter text-primary no-underline;
	}
	.header__nav {
		@apply hidden md:flex items-center gap-6;
	}
	.header__nav-link {
		@apply text-secondary hover:text-on-surface transition-colors duration-200 no-underline;
	}
	.header__right {
		@apply flex items-center gap-2;
	}
	.header__divider {
		@apply hidden md:block border-l border-outline-variant/30 h-6 mr-2;
	}
	.header__icon-btn {
		@apply p-2 text-secondary hover:text-on-surface transition-colors rounded-lg
		       hover:bg-surface-container;
	}
	@media (width >= 64rem) {
		.header__menu-btn {
			display: none;
		}
	}
</style>
