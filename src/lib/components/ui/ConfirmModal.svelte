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

<dialog class="confirm-modal modal" class:modal-open={open}>
	<div class="confirm-modal__box modal-box">
		<h3 class="confirm-modal__title">{title}</h3>
		<p class="confirm-modal__message">{message}</p>
		<div class="confirm-modal__actions modal-action">
			<button class="btn" onclick={() => (open = false)}>
				{m.btn_cancel()}
			</button>
			<button
				class="btn btn-error"
				onclick={() => {
					onConfirm();
					open = false;
				}}
			>
				{confirmLabel}
			</button>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button onclick={() => (open = false)}>close</button>
	</form>
</dialog>

<style>
	@reference "../../../app.css";

	.confirm-modal__title {
		@apply text-lg font-bold;
	}
	.confirm-modal__message {
		@apply py-4;
	}
</style>
