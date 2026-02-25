# PureJSON 기획안

## 1. 프로젝트 개요

- **서비스명:** PureJSON (Privacy-focused JSON Tool)
- **핵심 가치:** "No Server, No Data Leak" — 보안 강조를 통한 사용자 신뢰 및 체류 시간 확보
- **목표:** 구글 검색 유입(SEO) → 애드센스 수익 창출, 운영비 0원 유지

## 2. 주요 기능 (MVP)

| 기능 | 설명 | 상태 |
|---|---|---|
| Smart Editor | Monaco Editor 기반 하이라이팅, 자동 들여쓰기, 괄호 짝 맞추기 | Done |
| Dual View | Raw Text 편집기 + Tree View를 한 화면에 배치 | Done |
| Formatter | 인덴트 옵션(2칸/4칸/탭) 선택 포맷팅 | Done |
| Minify | 공백 제거로 파일 용량 축소 + 절감률 표시 | Done |
| JSON → TypeScript | TypeScript 인터페이스 자동 생성 | Done |
| JSON → YAML | YAML 형식 변환 | Done |
| Offline Support | PWA 적용, 인터넷 없이 사용 가능 | Done |
| Dark/Light 모드 | 테마 전환 지원 | Done |
| 반응형 레이아웃 | 모바일 대응 (drawer 기반 사이드바) | Done |

### 기획 대비 변경 사항

- **Instant Validator**: 초기 기획에 포함되었으나 개발 중 필요성이 낮다고 판단하여 제거
- **i18n 솔루션**: 기획 시 `sveltekit-i18n` 예정 → 실제 구현은 `Inlang Paraglide JS`로 변경 (컴파일 타임 i18n, 번들 크기 최소화)

## 3. 기술 아키텍처 (Zero-Cost Stack)

| 영역 | 기획 | 실제 적용 |
|---|---|---|
| Frontend | SvelteKit (`adapter-static`) | SvelteKit 2 + Svelte 5 (runes) |
| Styling | Tailwind CSS + DaisyUI | Tailwind CSS 4 + DaisyUI 5 |
| Editor | Monaco Editor | monaco-editor ^0.52 |
| i18n | sveltekit-i18n | Inlang Paraglide JS |
| Deploy | Cloudflare Pages | Cloudflare Pages (GitHub 연동) |
| PWA | PWA 적용 | @vite-pwa/sveltekit |

## 4. 수익 모델 및 광고 배치

- **수익원:** Google AdSense
- **배치 전략:**
  - 상단 배너: 에디터 바로 위 가로형 (클릭률 높음)
  - 사이드바: 유틸리티 버튼 하단 수직형
  - 전면 광고: '파일 다운로드' 또는 '복사' 버튼 클릭 시 간헐적 노출
- **현재 상태:** 트래픽 확보 후 애드센스 신청 예정

## 5. SEO 전략

- 다국어 경로: `/en/json-viewer`, `/ko/json-viewer`, `/ja/json-viewer`
- 각 언어별 핵심 키워드 메타 태그 삽입 (svelte-meta-tags)
- 동적 sitemap.xml 생성 → 구글 서치 콘솔 등록
- 각 도구 페이지별 SEO 최적화된 h1, intro, FAQ 콘텐츠

## 6. 실행 로드맵

### Phase 1: 빌드 — Done

- [x] SvelteKit 정적 사이트 구조
- [x] Monaco Editor 연동 및 JSON 처리 로직
- [x] Dark/Light 모드 및 반응형 레이아웃
- [x] 5개 도구 (Viewer, Formatter, Minifier, JSON→TS, JSON→YAML)
- [x] PWA 오프라인 지원

### Phase 2: SEO 최적화 — Done

- [x] 다국어 경로 설정 (en, ko, ja)
- [x] 각 언어별 메타 태그 및 키워드 삽입
- [x] sitemap.xml 자동 생성
- [ ] 구글 서치 콘솔 등록 및 인덱싱 확인

### Phase 3: 수익화 및 확장 — Pending

- [ ] 트래픽 발생 확인 후 애드센스 신청
- [ ] 광고 배치 구현 (상단 배너, 사이드바, 전면 광고)
- [ ] 확장 도구 후보: XML Viewer, YAML Converter, CSV ↔ JSON 등

## 7. 핵심 성공 지표 (KPI)

| 지표 | 목표 |
|---|---|
| 구글 검색 노출 | "JSON Viewer" 등 주요 키워드 3페이지 이내 |
| 페이지 체류 시간 | 평균 2분 이상 (에디터 사용 시간 확보) |
| 서버 비용 | 0원 유지 (Cloudflare Pages 무료 티어) |
