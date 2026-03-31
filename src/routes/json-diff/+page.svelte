<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import MonacoEditor from '$lib/components/editor/MonacoEditor.svelte';
	import CopyButton from '$lib/components/ui/CopyButton.svelte';
	import ConfirmModal from '$lib/components/ui/ConfirmModal.svelte';
	import LoadFileButton from '$lib/components/ui/LoadFileButton.svelte';
	import { jsonDiff, formatDiff } from '$lib/utils/json-diff';
	import * as m from '$lib/paraglide/messages.js';

	let left = $state('');
	let right = $state('');
	let output = $state('');
	let error = $state('');
	let showClearModal = $state(false);

	function handleDiff() {
		try {
			error = '';
			const diffs = jsonDiff(left, right);
			output = formatDiff(diffs);
		} catch (e) {
			error = (e as Error).message;
			output = '';
		}
	}

	function clear() {
		left = '';
		right = '';
		output = '';
		error = '';
	}
</script>

<MetaTags title={m.diff_title()} description={m.diff_description()} />

<div class="tool-page">
	<!-- Toolbar -->
	<div class="tool-page__toolbar">
		<div class="tool-page__title-group">
			<h1 class="tool-page__title">{m.diff_h1()}</h1>
		</div>
		<div class="tool-page__actions">
			<button class="tool-page__btn tool-page__btn--primary" onclick={handleDiff}>
				<span class="material-symbols-outlined tool-page__btn-icon" style="font-variation-settings: 'FILL' 1;">difference</span>
				{m.btn_compare()}
			</button>
			<button class="tool-page__btn tool-page__btn--ghost" onclick={() => (showClearModal = true)}>
				<span class="material-symbols-outlined tool-page__btn-icon">delete_outline</span>
				{m.btn_clear()}
			</button>
		</div>
	</div>

	<!-- Editor Grid (2 inputs) -->
	<div class="tool-page__grid">
		<div class="tool-page__panel">
			<div class="tool-page__panel-header">
				<span class="material-symbols-outlined tool-page__panel-icon">data_object</span>
				<span class="tool-page__panel-label">{m.diff_left_label()}</span>
				<div class="tool-page__panel-actions">
					<LoadFileButton onLoad={(content) => (left = content)} />
				</div>
			</div>
			<div class="tool-page__editor">
				<MonacoEditor bind:value={left} placeholder={m.editor_placeholder()} />
			</div>
		</div>
		<div class="tool-page__panel">
			<div class="tool-page__panel-header">
				<span class="material-symbols-outlined tool-page__panel-icon">data_object</span>
				<span class="tool-page__panel-label">{m.diff_right_label()}</span>
				<div class="tool-page__panel-actions">
					<LoadFileButton onLoad={(content) => (right = content)} />
				</div>
			</div>
			<div class="tool-page__editor">
				<MonacoEditor bind:value={right} placeholder={m.editor_placeholder()} />
			</div>
		</div>
	</div>

	<!-- Result Panel -->
	{#if output || error}
		<div class="tool-page__panel">
			<div class="tool-page__panel-header">
				<span class="material-symbols-outlined tool-page__panel-icon tool-page__panel-icon--result">task_alt</span>
				<span class="tool-page__panel-label">{m.diff_result_label()}</span>
				<div class="tool-page__panel-actions">
					<CopyButton text={output || error} />
				</div>
			</div>
			<div class="tool-page__editor">
				<MonacoEditor value={error || output} readOnly language="plaintext" />
			</div>
		</div>
	{/if}

	<!-- Article -->
	<article class="tool-page__article prose prose-sm">
		<h2>{m.diff_h1()}</h2>
		<p>{m.diff_intro()}</p>

		<h3>{m.section_howto()}</h3>
		<ol>
			<li><strong>{m.diff_howto_s1()}</strong> — {m.diff_howto_s1_desc()}</li>
			<li><strong>{m.diff_howto_s2()}</strong> — {m.diff_howto_s2_desc()}</li>
			<li><strong>{m.diff_howto_s3()}</strong> — {m.diff_howto_s3_desc()}</li>
		</ol>

		<h3>{m.section_features()}</h3>
		<ul>
			<li>{m.diff_feature1()}</li>
			<li>{m.diff_feature2()}</li>
			<li>{m.diff_feature3()}</li>
			<li>{m.diff_feature4()}</li>
		</ul>

		<h3>{m.section_usecases()}</h3>
		<ul>
			<li>{m.diff_usecase1()}</li>
			<li>{m.diff_usecase2()}</li>
			<li>{m.diff_usecase3()}</li>
		</ul>

		<h3>{m.section_faq()}</h3>
		<details>
			<summary><strong>{m.diff_faq_q1()}</strong></summary>
			<p>{m.diff_faq_a1()}</p>
		</details>
		<details>
			<summary><strong>{m.diff_faq_q2()}</strong></summary>
			<p>{m.diff_faq_a2()}</p>
		</details>
		<details>
			<summary><strong>{m.diff_faq_q3()}</strong></summary>
			<p>{m.diff_faq_a3()}</p>
		</details>
		<details>
			<summary><strong>{m.diff_faq_q4()}</strong></summary>
			<p>{m.diff_faq_a4()}</p>
		</details>
		<details>
			<summary><strong>{m.diff_faq_q5()}</strong></summary>
			<p>{m.diff_faq_a5()}</p>
		</details>
	</article>
</div>

<ConfirmModal
	bind:open={showClearModal}
	title={m.confirm_clear_title()}
	message={m.confirm_clear_message()}
	confirmLabel={m.btn_clear()}
	onConfirm={clear}
/>

<style>
	@reference "../../app.css";

	.tool-page {
		@apply max-w-7xl mx-auto space-y-4;
	}
	.tool-page__toolbar {
		@apply flex flex-wrap items-center justify-between gap-3
		       px-4 py-3 rounded-xl
		       bg-surface-container-low border border-outline-variant/10;
	}
	.tool-page__title-group {
		@apply flex items-center gap-3;
	}
	.tool-page__title {
		@apply text-base font-headline font-bold tracking-tight;
	}
	.tool-page__actions {
		@apply flex items-center gap-2;
	}
	.tool-page__btn {
		@apply inline-flex items-center gap-1.5 px-3 py-1.5
		       text-[0.6875rem] font-semibold uppercase tracking-wider
		       rounded-lg transition-all duration-200 cursor-pointer;
	}
	.tool-page__btn-icon {
		font-size: 1rem;
	}
	.tool-page__btn--primary {
		@apply bg-linear-to-br from-primary to-primary-container
		       text-on-primary shadow-lg shadow-primary-container/20
		       active:scale-95;
	}
	.tool-page__btn--ghost {
		@apply bg-transparent text-secondary hover:text-on-surface
		       hover:bg-surface-container;
	}
	.tool-page__grid {
		@apply grid grid-cols-1 lg:grid-cols-2 gap-4;
	}
	.tool-page__panel {
		@apply flex flex-col rounded-xl overflow-hidden
		       border border-outline-variant/10 shadow-lg;
	}
	.tool-page__panel-header {
		@apply h-10 px-4 flex items-center gap-2
		       bg-surface-container-low border-b border-outline-variant/5;
	}
	.tool-page__panel-icon {
		font-size: 0.875rem;
		color: var(--md-tertiary);
	}
	.tool-page__panel-icon--result {
		color: var(--md-primary);
	}
	.tool-page__panel-label {
		@apply text-[0.625rem] uppercase tracking-widest font-bold text-secondary flex-1;
	}
	.tool-page__panel-actions {
		@apply flex items-center gap-1;
	}
	.tool-page__editor {
		@apply h-80;
	}
	.tool-page__article {
		@apply max-w-none mt-8;
	}
</style>
