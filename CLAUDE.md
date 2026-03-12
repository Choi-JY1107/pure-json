# CLAUDE.md

이 파일은 Claude Code가 프로젝트 컨텍스트를 빠르게 파악하기 위한 가이드입니다.

## 프로젝트 개요

PureJSON — 100% 클라이언트 사이드 JSON 도구 모음 웹앱
- URL: https://purejson.org
- 핵심 가치: "No Server, No Data Leak" (보안 강조 → 사용자 신뢰 및 체류 시간 확보)
- 목표: 구글 검색 유입(SEO) → 애드센스 수익 창출, 운영비 0원 유지 (Cloudflare Pages)

## 핵심 기술 스택

- SvelteKit 2 + Svelte 5 + Vite 6
- Tailwind CSS 4 + DaisyUI 5
- TypeScript (strict mode)
- Monaco Editor (코드 편집기)
- Inlang Paraglide JS (i18n: en, ko, ja)
- @vite-pwa/sveltekit (오프라인 PWA)
- Static adapter (빌드 결과 → `build/`)

## 빌드 & 명령어

```bash
npm run dev        # 개발 서버
npm run build      # paraglide 컴파일 + vite 빌드
npm run check      # svelte-check 타입 검사
npm run lint       # ESLint (flat config)
npm run lint:fix   # ESLint 자동 수정
```

## 프로젝트 구조

- `src/routes/` — 페이지 라우트 (lang prefix 없음, Paraglide가 브라우저 언어 감지)
  - `+page.svelte` (JSON Viewer, 루트), `json-formatter/`, `json-minifier/`, `json-sorter/`, `json-to-typescript/`, `json-to-yaml/`, `json-to-csv/`, `csv-to-json/`, `json-to-xml/`, `json-diff/`
  - `privacy/`, `terms/`, `about/` — 정책/정보 페이지
- `src/lib/components/` — Svelte 컴포넌트 (editor, layout, ui)
- `src/lib/utils/` — JSON 처리 로직 (formatter, to-ts, to-yaml, to-csv, csv-to-json, to-xml, json-sorter, json-diff, tree-parser)
- `src/lib/stores/` — Svelte 상태 관리 (editor.svelte.ts, theme.svelte.ts)
- `src/lib/config/site.ts` — 사이트 설정 (로케일, 페이지 목록, URL)
- `src/lib/paraglide/` — 자동 생성 i18n 런타임 (직접 수정 금지)
- `src/lib/monaco/` — Monaco 에디터 초기화
- `i18n/messages/` — 번역 메시지 파일 (en.json, ko.json, ja.json)
- `docs/planning.md` — 기획안 및 로드맵
- `docs/decisions/` — ADR (Architecture Decision Records)

## 코딩 컨벤션

- Svelte 5 runes 문법 사용 (`$state`, `$derived`, `$props` 등)
- ESLint flat config (`eslint.config.js`)
- 컴포넌트 파일: PascalCase (예: `MonacoEditor.svelte`)
- 유틸리티 파일: kebab-case (예: `json-formatter.ts`)
- i18n 메시지 키: snake_case (예: `viewer_title`)

### CSS / BEM 방법론

- **BEM (Block__Element--Modifier)** 네이밍을 모든 컴포넌트에 적용
- CSS는 각 Svelte 컴포넌트의 `<style>` 블록에 작성하며, 순수 Tailwind 유틸리티에 한해 `@apply` 사용
- **DaisyUI 컴포넌트 클래스** (`btn`, `select`, `alert`, `tabs`, `stats`, `drawer` 등)는 `@apply`에서 사용 불가 → HTML에 인라인으로 BEM 클래스와 함께 배치
- `<style>` 블록 상단에 `@reference "../../../app.css";` (또는 적절한 상대 경로) 필수

### 에디터 상태 관리

- `EditorStore` 클래스를 `getEditorStore(key)`로 페이지별 인스턴스 캐싱
- 각 페이지에서 `const editor = getEditorStore('json-viewer')` 형태로 사용
- 페이지 간 상태는 분리되며, 같은 페이지로 돌아오면 이전 상태 유지

## 문서화 규칙

- **기능 추가/변경 시 관련 문서를 반드시 함께 업데이트할 것**
  - `docs/planning.md` — 새 기능 추가, 로드맵 상태 변경 시
  - `docs/decisions/` — 아키텍처 결정, 기술 선택 변경 시 ADR 작성
  - `CLAUDE.md` — 프로젝트 구조, 라우트, 유틸리티 목록 변경 시
- 커밋 전에 문서 업데이트 여부를 항상 체크
- 코드만 커밋하고 문서를 빠뜨리지 말 것

## 커밋 규칙

- **커밋 전에 사용자에게 테스트를 먼저 요청할 것** — 사용자가 확인한 후에만 커밋
- 린트(`npm run lint`) 통과 확인 후 커밋

## 주의사항

- **빌드(`npm run build`)는 사용자가 직접 실행** — Claude가 빌드를 실행하지 말 것
- `src/lib/paraglide/` 디렉토리는 빌드 시 자동 생성됨 → 직접 수정하지 말 것
- 모든 데이터 처리는 클라이언트 사이드 — 서버 API 없음
- `svelte.config.js`에 로케일/페이지 목록이 중복 정의됨 (Node 환경에서 `$lib` 접근 불가하므로)
- Monaco Editor는 `optimizeDeps.include`로 사전 번들링 설정됨
- 새 i18n 메시지 키 추가 시 3개 언어 파일(en.json, ko.json, ja.json) 모두 업데이트 필요
- 언어 전환은 `window.location.href`로 전체 페이지 이동 (Paraglide 메시지가 `goto`에 반응하지 않으므로)
