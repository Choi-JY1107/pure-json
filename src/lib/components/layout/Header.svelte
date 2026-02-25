<script lang="ts">
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
	import LocaleSwitcher from '$lib/components/ui/LocaleSwitcher.svelte';
	import * as m from '$lib/paraglide/messages.js';

	let { lang = 'en' }: { lang?: string } = $props();
</script>

<header class="header navbar">
	<div class="header__brand">
		<a href="/{lang}/json-viewer" class="header__logo">
			<span class="header__logo-icon">{'{ }'}</span> {m.site_name()}
		</a>
	</div>
	<div class="header__actions">
		<LocaleSwitcher {lang} />
		<ThemeToggle />
	</div>
</header>

<style>
	@reference "../../../app.css";

	.header {
		@apply bg-base-100 border-b border-base-300 px-4;
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
