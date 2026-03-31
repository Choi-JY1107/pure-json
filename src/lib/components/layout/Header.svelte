<script lang="ts">
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
	import LocaleSwitcher from '$lib/components/ui/LocaleSwitcher.svelte';
	import * as m from '$lib/paraglide/messages.js';
</script>

<header class="header">
	<div class="header__brand">
		<a href="/" class="header__logo">
			<span class="header__logo-icon">{'{ }'}</span> {m.site_name()}
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
		@apply flex items-center bg-surface border-b border-surface-container px-4 h-14;
	}
	.header__brand {
		@apply flex-1;
	}
	.header__logo {
		@apply text-xl font-bold text-primary;
	}
	.header__logo-icon {
		@apply text-2xl;
	}
	.header__actions {
		@apply flex-none flex items-center gap-2;
	}
</style>
