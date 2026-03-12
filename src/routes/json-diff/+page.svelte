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
	<div class="tool-page__toolbar">
		<div class="tool-page__title-group">
			<h1 class="tool-page__title">{m.diff_h1()}</h1>
		</div>
		<button class="btn btn-sm btn-primary" onclick={handleDiff}>
			{m.btn_compare()}
		</button>
		<button class="btn btn-sm btn-ghost" onclick={() => (showClearModal = true)}>
			{m.btn_clear()}
		</button>
	</div>

	<div class="tool-page__grid">
		<div class="tool-page__panel">
			<div class="tool-page__label-row">
				<span class="tool-page__label">{m.diff_left_label()}</span>
				<LoadFileButton onLoad={(content) => (left = content)} />
			</div>
			<div class="tool-page__editor">
				<MonacoEditor bind:value={left} placeholder={m.editor_placeholder()} />
			</div>
		</div>
		<div class="tool-page__panel">
			<div class="tool-page__label-row">
				<span class="tool-page__label">{m.diff_right_label()}</span>
				<LoadFileButton onLoad={(content) => (right = content)} />
			</div>
			<div class="tool-page__editor">
				<MonacoEditor bind:value={right} placeholder={m.editor_placeholder()} />
			</div>
		</div>
	</div>

	{#if output || error}
		<div class="tool-page__panel">
			<div class="tool-page__label-row">
				<span class="tool-page__label">{m.diff_result_label()}</span>
				<CopyButton text={output || error} />
			</div>
			<div class="tool-page__editor">
				<MonacoEditor value={error || output} readOnly language="plaintext" />
			</div>
		</div>
	{/if}

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
		@apply flex flex-wrap gap-2 items-center;
	}
	.tool-page__title-group {
		@apply flex items-center gap-2 flex-1;
	}
	.tool-page__title {
		@apply text-lg font-bold;
	}
	.tool-page__grid {
		@apply grid grid-cols-1 lg:grid-cols-2 gap-4;
	}
	.tool-page__panel {
		@apply space-y-1;
	}
	.tool-page__label {
		@apply text-sm font-medium;
	}
	.tool-page__label-row {
		@apply flex items-center gap-2 h-8;
	}
	.tool-page__label-row .tool-page__label {
		@apply flex-1;
	}
	.tool-page__editor {
		@apply h-80 border border-base-300 rounded-lg overflow-hidden;
	}
	.tool-page__article {
		@apply max-w-none mt-8;
	}
</style>
