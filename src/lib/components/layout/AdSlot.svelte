<script lang="ts">
	let {
		slot = 'default',
		format = 'auto',
		width = '100%',
		height = '90px'
	}: {
		slot?: string;
		format?: string;
		width?: string;
		height?: string;
	} = $props();
</script>

<!-- AdSense slot placeholder — replace data-ad-client and data-ad-slot with real values -->
<div
	class="ad-slot"
	style="width: {width}; min-height: {height};"
	data-ad-slot={slot}
	data-ad-format={format}
>
	<span class="ad-slot__label">Ad</span>
</div>

<style>
	@reference "../../../app.css";

	.ad-slot {
		@apply flex items-center justify-center bg-base-200
		       border border-base-300 rounded-lg overflow-hidden;
	}
	.ad-slot__label {
		@apply text-xs text-base-content/60;
	}
</style>
