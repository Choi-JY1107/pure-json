<script lang="ts">
	import { LOCALES, LOCALE_META, type Locale } from '$lib/config/site';
	import { locale } from '$lib/stores/locale.svelte';

	const locales = LOCALES.map((code) => ({ code, label: LOCALE_META[code].label }));

	let open = $state(false);
</script>

<div class="locale-switcher">
	<button
		class="locale-switcher__trigger"
		onclick={() => (open = !open)}
	>
		<span class="material-symbols-outlined" style="font-size: 1.125rem;">language</span>
		{locales.find((l) => l.code === locale.current)?.label ?? 'EN'}
	</button>

	{#if open}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="locale-switcher__backdrop" onclick={() => (open = false)} onkeydown={() => {}}></div>
		<ul class="locale-switcher__menu">
			{#each locales as loc (loc.code)}
				<li>
					<button
						class="locale-switcher__item"
						class:locale-switcher__item--active={locale.current === loc.code}
						onclick={() => {
							locale.set(loc.code as Locale);
							open = false;
						}}
					>
						{loc.label}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	@reference "../../../app.css";

	.locale-switcher {
		@apply relative;
	}
	.locale-switcher__trigger {
		@apply inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg
		       text-secondary hover:text-on-surface
		       bg-transparent hover:bg-surface-container transition-colors cursor-pointer;
	}
	.locale-switcher__backdrop {
		@apply fixed inset-0 z-40;
	}
	.locale-switcher__menu {
		@apply absolute right-0 top-full mt-1 z-50 w-32 p-1.5
		       bg-surface-container-high shadow-xl
		       rounded-lg border border-outline-variant/20 list-none;
	}
	.locale-switcher__item {
		@apply block w-full text-left px-3 py-1.5 text-sm rounded-lg cursor-pointer
		       hover:bg-surface-container transition-colors;
	}
	.locale-switcher__item--active {
		@apply bg-primary text-on-primary;
	}
</style>
