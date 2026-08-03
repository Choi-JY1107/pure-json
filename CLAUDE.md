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
- Adapter: `@sveltejs/adapter-cloudflare`를 먼저 시도하고 없으면 `adapter-static`으로 폴백 (`svelte.config.js`)
  - 실제 산출물은 **`.svelte-kit/cloudflare/`** (adapter-cloudflare가 설치되어 있어 이쪽이 선택됨)
  - 루트의 `build/`는 adapter-static 시절의 낡은 디렉토리이므로 빌드 결과 확인에 쓰지 말 것

## 빌드 & 명령어

```bash
npm run dev        # 개발 서버
npm run build      # paraglide 컴파일 + vite 빌드
npm run check      # svelte-check 타입 검사
npm run lint       # ESLint (flat config)
npm run lint:fix   # ESLint 자동 수정
```

`postinstall`에 `scripts/patch-wrangler-punycode.mjs`가 걸려 있다.
wrangler 번들이 `punycode`를 bare로 require해 Node의 deprecated 내장 모듈을 로드하는 것을
`"punycode/"`로 다시 써서 막는다(경고 억제가 아니라 실제로 로드를 막는 것).
멱등하고 실패해도 install을 중단하지 않는다. 상세와 제거 조건은 ADR-008 참고.

## 프로젝트 구조

- `src/routes/` — 페이지 라우트 (lang prefix 없음, Paraglide가 브라우저 언어 감지)
  - `+page.svelte` (JSON Viewer, 루트), `json-formatter/`, `json-minifier/`, `json-sorter/`, `json-to-typescript/`, `json-to-yaml/`, `json-to-csv/`, `csv-to-json/`, `json-to-xml/`, `json-diff/`
  - `privacy/`, `terms/`, `about/`, `contact/` — 정책/정보/연락처 페이지 (contact는 mailto: contact@purejson.org)
  - `guides/` — 교육 가이드 인덱스 및 6개 가이드 (what-is-json, json-vs-yaml-xml, json-syntax-errors, json-rest-api, json-schema, large-json-files)
- `src/lib/components/` — Svelte 컴포넌트 (editor, layout, ui, tool, home, guide)
  - `home/` — 홈 전용: `Hero.svelte`(자기 설명 JSON 시그니처), `ToolsGrid.svelte`(10개 도구 내부 링크)
  - `tool/ToolPage.svelte` — 10개 도구 공통 컴포넌트. `hero`/`belowContent` 스니펫으로 홈에서 히어로/그리드 주입. 콘텐츠 prop: `intro`, `body`(문단 배열), `deep`(심층 해설), `reference`(3열 동작 표), `examples`(입출력 코드쌍), `pitfalls`(함정), `howto`, `features`, `usecases`, `faqs`
  - `ui/AuthorByline.svelte` — 실명 저자 + 최종 수정일. 도구/가이드/About에 사용 (E-E-A-T, ADR-008)
- `src/lib/utils/` — JSON 처리 로직 (formatter, to-ts, to-yaml, to-csv, csv-to-json, to-xml, json-sorter, json-diff, tree-parser)
- `src/lib/stores/` — Svelte 상태 관리 (editor.svelte.ts, theme.svelte.ts)
- `src/lib/config/site.ts` — 사이트 설정 (로케일, 페이지 목록, URL, `GITHUB_URL`, `AUTHOR`, `CONTENT_DATES`)
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

### 디자인 시스템 (pure.json 아이덴티티, ADR-007)

- 팔레트: 잉크 블루블랙 베이스 + 아이리스(primary)/에메랄드(tertiary)/앰버(number)/핑크(keyword) 구문 강조 파생. `app.css`의 `--md-*` 토큰 정의
- 폰트: Display `Bricolage Grotesque`, Body `Inter`, Mono `JetBrains Mono` (모노는 라벨/키/eyebrow 등 구조 요소용)
- 카피 규칙: 설명에 `·`/`—` 금지, 여러 문장은 문장 단위 줄바꿈(`\n` + `white-space: pre-line`)

### CSS / BEM 방법론

- **BEM (Block__Element--Modifier)** 네이밍을 모든 컴포넌트에 적용
- CSS는 각 Svelte 컴포넌트의 `<style>` 블록에 작성하며, 순수 Tailwind 유틸리티에 한해 `@apply` 사용
- **DaisyUI 컴포넌트 클래스** (`btn`, `select`, `alert`, `tabs`, `stats`, `drawer` 등)는 `@apply`에서 사용 불가 → HTML에 인라인으로 BEM 클래스와 함께 배치
- `<style>` 블록 상단에 `@reference "../../../app.css";` (또는 적절한 상대 경로) 필수

### 콘텐츠 작성 규칙 (ADR-008)

- **도구 페이지는 서로 다른 종류의 콘텐츠를 담을 것** — 같은 틀에 다른 단어를 채우면
  AdSense가 "가치 없는 콘텐츠"로 판정한다. 실제로 그렇게 거절된 이력이 있다.
- **차별화의 재료는 구현의 실제 동작** — `src/lib/utils/`의 코드를 읽고 실행해서
  그 도구에만 있는 동작, 정규화, 한계, 함정을 뽑아낸다.
- **레퍼런스 표와 예시에 적는 값은 반드시 실행해서 확인할 것** — 검증 없이 쓴 문서는
  허위 주장이 되고 그 자체로 감점 요인이다. 실제로 4건이 그런 상태였다.
- 문서가 주장하는 동작과 코드가 다르면 **코드를 고치는 쪽을 우선 검토**한다.

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
