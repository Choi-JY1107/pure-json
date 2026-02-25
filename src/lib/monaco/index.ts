// ── Editor core ──────────────────────────────────────────────
import 'monaco-editor/esm/vs/editor/browser/coreCommands.js';
import 'monaco-editor/esm/vs/editor/browser/widget/codeEditor/codeEditorWidget.js';

// ── Editor contributions (cherry-picked) ─────────────────────
import 'monaco-editor/esm/vs/editor/contrib/bracketMatching/browser/bracketMatching.js';
import 'monaco-editor/esm/vs/editor/contrib/clipboard/browser/clipboard.js';
import 'monaco-editor/esm/vs/editor/contrib/contextmenu/browser/contextmenu.js';
import 'monaco-editor/esm/vs/editor/contrib/cursorUndo/browser/cursorUndo.js';
import 'monaco-editor/esm/vs/editor/contrib/find/browser/findController.js';
import 'monaco-editor/esm/vs/editor/contrib/folding/browser/folding.js';
import 'monaco-editor/esm/vs/editor/contrib/gotoError/browser/gotoError.js';
import 'monaco-editor/esm/vs/editor/contrib/hover/browser/hoverContribution.js';
import 'monaco-editor/esm/vs/editor/contrib/indentation/browser/indentation.js';
import 'monaco-editor/esm/vs/editor/contrib/lineSelection/browser/lineSelection.js';
import 'monaco-editor/esm/vs/editor/contrib/linesOperations/browser/linesOperations.js';
import 'monaco-editor/esm/vs/editor/contrib/multicursor/browser/multicursor.js';
import 'monaco-editor/esm/vs/editor/contrib/readOnlyMessage/browser/contribution.js';
import 'monaco-editor/esm/vs/editor/contrib/tokenization/browser/tokenization.js';
import 'monaco-editor/esm/vs/editor/contrib/wordHighlighter/browser/wordHighlighter.js';
import 'monaco-editor/esm/vs/editor/contrib/wordOperations/browser/wordOperations.js';

// ── Codicons & i18n strings ──────────────────────────────────
import 'monaco-editor/esm/vs/editor/common/standaloneStrings.js';
import 'monaco-editor/esm/vs/base/browser/ui/codicons/codiconStyles.js';

// ── Language services ────────────────────────────────────────
// JSON: full language service with validation
import 'monaco-editor/esm/vs/language/json/monaco.contribution';
// TypeScript: Monarch tokenizer only (~9KB, read-only output)
import 'monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution';
// YAML: Monarch tokenizer only (~7KB)
import 'monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution';

// ── API entry point (no language bundling) ───────────────────
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

// Workers: only editor base + JSON (ts.worker removed — not needed)
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";

let initialized = false;

export function initMonaco() {
  if (initialized) return;
  initialized = true;

  self.MonacoEnvironment = {
    getWorker(_: string, label: string) {
      if (label === "json") {
        return new jsonWorker();
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
