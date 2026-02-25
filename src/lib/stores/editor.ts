import { EditorStore } from './editor.svelte';

const stores = new Map<string, EditorStore>();

export function getEditorStore(key: string): EditorStore {
	if (!stores.has(key)) {
		stores.set(key, new EditorStore());
	}
	return stores.get(key)!;
}

export { EditorStore };
