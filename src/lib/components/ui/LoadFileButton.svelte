<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';

	let { onLoad }: { onLoad: (content: string) => void } = $props();

	let fileInput: HTMLInputElement;

	function handleFileChange(e: Event) {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = () => {
			onLoad(reader.result as string);
		};
		reader.readAsText(file);
		input.value = '';
	}
</script>

<input
	bind:this={fileInput}
	type="file"
	accept=".json,.txt"
	class="load-file__input"
	onchange={handleFileChange}
/>
<button class="load-file__btn btn btn-sm btn-soft btn-primary" onclick={() => fileInput.click()}>
	{m.btn_load_file()}
</button>

<style>
	@reference "../../../app.css";

	.load-file__input {
		@apply hidden;
	}
</style>
