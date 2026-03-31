<script lang="ts">
	import { LOCALES, LOCALE_META, type Locale } from '$lib/config/site';
	import { locale } from '$lib/stores/locale.svelte';

	const locales = LOCALES.map((code) => ({ code, label: LOCALE_META[code].label }));
</script>

<div class="locale-switcher">
	<button class="locale-switcher__trigger inline-flex items-center justify-center font-medium transition-colors px-3 py-1.5 text-sm rounded-lg bg-transparent hover:bg-surface-container"
		onclick={(e) => {
			const menu = (e.currentTarget as HTMLElement).nextElementSibling;
			menu?.classList.toggle('hidden');
		}}
	>
		<svg class="locale-switcher__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
			/>
		</svg>
		{locales.find((l) => l.code === locale.current)?.label ?? 'EN'}
	</button>
	<ul class="locale-switcher__menu hidden">
		{#each locales as loc (loc.code)}
			<li>
				<button
					class="locale-switcher__item"
					class:locale-switcher__item--active={locale.current === loc.code}
					onclick={() => {
						locale.set(loc.code as Locale);
						const menu = document.querySelector('.locale-switcher__menu');
						menu?.classList.add('hidden');
					}}
				>
					{loc.label}
				</button>
			</li>
		{/each}
	</ul>
</div>

<style>
	@reference "../../../app.css";

	.locale-switcher {
		@apply relative;
	}
	.locale-switcher__trigger {
		@apply gap-1;
	}
	.locale-switcher__icon {
		@apply w-4 h-4;
	}
	.locale-switcher__menu {
		@apply absolute right-0 top-full mt-1 bg-surface shadow-lg z-50 w-32 p-2
		       rounded-lg border border-surface-container list-none;
	}
	.locale-switcher__item {
		@apply block w-full text-left px-3 py-1.5 text-sm rounded-lg
		       hover:bg-surface-container transition-colors;
	}
	.locale-switcher__item--active {
		@apply bg-primary text-on-primary;
	}
</style>
