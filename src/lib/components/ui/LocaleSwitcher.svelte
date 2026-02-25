<script lang="ts">
	import { page } from '$app/state';
	import { LOCALES, LOCALE_META } from '$lib/config/site';

	let { lang = 'en' }: { lang?: string } = $props();

	const locales = LOCALES.map((code) => ({ code, label: LOCALE_META[code].label }));

	function getLocalizedPath(targetLocale: string): string {
		const pathname = page.url?.pathname || '/';
		const segments = pathname.split('/').filter(Boolean);
		if (segments.length > 0 && (LOCALES as readonly string[]).includes(segments[0])) {
			segments[0] = targetLocale;
		}
		return '/' + segments.join('/');
	}

	function switchLocale(targetLocale: string) {
		window.location.href = getLocalizedPath(targetLocale);
	}
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
		{locales.find((l) => l.code === lang)?.label ?? 'EN'}
	</div>
	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<ul tabindex="0" class="locale-switcher__menu dropdown-content menu rounded-box">
		{#each locales as loc (loc.code)}
			<li>
				<button
					class="locale-switcher__item"
					class:locale-switcher__item--active={lang === loc.code}
					onclick={() => switchLocale(loc.code)}
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
