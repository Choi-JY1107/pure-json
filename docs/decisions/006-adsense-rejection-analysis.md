# ADR-006: AdSense 승인 거절 분석 및 대응 계획

- **상태**: 종료 (2026-07-30). 후속 거절 대응은 [ADR-008](008-adsense-low-value-content.md) 참고
- **관련**: AdSense 정책 위반 "게시자 콘텐츠가 없는 화면에 Google 게재 광고"

> **후속 경과 (2026-07-30)**
> 이 ADR의 Phase 2 대응은 10개 도구 페이지에 **동일한 29키 템플릿**을 적용하는 방식이었고,
> 그 결과 다음 심사에서 **"가치 없는 콘텐츠"**로 다시 거절되었다.
> 아래 "페이지당 400-600단어 달성" 기록도 실측치(337~441단어)와 맞지 않는다.
> 원인 분석과 대응은 [ADR-008](008-adsense-low-value-content.md)에 있다.

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

### Phase 1: 필수 페이지 추가 — ✅ Done (2026-03-12)
- [x] Privacy Policy 페이지 (`/privacy`)
- [x] About 페이지 (`/about`)
- [x] Terms of Service 페이지 (`/terms`)

### Phase 2: 기존 페이지 콘텐츠 보강 — ✅ Done (2026-03-12)
- [x] 각 도구 페이지에 "How to Use" 섹션 추가 (3단계 사용법)
- [x] "Features" 섹션 추가 (4개 기능 목록)
- [x] "Use Cases" 섹션 추가 (3개 활용 사례)
- [x] FAQ를 5개로 확장, 답변 2-3문장으로 보강
- [x] DualPanelToolPage 공통 컴포넌트에 howto/features/usecases props 추가
- [x] JSON Diff 페이지 (커스텀 레이아웃)에도 동일 섹션 적용
- [x] 3개 언어(en, ko, ja) 모두 번역 완료
- 결과: 페이지당 약 400-600단어 달성

### Phase 3: 새 기능/페이지 추가 — ✅ Done (2026-03-11)
- [x] JSON → CSV 변환기
- [x] CSV → JSON 변환기
- [x] JSON → XML 변환기
- [x] JSON Key Sorter
- [x] JSON Diff (좌/우 비교)
- 결과: 총 13개 페이지 (도구 10 + about + privacy + terms)

### Phase 4: SEO/기술 정비 — ✅ Done (2026-03-12)
- [x] sitemap.xml에 신규 페이지(privacy, terms, about) 추가
- [x] robots.txt 도메인 purejson.org으로 수정
- [x] BASE_URL purejson.org으로 변경
- [x] 사이드바를 From JSON / To JSON 그룹으로 재구성
- [x] 상단 광고 제거 (하단 AdSlot만 유지)

### Phase 5: 재신청 — Pending
- [ ] Google Search Console에서 전체 페이지 인덱싱 확인
- [ ] sitemap.xml 재제출
- [ ] 인덱싱 완료 후 AdSense 재심사 요청
- [ ] 최소 트래픽 확보 (일 50-100+ 페이지뷰 권장)

## 현재 상태 요약 (2026-03-12)

| 항목 | 상태 |
|------|------|
| 페이지 수 | 13개 (목표 10+ 달성) |
| 페이지당 콘텐츠 | 400-600 words (목표 300-600 달성) |
| Privacy Policy | ✅ |
| Terms of Service | ✅ |
| About | ✅ |
| ads.txt | ✅ |
| sitemap.xml | ✅ (동적 생성, 13개 URL) |
| robots.txt | ✅ (purejson.org) |
| 다국어 지원 | ✅ (en, ko, ja) |

## 참고

- AdSense 도움말: "사이트에서 충분한 고유 콘텐츠와 우수한 사용자 환경을 제공하지 않는 경우" 거절
- 도구 사이트는 콘텐츠 부족으로 거절되기 쉬움 — 텍스트 보강이 핵심
- EthicalAds는 최소 월 5만 PV 요구로 현재 사용 불가 → 제거 완료
