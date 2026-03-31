<script lang="ts">
	import { theme } from '$lib/stores/theme.svelte';
</script>

<button
	class="p-2 text-secondary hover:text-on-surface transition-colors rounded-lg hover:bg-surface-container"
	onclick={() => theme.toggle()}
	aria-label="Toggle theme"
>
	<span class="material-symbols-outlined">
		{theme.isDark ? 'light_mode' : 'dark_mode'}
	</span>
</button>
