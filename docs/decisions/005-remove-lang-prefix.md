# ADR-005: URL 구조 변경 — [lang] 프리픽스 제거 및 클라이언트 사이드 i18n

## Status

In Progress

## Context

기존 URL 구조는 `/en/json-viewer`, `/ko/json-formatter` 등 언어 프리픽스(`[lang]`)를 포함했다. 이로 인해:

1. **AdSense 정책 위반 위험**: 리다이렉트 전용 페이지(`/`, `/en`, `/ko`, `/ja`)가 콘텐츠 없이 존재
2. **얇은 콘텐츠(Thin Content)**: 6개 도구 × 3개 언어 = 18개 페이지가 거의 동일한 콘텐츠
3. **UX 저하**: 언어 전환 시 `window.location.href`로 전체 페이지 리로드 → 깜빡임, 에디터 상태 손실

## Decision

- URL에서 `[lang]` 프리픽스를 제거하고, `/json-viewer`, `/json-formatter` 등 단일 URL 구조로 전환
- 언어 설정은 클라이언트 사이드 `LocaleStore`로 관리 (localStorage + Paraglide `setLocale`)
- 언어 전환 시 페이지 리로드 없이 `{#key locale}` 블록으로 UI만 리렌더

## Implementation Log

### Step 1: locale 스토어 생성
- `src/lib/stores/locale.svelte.ts` 생성
- `LocaleStore` 클래스: `current` ($state), `set()`, `detectLocale()`
- 초기값 우선순위: localStorage → Paraglide getLocale → navigator.languages → 'en'

### Step 2: 라우트 구조 변경
- `src/routes/[lang]/` 디렉토리 전체 삭제
- 6개 도구 페이지를 `src/routes/{tool}/+page.svelte`로 이동
- `+page.ts` (entries export) 제거 — 더 이상 `[lang]` 파라미터 없음
- `[lang]/+layout.svelte` 내용을 `+layout.svelte`로 병합
  - `{#key locale.current}` 블록으로 언어 전환 시 자식 리렌더
  - `lang` prop 대신 `locale` 스토어 사용
  - hreflang alternate 링크 제거
- `/` → `/json-viewer`로 리다이렉트 (lang 프리픽스 없이)
- `svelte.config.js` prerender entries에서 locale 조합 제거

### Step 3: 컴포넌트 업데이트
- `Header.svelte`: `lang` prop 제거, 로고 링크 `/{lang}/json-viewer` → `/json-viewer`
- `Sidebar.svelte`: `lang` prop 제거, 네비게이션 링크 `/{lang}/{tool}` → `/{tool}`
- `LocaleSwitcher.svelte`: `window.location.href` → `locale.set()` (페이지 리로드 없음)
- `Footer.svelte`: 변경 없음 (기존에 `lang` prop 미사용)
- `site.ts`: `langEntries()` 함수 제거, PAGES에서 빈 문자열 항목 제거
