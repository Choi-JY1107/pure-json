<script lang="ts">
	import { LOCALES, LOCALE_META, type Locale } from '$lib/config/site';
	import { locale } from '$lib/stores/locale.svelte';

	const locales = LOCALES.map((code) => ({ code, label: LOCALE_META[code].label }));
</script>

<div class="locale-switcher dropdown dropdown-end">
	<div tabindex="0" role="button" class="locale-switcher__trigger btn btn-ghost btn-sm">
		<svg class="locale-switcher__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
			/>
		</svg>
		{locales.find((l) => l.code === locale.current)?.label ?? 'EN'}
	</div>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<ul tabindex="0" class="locale-switcher__menu dropdown-content menu rounded-box">
		{#each locales as loc (loc.code)}
			<li>
				<button
					class="locale-switcher__item"
					class:locale-switcher__item--active={locale.current === loc.code}
					onclick={() => {
						locale.set(loc.code as Locale);
						(document.activeElement as HTMLElement)?.blur();
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

	.locale-switcher__trigger {
		@apply gap-1;
	}
	.locale-switcher__icon {
		@apply w-4 h-4;
	}
	.locale-switcher__menu {
		@apply bg-base-100 shadow-lg z-50 w-32 p-2;
	}
	.locale-switcher__item--active {
		@apply bg-primary text-primary-content;
	}
</style>
