# 002. Lighthouse 전체 최적화 기록

- **일자**: 2026-02-25
- **측정 환경**: `npm run build && npm run preview` (프로덕션 빌드)

> `npm run dev`는 Vite HMR WebSocket 등으로 인해 정확한 측정이 불가능.
> 반드시 프로덕션 빌드(`preview`)에서 Lighthouse를 실행할 것.

---

## Performance

### Monaco 선택적 ESM Import + ts.worker 제거

→ 상세: [001-monaco-selective-imports.md](./001-monaco-selective-imports.md)

- 전체 번들(`import * from "monaco-editor"`) 대신 필요한 모듈만 cherry-pick import
- ts.worker (~2MB) 제거 — TS/YAML은 Monarch tokenizer만 사용
- editor.all.js(64개 기능) → 20개만 선별 import

### Monaco 지연 로딩 (Lazy Loading)

`MonacoEditor.svelte`에서 에디터를 즉시 로딩하지 않고 지연 로딩으로 변경:

1. **pointerdown**: 사용자가 에디터 영역을 클릭/탭하면 로딩 시작
2. **requestIdleCallback** (fallback: `setTimeout 2s`): 상호작용 없어도 브라우저 유휴 시 로딩

로딩 중에는 **스켈레톤 UI**(7줄의 placeholder 막대)를 표시하여 CLS 방지.

### Vite 빌드 설정

- `optimizeDeps.include`를 선택적 ESM 모듈 단위로 변경
- `chunkSizeWarningLimit: 3000` — Monaco 청크(~2.8MB)는 이미 동적 import로 코드 분할되어 초기 로딩에 미포함

---

## Accessibility

### 색상 대비(Contrast Ratio) 개선

Lighthouse가 WCAG AA 기준(4.5:1) 미달로 지적한 요소들의 텍스트 opacity를 상향:

| 컴포넌트 | 요소 | 변경 전 | 변경 후 |
|---|---|---|---|
| `AdSlot.svelte` | `.ad-slot` 배경 | `bg-base-200/50` | `bg-base-200` |
| `AdSlot.svelte` | `.ad-slot__label` | `text-base-content/30` | `/60` |
| `DualView.svelte` | `.dual-view__tab` | (DaisyUI 기본) | `text-base-content/70` |
| `DualView.svelte` | `.dual-view__empty` | `text-base-content/50` | `/70` |
| `Footer.svelte` | `.footer__privacy` | `/60` | `/70` |
| `Footer.svelte` | `.footer__meta` | `/50` | `/70` |
| `Sidebar.svelte` | `.sidebar__group-title` | `/50` | `/70` |

---

## Best Practices

- (현재 특별한 이슈 없음)

---

## SEO

- (현재 특별한 이슈 없음)

---

## 참고

- `npm run dev` 환경에서 bfcache 경고("Pages with WebSocket cannot enter back/forward cache")가 발생하나, 이는 Vite HMR WebSocket 때문이며 프로덕션에서는 발생하지 않음
- Lighthouse 측정은 항상 `npm run build && npm run preview`로 수행할 것
