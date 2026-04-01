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

	let wrapper: HTMLDivElement;
	let container: HTMLDivElement;
	let editorInstance = $state.raw<MonacoEditor.IStandaloneCodeEditor | undefined>();
	let setEditorThemeFn = $state.raw<((isDark: boolean) => void) | undefined>();
	let ignoreChange = false;
	let contentLeft = $state(0);
	let contentTop = $state(0);
	let loading = $state(true);

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

	onMount(() => {
		let loaded = false;

		const triggerLoad = () => {
			if (loaded) return;
			loaded = true;
			loadEditor();
		};

		// 1) Load on first user interaction (click/tap on editor area)
		wrapper.addEventListener('pointerdown', triggerLoad, { once: true });

		// 2) Fallback: also preload via idle callback so the editor
		//    eventually appears even without interaction
		let cleanupIdle: (() => void) | undefined;
		if ('requestIdleCallback' in window) {
			const id = requestIdleCallback(triggerLoad, { timeout: 4000 });
			cleanupIdle = () => cancelIdleCallback(id);
		} else {
			const timer = setTimeout(triggerLoad, 2000);
			cleanupIdle = () => clearTimeout(timer);
		}

		return () => {
			wrapper.removeEventListener('pointerdown', triggerLoad);
			cleanupIdle?.();
		};
	});

	async function loadEditor() {
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

		editorInstance = instance;
		loading = false;

		// Fix Lighthouse "prevents pasting" warning from Monaco's hidden textarea
		const textarea = container.querySelector('textarea');
		if (textarea) {
			textarea.removeAttribute('autocomplete');
		}
	}

	onDestroy(() => {
		editorInstance?.dispose();
	});
</script>

<div bind:this={wrapper} class="monaco-editor" role="application">
	<div bind:this={container} class="monaco-editor__container"></div>
	{#if loading}
		<div class="monaco-editor__skeleton">
			{#each [60, 80, 45, 70, 55, 90, 40] as width, i (i)}
				<div class="monaco-editor__skeleton-line" style="width: {width}%"></div>
			{/each}
		</div>
	{:else if !value && placeholder}
		<div class="monaco-editor__placeholder" style="left: {contentLeft}px; top: {contentTop}px;">
			{placeholder}
		</div>
	{/if}
</div>

<style>
	@reference "../../../app.css";

	.monaco-editor {
		@apply relative h-full w-full min-h-75 cursor-text;
	}
	.monaco-editor__container {
		@apply h-full w-full;
	}
	.monaco-editor__placeholder {
		@apply pointer-events-none absolute
		       text-on-surface/40 text-sm leading-4.75 font-mono;
	}
	.monaco-editor__skeleton {
		@apply absolute inset-0 p-4 flex flex-col gap-2.5 pointer-events-none;
	}
	.monaco-editor__skeleton-line {
		@apply h-3.5 rounded bg-surface-container/50;
	}
</style>
