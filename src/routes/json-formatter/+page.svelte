<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import MonacoEditor from '$lib/components/editor/MonacoEditor.svelte';
	import CopyButton from '$lib/components/ui/CopyButton.svelte';
	import ConfirmModal from '$lib/components/ui/ConfirmModal.svelte';
	import LoadFileButton from '$lib/components/ui/LoadFileButton.svelte';
	import { getEditorStore } from '$lib/stores/editor';
	import { formatJson } from '$lib/utils/json-formatter';
	import * as m from '$lib/paraglide/messages.js';

	const editor = getEditorStore('json-formatter');
	let indent = $state(2);
	let showClearModal = $state(false);

	function handleAction() {
		try {
			editor.setOutput(formatJson(editor.input, indent));
		} catch (e) {
			editor.setError((e as Error).message);
		}
	}
</script>

<MetaTags title={m.formatter_title()} description={m.formatter_description()} />

<div class="fmt">
	<!-- Header Toolbar -->
	<div class="fmt__toolbar">
		<div class="fmt__toolbar-left">
			<h1 class="fmt__title">{m.formatter_h1()}</h1>
		</div>
		<div class="fmt__toolbar-right">
				<div class="fmt__indent-select">
					<span class="fmt__indent-label">Indent:</span>
					<select class="fmt__indent-dropdown" bind:value={indent}>
						<option value={2}>2 SPACES</option>
						<option value={4}>4 SPACES</option>
						<option value={1}>TAB</option>
					</select>
				</div>
			<button class="fmt__sample-btn" onclick={() => editor.loadSample()}>
				<span class="material-symbols-outlined" style="font-size: 0.875rem;">edit_note</span>
				Sample
			</button>
			<button class="fmt__copy-btn" onclick={handleAction}>
				<span class="material-symbols-outlined" style="font-size: 0.875rem; font-variation-settings: 'FILL' 1;">bolt</span>
				Execute
			</button>
		</div>
	</div>

	<!-- Split editor panels -->
	<div class="fmt__panels">
		<!-- Left: Input Source -->
		<section class="fmt__panel fmt__panel--input">
			<div class="fmt__panel-header">
				<span class="fmt__panel-label">Input Source</span>
				<div class="fmt__panel-actions">
					<LoadFileButton onLoad={(content) => editor.setInput(content)} />
					<button class="fmt__icon-btn fmt__icon-btn--danger" onclick={() => (showClearModal = true)} title="Clear">
						<span class="material-symbols-outlined" style="font-size: 1rem;">delete</span>
					</button>
				</div>
			</div>
			<div class="fmt__editor">
				<MonacoEditor bind:value={editor.input} placeholder={m.editor_placeholder()} />
			</div>
		</section>

		<!-- Right: Beautified Output -->
		<section class="fmt__panel fmt__panel--output">
			<div class="fmt__panel-header">
				<span class="fmt__panel-label fmt__panel-label--primary">Beautified Output</span>
				<div class="fmt__panel-actions">
					{#if editor.output && !editor.error}
						<span class="fmt__valid-badge">
							<span class="material-symbols-outlined" style="font-size: 0.75rem; font-variation-settings: 'FILL' 1;">check_circle</span>
							Valid JSON
						</span>
					{/if}
					<CopyButton text={editor.output} />
				</div>
			</div>
			<div class="fmt__editor">
				<MonacoEditor value={editor.output || editor.error} readOnly language="json" />
			</div>
		</section>
	</div>

	<!-- Error -->
	{#if editor.error}
		<div class="fmt__error">
			<span class="material-symbols-outlined" style="font-size: 1rem;">error</span>
			<span>{editor.error}</span>
		</div>
	{/if}

	<!-- Article -->
	<article class="fmt__article prose prose-sm">
		<h2>{m.formatter_h1()}</h2>
		<p>{m.formatter_intro()}</p>

		<h3>{m.section_howto()}</h3>
		<ol>
			<li><strong>{m.formatter_howto_s1()}</strong> — {m.formatter_howto_s1_desc()}</li>
			<li><strong>{m.formatter_howto_s2()}</strong> — {m.formatter_howto_s2_desc()}</li>
			<li><strong>{m.formatter_howto_s3()}</strong> — {m.formatter_howto_s3_desc()}</li>
		</ol>

		<h3>{m.section_features()}</h3>
		<ul>
			<li>{m.formatter_feature1()}</li>
			<li>{m.formatter_feature2()}</li>
			<li>{m.formatter_feature3()}</li>
			<li>{m.formatter_feature4()}</li>
		</ul>

		<h3>{m.section_usecases()}</h3>
		<ul>
			<li>{m.formatter_usecase1()}</li>
			<li>{m.formatter_usecase2()}</li>
			<li>{m.formatter_usecase3()}</li>
		</ul>

		<h3>{m.section_faq()}</h3>
		<details>
			<summary><strong>{m.formatter_faq_q1()}</strong></summary>
			<p>{m.formatter_faq_a1()}</p>
		</details>
		<details>
			<summary><strong>{m.formatter_faq_q2()}</strong></summary>
			<p>{m.formatter_faq_a2()}</p>
		</details>
		<details>
			<summary><strong>{m.formatter_faq_q3()}</strong></summary>
			<p>{m.formatter_faq_a3()}</p>
		</details>
		<details>
			<summary><strong>{m.formatter_faq_q4()}</strong></summary>
			<p>{m.formatter_faq_a4()}</p>
		</details>
		<details>
			<summary><strong>{m.formatter_faq_q5()}</strong></summary>
			<p>{m.formatter_faq_a5()}</p>
		</details>
	</article>
</div>

<ConfirmModal
	bind:open={showClearModal}
	title={m.confirm_clear_title()}
	message={m.confirm_clear_message()}
	confirmLabel={m.btn_clear()}
	onConfirm={() => editor.clear()}
/>

<style>
	@reference "../../app.css";

	.fmt {
		@apply flex flex-col gap-4;
	}

	/* ── Toolbar ── */
	.fmt__toolbar {
		@apply h-14 flex items-center justify-between px-6
		       bg-surface-container-low border border-outline-variant/15 rounded-xl;
	}
	.fmt__toolbar-left {
		@apply flex items-center gap-6;
	}
	.fmt__toolbar-right {
		@apply flex items-center gap-3;
	}
	.fmt__title {
		@apply font-headline text-lg font-semibold tracking-tight;
	}
.fmt__indent-select {
		@apply flex items-center gap-2 px-3 py-1.5
		       bg-surface-container rounded-lg border border-outline-variant/10
		       hover:border-primary/30 transition-colors;
	}
	.fmt__indent-label {
		@apply text-[0.65rem] font-bold uppercase tracking-tighter text-secondary;
	}
	.fmt__indent-dropdown {
		@apply bg-transparent border-none text-[0.65rem] font-bold text-primary
		       cursor-pointer p-0;
	}
	.fmt__indent-dropdown:focus {
		outline: none;
		box-shadow: none;
	}
	.fmt__copy-btn {
		@apply flex items-center gap-2 px-4 py-1.5
		       bg-linear-to-br from-primary to-primary-container
		       text-on-primary text-[0.7rem] font-bold uppercase tracking-widest
		       rounded-lg shadow-lg shadow-primary-container/20
		       transition-all active:scale-95 cursor-pointer;
	}

	.fmt__sample-btn {
		@apply flex items-center gap-1.5 px-3 py-1.5
		       bg-surface-container-high text-on-surface
		       text-[0.7rem] font-semibold uppercase tracking-wider
		       rounded-lg transition-all cursor-pointer
		       hover:bg-surface-container-highest;
	}

	/* ── Split Panels ── */
	.fmt__panels {
		@apply grid grid-cols-1 lg:grid-cols-2 gap-4;
	}
	.fmt__panel {
		@apply flex flex-col rounded-xl overflow-hidden
		       border border-outline-variant/10 shadow-lg;
	}
	.fmt__panel--input {
	}
	.fmt__panel--output {
		@apply bg-surface-container;
	}
	.fmt__panel-header {
		@apply px-6 py-2 bg-surface-container-low flex items-center justify-between;
	}
	.fmt__panel-label {
		@apply text-[0.6rem] font-bold uppercase tracking-widest text-secondary;
	}
	.fmt__panel-label--primary {
		@apply text-primary;
	}
	.fmt__panel-actions {
		@apply flex items-center gap-2;
	}
	.fmt__icon-btn {
		@apply p-1 text-secondary hover:text-on-surface
		       hover:bg-surface-container-high rounded transition-colors cursor-pointer;
	}
	.fmt__icon-btn--danger {
		@apply hover:text-error hover:bg-error/10;
	}
	.fmt__valid-badge {
		@apply text-[0.6rem] font-medium text-tertiary flex items-center gap-1;
	}
	.fmt__editor {
		@apply h-[calc(100vh-18rem)];
	}

	/* ── Error ── */
	.fmt__error {
		@apply flex items-center gap-2 px-4 py-3
		       rounded-lg bg-error-container/20 text-error
		       border border-error/20 text-sm;
	}

	/* ── Article ── */
	.fmt__article {
		@apply max-w-none;
	}

	/* Mobile: both shrink equally */
	@media (width < 64rem) {
		.fmt__editor {
			@apply h-72;
		}
	}
</style>
