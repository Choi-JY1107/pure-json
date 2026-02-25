# 001. Monaco Editor 선택적 ESM Import

- **일자**: 2026-02-25

## 맥락

Lighthouse 성능 측정 결과 FCP 8.6s / LCP 10.4s로 매우 낮은 점수.
"Minify JavaScript Est savings of 3,790 KiB" — 원인은 Monaco Editor.

분석 결과:
- 메인 JS 청크 ~3.2MB 중 **86%가 Monaco Editor**
- `import * from "monaco-editor"` → `editor.main.js` → 모든 언어(90+개) + TS 컴파일러 전체를 번들에 포함
- `ts.worker`에 TypeScript 컴파일러 전체 포함 (~2MB) — json-to-ts 변환은 `json-to-ts` npm 패키지가 수행하므로 불필요

사이트에 실제 필요한 것: **JSON(검증 포함) + TypeScript(하이라이팅만) + YAML(하이라이팅만)**

## 적용 사항

### 1단계: 선택적 ESM Import + ts.worker 제거

`import * as monaco from "monaco-editor"` (전체 번들) 대신 필요한 모듈만 개별 import:

- `monaco-editor/esm/vs/editor/editor.api` — API 엔트리포인트
- `monaco-editor/esm/vs/language/json/monaco.contribution` — JSON 풀 언어 서비스 (검증 포함)
- `monaco-editor/esm/vs/basic-languages/typescript/typescript.contribution` — TS Monarch 토크나이저 (~9KB)
- `monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution` — YAML Monarch 토크나이저 (~7KB)

ts.worker (~2MB TypeScript 컴파일러) 제거. TS/JS 요청은 base editor worker로 fallback.

### 2단계: editor.all.js → 개별 contribution cherry-pick

`editor.all.js`는 64개 에디터 기능을 전부 import. JSON 도구에 필요한 **20개만** 선별:

**포함:**
bracketMatching, clipboard, contextmenu, cursorUndo, find, folding,
gotoError, hover, indentation, lineSelection, linesOperations,
multicursor, readOnlyMessage, tokenization, wordHighlighter, wordOperations,
coreCommands, codeEditorWidget, standaloneStrings, codiconStyles

**제거 (44개):**
diffEditor, anchorSelect, codeAction, codelens, colorPicker, comment, caretOperations,
transpose, dnd, dropOrPasteInto, fontZoom, format, documentSymbols,
inlineCompletions, inlineProgress, gotoSymbol, goToDefinitionAtPosition,
inlayHints, inPlaceReplace, linkedEditing, links, longLinesHelper,
inlineEdit, inlineEdits, parameterHints, placeholderText, rename,
sectionHeaders, semanticTokens, smartSelect, snippet, stickyScroll,
suggest, suggestInlineCompletions, toggleTabFocusMode, unicodeHighlighter,
unusualLineTerminators, wordPartOperations, diffEditorBreadcrumbs

## 주의사항

- 향후 새 언어 추가 시 `basic-languages/xxx/xxx.contribution` 명시적 import 필요
- 에디터 기능 추가 필요 시 `contrib/xxx/browser/xxx.js` 명시적 import 필요
- `MonacoEditor.svelte`의 `import type { editor } from 'monaco-editor'`는 type-only → 번들 무관
