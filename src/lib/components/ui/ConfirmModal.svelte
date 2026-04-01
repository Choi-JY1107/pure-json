<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';

	let {
		open = $bindable(false),
		title,
		message,
		confirmLabel,
		onConfirm
	}: {
		open: boolean;
		title: string;
		message: string;
		confirmLabel: string;
		onConfirm: () => void;
	} = $props();
</script>

{#if open}
<div class="confirm-modal fixed inset-0 z-50 flex items-center justify-center">
	<div class="confirm-modal__backdrop" onclick={() => (open = false)} onkeydown={(e) => e.key === 'Escape' && (open = false)} role="button" tabindex="-1"></div>
	<div class="confirm-modal__box bg-surface-container-high rounded-xl p-6 shadow-2xl max-w-sm relative z-10">
		<h3 class="confirm-modal__title">{title}</h3>
		<p class="confirm-modal__message">{message}</p>
		<div class="confirm-modal__actions flex justify-end gap-2 mt-4">
			<button class="inline-flex items-center justify-center font-medium transition-colors px-3 py-1.5 text-sm rounded-lg bg-transparent hover:bg-surface-container" onclick={() => (open = false)}>
				{m.btn_cancel()}
			</button>
			<button
				class="inline-flex items-center justify-center font-medium transition-colors px-3 py-1.5 text-sm rounded-lg bg-error text-on-error hover:opacity-90"
				onclick={() => {
					onConfirm();
					open = false;
				}}
			>
				{confirmLabel}
			</button>
		</div>
	</div>
</div>
{/if}

<style>
	@reference "../../../app.css";

	.confirm-modal__backdrop {
		@apply fixed inset-0 bg-black/50;
	}
	.confirm-modal__title {
		@apply text-lg font-bold;
	}
	.confirm-modal__message {
		@apply py-4;
	}
</style>
