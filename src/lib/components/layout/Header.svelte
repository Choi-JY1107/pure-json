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
			<button
				class="header__icon-btn header__menu-btn"
				onclick={onMenuToggle}
				aria-label="Toggle menu"
			>
				<span class="material-symbols-outlined">menu</span>
			</button>
		{/if}

		<a href="/" class="header__logo" aria-label="PureJSON home">
			<span class="header__mark">&#123; &#125;</span>
			<span class="header__wordmark">pure<span class="header__wordmark-accent">json</span></span>
		</a>

		<nav class="header__nav">
			<a href="/guides" class="header__nav-link">{m.sidebar_group_guides()}</a>
			<a href="/about" class="header__nav-link">About</a>
		</nav>
	</div>

	<div class="header__right">
		<span class="header__badge">
			<span class="header__badge-dot"></span>
			100% local
		</span>
		<div class="header__divider"></div>
		<LocaleSwitcher />
		<ThemeToggle />
	</div>
</header>

<style>
	@reference "../../../app.css";

	.header {
		@apply sticky top-0 z-30 flex items-center justify-between
		       px-4 md:px-6 h-16;
		background: color-mix(in srgb, var(--md-surface) 78%, transparent);
		backdrop-filter: blur(16px) saturate(1.3);
		border-bottom: 1px solid color-mix(in srgb, var(--md-outline-variant) 60%, transparent);
	}
	.header__left {
		@apply flex items-center gap-6 md:gap-8;
	}

	/* Logo: brace mark + filename-style wordmark */
	.header__logo {
		@apply flex items-center gap-2.5 no-underline;
	}
	.header__mark {
		@apply flex items-center justify-center w-8 h-8 rounded-lg
		       font-mono text-sm font-semibold;
		color: var(--md-primary);
		background: var(--md-primary-container);
		letter-spacing: -0.05em;
	}
	.header__wordmark {
		@apply font-headline text-xl font-bold tracking-tight;
		color: var(--md-on-surface);
	}
	.header__wordmark-accent {
		color: var(--md-primary);
	}

	.header__nav {
		@apply hidden md:flex items-center gap-6 text-sm font-medium;
	}
	.header__nav-link {
		@apply text-on-surface-variant hover:text-on-surface transition-colors duration-200 no-underline;
	}

	.header__right {
		@apply flex items-center gap-2;
	}

	/* Trust badge — the differentiator, surfaced */
	.header__badge {
		@apply hidden sm:inline-flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-full
		       font-mono text-[0.6875rem] font-medium;
		color: var(--md-tertiary);
		background: color-mix(in srgb, var(--md-tertiary) 12%, transparent);
	}
	.header__badge-dot {
		@apply w-1.5 h-1.5 rounded-full;
		background: var(--md-tertiary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--md-tertiary) 25%, transparent);
	}

	.header__divider {
		@apply hidden md:block border-l h-5 mx-1;
		border-color: var(--md-outline-variant);
	}
	.header__icon-btn {
		@apply p-2 text-on-surface-variant hover:text-on-surface transition-colors rounded-lg
		       hover:bg-surface-container;
	}
	@media (width >= 64rem) {
		.header__menu-btn {
			display: none;
		}
	}
</style>
