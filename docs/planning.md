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
| JSON → CSV | JSON 배열을 CSV 형식으로 변환 | Done |
| CSV → JSON | CSV 데이터를 JSON 배열로 변환 | Done |
| JSON → XML | JSON을 XML 문서로 변환 | Done |
| JSON Key Sorter | 키를 알파벳순(asc/desc)으로 재귀 정렬 | Done |
| JSON Diff | 두 JSON 문서의 차이점 비교 | Done |
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
- [x] 10개 도구 (Viewer, Formatter, Minifier, JSON→TS, JSON→YAML, JSON→CSV, CSV→JSON, JSON→XML, Sorter, Diff)
- [x] PWA 오프라인 지원

### Phase 2: SEO 최적화 — Done

- [x] 다국어 경로 설정 (en, ko, ja) → 이후 lang prefix 제거 (ADR-005)
- [x] 각 언어별 메타 태그 및 키워드 삽입
- [x] sitemap.xml 자동 생성 (동적 서버 라우트, 13개 URL)
- [x] 구글 서치 콘솔 등록
- [ ] 전체 페이지 인덱싱 확인

### Phase 2.5: 교육 가이드 콘텐츠 — Done

- [x] GuidePage 공통 컴포넌트 생성
- [x] 가이드 인덱스 페이지 (`/guides`)
- [x] 6개 교육 가이드 (what-is-json, json-vs-yaml-xml, json-syntax-errors, json-rest-api, json-schema, large-json-files)
- [x] 사이드바에 Guides 그룹 추가
- [x] sitemap에 가이드 URL 추가
- [x] 3개 언어 번역 완료 (en, ko, ja)
- 각 가이드 800-1500 words, 도구 페이지 내부 링크 포함

### Phase 2.6: 전면 비주얼 리브랜딩 — Done

- [x] pure.json 아이덴티티 디자인 시스템 (`app.css` 팔레트/폰트/구문 토큰 전면 교체)
- [x] 레이아웃 크롬 리브랜딩 (브레이스 로고, 가독성 개선, 프라이버시 트러스트 배지 승격)
- [x] ToolPage 리스타일로 10개 도구 페이지 일괄 반영
- [x] 홈 히어로(자기 설명 JSON 시그니처) + 10개 도구 그리드(내부 링크) 추가
- [x] 모바일 에디터 높이 축소, 접근성 기본값(focus-visible, reduced-motion)
- [x] 3개 언어 히어로/그리드 카피 추가
- 상세: [ADR-007](decisions/007-visual-rebrand.md)

### Phase 3: AdSense 승인 대응 — In Progress

- [x] Privacy Policy, Terms of Service, About 페이지 추가
- [x] 5개 신규 도구 추가 (CSV, XML, Sorter, Diff)
- [x] 10개 도구 페이지 콘텐츠 보강 (howto, features, usecases, FAQ 5개)
- [x] 사이드바 From JSON / To JSON 그룹 분리
- [x] BASE_URL purejson.org 반영
- [x] robots.txt, sitemap.xml 도메인 수정
- [ ] Search Console 인덱싱 완료 대기
- [ ] AdSense 재신청
- 상세: [ADR-006](decisions/006-adsense-rejection-analysis.md)

### Phase 4: 수익화 — Pending

- [ ] AdSense 승인 후 광고 배치 최적화 (현재 하단 AdSlot만 활성)
- [ ] 트래픽 증가에 따른 추가 수익 전략

## 7. 핵심 성공 지표 (KPI)

| 지표 | 목표 |
|---|---|
| 구글 검색 노출 | "JSON Viewer" 등 주요 키워드 3페이지 이내 |
| 페이지 체류 시간 | 평균 2분 이상 (에디터 사용 시간 확보) |
| 서버 비용 | 0원 유지 (Cloudflare Pages 무료 티어) |
