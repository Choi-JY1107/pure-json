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
	<div class="tool-page__toolbar">
		<div class="tool-page__title-group">
			<h1 class="tool-page__title">{m.viewer_h1()}</h1>
			<button class="inline-flex items-center justify-center font-medium transition-colors px-3 py-1.5 text-sm rounded-lg bg-primary/15 text-primary hover:bg-primary/25" onclick={() => editor.loadSample()}>
				{m.btn_load_sample()}
			</button>
			<LoadFileButton onLoad={(content) => editor.setInput(content)} />
		</div>
		<CopyButton text={editor.input} />
		<button class="tool-page__btn tool-page__btn--ghost inline-flex items-center justify-center font-medium transition-colors px-3 py-1.5 text-sm rounded-lg bg-transparent hover:bg-surface-container" onclick={() => (showClearModal = true)}>
			{m.btn_clear()}
		</button>
	</div>

	<div class="tool-page__editor tool-page__editor--tall">
		<DualView bind:value={editor.input} placeholder={m.editor_placeholder()} />
	</div>

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
		@apply flex flex-wrap gap-2 items-center;
	}
	.tool-page__title-group {
		@apply flex items-center gap-2 flex-1;
	}
	.tool-page__title {
		@apply text-lg font-bold;
	}
	.tool-page__editor {
		@apply border border-surface-container rounded-lg overflow-hidden;
	}
	.tool-page__editor--tall {
		@apply h-125;
	}
	.tool-page__article {
		@apply max-w-none mt-8;
	}
</style>
