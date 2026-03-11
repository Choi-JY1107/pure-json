# ADR-006: AdSense 승인 거절 분석 및 대응 계획

- **상태**: 기록 (2026-03-11)
- **관련**: AdSense 정책 위반 "게시자 콘텐츠가 없는 화면에 Google 게재 광고"

## 현재 상황

AdSense 심사에서 반복적으로 거절당하고 있음.
거절 사유: **"게시자 콘텐츠가 없는 화면에 Google 게재 광고"** (Insufficient content)

## 거절 원인 분석

### 1. 텍스트 콘텐츠 절대 부족

| 페이지 | 텍스트 콘텐츠 |
|--------|-------------|
| `/` (JSON Viewer) | intro 1문단 + FAQ 3개 (각 1문장) ≈ 100단어 |
| `/json-formatter` | intro 1문단 + FAQ 2개 ≈ 80단어 |
| `/json-minifier` | intro 1문단 + FAQ 2개 ≈ 80단어 |
| `/json-to-typescript` | intro 1문단 + FAQ 2개 ≈ 80단어 |
| `/json-to-yaml` | intro 1문단 + FAQ 2개 ≈ 80단어 |

Google은 **페이지당 최소 300-600단어**의 고유 텍스트 콘텐츠를 권장.
현재 각 페이지는 100단어 미만으로 기준에 크게 미달.

### 2. 도구 UI는 콘텐츠로 인정되지 않음

Google 크롤러는 JavaScript로 렌더링된 에디터 UI, 버튼, 모달 등을 "콘텐츠"로 간주하지 않음.
페이지 대부분이 Monaco Editor UI로 구성되어 있어 크롤러 입장에서는 빈 페이지에 가까움.

### 3. 페이지 수 부족

현재 5개 페이지뿐. AdSense는 보통 **10-15개 이상**의 콘텐츠 페이지를 기대함.

### 4. 필수 정책 페이지 부재

- About 페이지: 없음
- Contact 페이지: 없음
- Privacy Policy: 없음
- Terms of Service: 없음

AdSense는 이 페이지들을 필수로 요구함.

## AdSense 승인을 위한 로드맵

### Phase 1: 필수 페이지 추가
- [ ] Privacy Policy 페이지 (`/privacy`)
- [ ] About 페이지 (`/about`)
- [ ] Terms of Service 페이지 (`/terms`)

### Phase 2: 기존 페이지 콘텐츠 보강
- [ ] 각 도구 페이지에 "How to Use" 섹션 추가 (단계별 사용법)
- [ ] "Features" 섹션 추가 (주요 기능 목록)
- [ ] FAQ를 5-6개로 확장, 답변도 2-3문장으로 보강
- [ ] intro를 2-3 문단으로 확장
- [ ] 목표: 페이지당 400-600단어

### Phase 3: 새 기능/페이지 추가
- [ ] 새 JSON 도구 추가 (JSON Diff, JSON Schema Validator 등)
- [ ] 블로그/가이드 콘텐츠 ("JSON이란?", "JSON vs YAML 비교" 등)
- [ ] 목표: 총 10개 이상의 콘텐츠 페이지

### Phase 4: 재신청
- [ ] 위 작업 완료 후 2주 대기 (Google 재크롤링)
- [ ] AdSense 재심사 요청

## 현재 조치

- AdSense 코드(`AdSlot.svelte`, `ADSENSE_CLIENT`, `ADSENSE_SLOT`)는 **삭제하지 않고 유지**
- 대안 광고로 **EthicalAds** 도입 (승인 기준이 낮고 개발자 도구 사이트에 적합)
- EthicalAds와 AdSense 코드가 공존하되, 광고 표시는 EthicalAds만 활성화

## 참고

- AdSense 도움말: "사이트에서 충분한 고유 콘텐츠와 우수한 사용자 환경을 제공하지 않는 경우" 거절
- 도구 사이트는 콘텐츠 부족으로 거절되기 쉬움 — 텍스트 보강이 핵심
