<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { theme } from '$lib/stores/theme.svelte';
	import type { editor as MonacoEditor } from 'monaco-editor';

	let {
		value = $bindable(''),
		language = 'json',
		readOnly = false,
		placeholder = ''
	}: {
		value?: string;
		language?: string;
		readOnly?: boolean;
		placeholder?: string;
	} = $props();

	let container: HTMLDivElement;
	let editorInstance = $state.raw<MonacoEditor.IStandaloneCodeEditor | undefined>();
	let setEditorThemeFn = $state.raw<((isDark: boolean) => void) | undefined>();
	let ignoreChange = false;
	let contentLeft = $state(0);
	let contentTop = $state(0);

	// value prop → Monaco sync (top-level so Svelte tracks reactivity)
	$effect(() => {
		if (editorInstance && editorInstance.getValue() !== value) {
			ignoreChange = true;
			editorInstance.setValue(value);
			ignoreChange = false;
		}
	});

	// theme sync
	$effect(() => {
		if (setEditorThemeFn) {
			setEditorThemeFn(theme.isDark);
		}
	});

	onMount(async () => {
		const { createEditor, setEditorTheme } = await import('$lib/monaco');
		setEditorThemeFn = setEditorTheme;

		const instance = createEditor(container, {
			value,
			language,
			readOnly
		});

		function updateLayout() {
			const layout = instance.getLayoutInfo();
			contentLeft = layout.contentLeft;
			const topPadding = instance.getOption(84 /* EditorOption.padding */)?.top ?? 0;
			contentTop = topPadding;
		}

		updateLayout();
		instance.onDidLayoutChange(updateLayout);

		instance.onDidChangeModelContent(() => {
			if (ignoreChange) return;
			value = instance.getValue();
		});

		// Setting this last triggers the $effect above
		editorInstance = instance;
	});

	onDestroy(() => {
		editorInstance?.dispose();
	});
</script>

<div class="monaco-editor">
	<div bind:this={container} class="monaco-editor__container"></div>
	{#if !value && placeholder}
		<div class="monaco-editor__placeholder" style="left: {contentLeft}px; top: {contentTop}px;">
			{placeholder}
		</div>
	{/if}
</div>

<style>
	@reference "../../../app.css";

	.monaco-editor {
		@apply relative h-full w-full min-h-75;
	}
	.monaco-editor__container {
		@apply h-full w-full;
	}
	.monaco-editor__placeholder {
		@apply pointer-events-none absolute
		       text-base-content/40 text-sm leading-[19px] font-mono;
	}
</style>
