<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import DualView from '$lib/components/editor/DualView.svelte';
	import CopyButton from '$lib/components/ui/CopyButton.svelte';
	import { getEditorStore } from '$lib/stores/editor';

	const editor = getEditorStore('json-viewer');
	import * as m from '$lib/paraglide/messages.js';
</script>

<MetaTags
	title={m.viewer_title()}
	description={m.viewer_description()}
/>

<div class="tool-page">
	<div class="tool-page__toolbar">
		<h1 class="tool-page__title">{m.viewer_h1()}</h1>
		<button class="tool-page__btn tool-page__btn--primary btn btn-sm btn-primary" onclick={() => editor.loadSample()}>
			{m.btn_load_sample()}
		</button>
		<CopyButton text={editor.input} />
		<button class="tool-page__btn tool-page__btn--ghost btn btn-sm btn-ghost" onclick={() => editor.clear()}>
			{m.btn_clear()}
		</button>
	</div>

	<div class="tool-page__editor tool-page__editor--tall">
		<DualView bind:value={editor.input} placeholder={m.editor_placeholder()} />
	</div>

	<article class="tool-page__article prose prose-sm">
		<h2>{m.viewer_h1()}</h2>
		<p>{m.viewer_intro()}</p>
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
	</article>
</div>

<style>
	@reference "../../../app.css";

	.tool-page {
		@apply max-w-7xl mx-auto space-y-4;
	}
	.tool-page__toolbar {
		@apply flex flex-wrap gap-2 items-center;
	}
	.tool-page__title {
		@apply text-lg font-bold flex-1;
	}
	.tool-page__editor {
		@apply border border-base-300 rounded-lg overflow-hidden;
	}
	.tool-page__editor--tall {
		@apply h-125;
	}
	.tool-page__article {
		@apply max-w-none mt-8;
	}
</style>
