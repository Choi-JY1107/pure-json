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
