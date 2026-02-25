import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

let initialized = false;

export function initMonaco() {
  if (initialized) return;
  initialized = true;

  self.MonacoEnvironment = {
    getWorker(_: string, label: string) {
      if (label === "json") {
        return new jsonWorker();
      }
      if (label === "typescript" || label === "javascript") {
        return new tsWorker();
      }
      return new editorWorker();
    },
  };
}

export function createEditor(
  container: HTMLElement,
  options?: monaco.editor.IStandaloneEditorConstructionOptions,
) {
  initMonaco();

  return monaco.editor.create(container, {
    language: "json",
    theme:
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "vs-dark"
        : "vs",
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: "on",
    scrollBeyondLastLine: false,
    wordWrap: "on",
    automaticLayout: true,
    tabSize: 2,
    formatOnPaste: true,
    ...options,
  });
}

export function setEditorTheme(isDark: boolean) {
  monaco.editor.setTheme(isDark ? "vs-dark" : "vs");
}

export { monaco };
