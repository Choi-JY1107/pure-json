<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import DualView from '$lib/components/editor/DualView.svelte';
	import CopyButton from '$lib/components/ui/CopyButton.svelte';
	import ConfirmModal from '$lib/components/ui/ConfirmModal.svelte';
	import LoadFileButton from '$lib/components/ui/LoadFileButton.svelte';
	import { getEditorStore } from '$lib/stores/editor';

	const editor = getEditorStore('json-viewer');
	import * as m from '$lib/paraglide/messages.js';

	let showClearModal = $state(false);
</script>

<MetaTags
	title={m.viewer_title()}
	description={m.viewer_description()}
/>

<div class="tool-page">
	<!-- Toolbar -->
	<div class="tool-page__toolbar">
		<div class="tool-page__title-group">
			<h1 class="tool-page__title">{m.viewer_h1()}</h1>
		</div>
		<div class="tool-page__actions">
			<button class="tool-page__btn tool-page__btn--soft" onclick={() => editor.loadSample()}>
				<span class="material-symbols-outlined tool-page__btn-icon">edit_note</span>
				{m.btn_load_sample()}
			</button>
			<LoadFileButton onLoad={(content) => editor.setInput(content)} />
			<div class="tool-page__divider"></div>
			<CopyButton text={editor.input} />
			<button class="tool-page__btn tool-page__btn--ghost" onclick={() => (showClearModal = true)}>
				<span class="material-symbols-outlined tool-page__btn-icon">delete_outline</span>
				{m.btn_clear()}
			</button>
		</div>
	</div>

	<!-- Editor Panel -->
	<div class="tool-page__panel">
		<div class="tool-page__panel-header">
			<span class="material-symbols-outlined tool-page__panel-icon">visibility</span>
			<span class="tool-page__panel-label">JSON Viewer</span>
		</div>
		<div class="tool-page__editor">
			<DualView bind:value={editor.input} placeholder={m.editor_placeholder()} />
		</div>
	</div>

	<!-- Article -->
	<article class="tool-page__article prose prose-sm">
		<h2>{m.viewer_h1()}</h2>
		<p>{m.viewer_intro()}</p>

		<h3>{m.section_howto()}</h3>
		<ol>
			<li><strong>{m.viewer_howto_s1()}</strong> — {m.viewer_howto_s1_desc()}</li>
			<li><strong>{m.viewer_howto_s2()}</strong> — {m.viewer_howto_s2_desc()}</li>
			<li><strong>{m.viewer_howto_s3()}</strong> — {m.viewer_howto_s3_desc()}</li>
		</ol>

		<h3>{m.section_features()}</h3>
		<ul>
			<li>{m.viewer_feature1()}</li>
			<li>{m.viewer_feature2()}</li>
			<li>{m.viewer_feature3()}</li>
			<li>{m.viewer_feature4()}</li>
		</ul>

		<h3>{m.section_usecases()}</h3>
		<ul>
			<li>{m.viewer_usecase1()}</li>
			<li>{m.viewer_usecase2()}</li>
			<li>{m.viewer_usecase3()}</li>
		</ul>

		<h3>{m.section_faq()}</h3>
		<details>
			<summary><strong>{m.viewer_faq_q1()}</strong></summary>
			<p>{m.viewer_faq_a1()}</p>
		</details>
		<details>
			<summary><strong>{m.viewer_faq_q2()}</strong></summary>
			<p>{m.viewer_faq_a2()}</p>
		</details>
		<details>
			<summary><strong>{m.viewer_faq_q3()}</strong></summary>
			<p>{m.viewer_faq_a3()}</p>
		</details>
		<details>
			<summary><strong>{m.viewer_faq_q4()}</strong></summary>
			<p>{m.viewer_faq_a4()}</p>
		</details>
		<details>
			<summary><strong>{m.viewer_faq_q5()}</strong></summary>
			<p>{m.viewer_faq_a5()}</p>
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
	@reference "../app.css";

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
		@apply flex items-center gap-2 flex-wrap;
	}
	.tool-page__divider {
		@apply h-6 border-l border-outline-variant/20;
	}
	.tool-page__btn {
		@apply inline-flex items-center gap-1.5 px-3 py-1.5
		       text-[0.6875rem] font-semibold uppercase tracking-wider
		       rounded-lg transition-all duration-200 cursor-pointer;
	}
	.tool-page__btn-icon {
		font-size: 1rem;
	}
	.tool-page__btn--soft {
		@apply bg-surface-container-high text-on-surface
		       hover:bg-surface-container-highest;
	}
	.tool-page__btn--ghost {
		@apply bg-transparent text-secondary hover:text-on-surface
		       hover:bg-surface-container;
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
		color: var(--md-primary);
	}
	.tool-page__panel-label {
		@apply text-[0.625rem] uppercase tracking-widest font-bold text-secondary;
	}
	.tool-page__editor {
		@apply h-125;
	}
	.tool-page__article {
		@apply max-w-none mt-8;
	}
</style>
