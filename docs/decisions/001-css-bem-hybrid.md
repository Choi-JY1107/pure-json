# 001. CSS: BEM + DaisyUI 하이브리드 방식

- **상태**: 확정
- **일자**: 2026-02-25

## 맥락

Tailwind CSS v4 + DaisyUI v5 환경에서 Svelte scoped `<style>` 블록의 `@apply`에
DaisyUI 컴포넌트 클래스(`select-bordered`, `footer-center`, `stats-horizontal`, `tab-active` 등)를 사용할 수 없는 제약 발견.

`@source inline(...)`, `@reference` 등 여러 우회 방법을 시도했으나
DaisyUI v5가 생성하는 일부 클래스는 Tailwind 유틸리티로 등록되지 않아 `@apply` 불가.

## 결정

- **BEM 클래스명**을 모든 요소에 적용 (Block__Element--Modifier)
- **DaisyUI 컴포넌트 클래스**(`btn`, `select`, `alert`, `tabs`, `stats`, `drawer` 등)는 HTML에 인라인으로 BEM 클래스와 함께 배치
- `<style>` 블록의 `@apply`는 **순수 Tailwind 유틸리티 클래스만** 사용
- `<style>` 블록 상단에 `@reference` 디렉티브 필수

## 예시

```svelte
<!-- HTML: BEM + DaisyUI 인라인 -->
<button class="tool-page__btn tool-page__btn--primary btn btn-sm btn-primary">
  Format
</button>

<!-- Style: 순수 Tailwind만 @apply -->
<style>
  @reference "../../../app.css";

  .tool-page__btn {
    /* DaisyUI 클래스는 여기서 사용 불가 → 인라인으로 */
  }
  .tool-page__toolbar {
    @apply flex flex-wrap gap-2 items-center;
  }
</style>
```

## 근거

- `@source inline("btn select alert ...")` → DaisyUI 플러그인 클래스를 유틸리티로 등록하지 못함
- `@reference "../../../app.css"` → DaisyUI 기본 클래스 일부는 인식하나 modifier 클래스 불가
- 인라인 DaisyUI + scoped BEM 조합이 빌드 안정성과 구조화를 동시에 충족
