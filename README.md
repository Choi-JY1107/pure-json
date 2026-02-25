# PureJSON

**No Server, No Data Leak.** — 100% 클라이언트 사이드 JSON 도구 모음

https://purejson.dev

## 프로젝트 개요

구글 검색 유입(SEO)을 통한 광고 수익 창출을 목표로 하는 JSON 도구 웹앱.
운영비 0원(Cloudflare Pages 무료 티어)으로 유지하며, 보안 강조를 통한 사용자 신뢰와 체류 시간 확보가 핵심 전략.

### 핵심 가치

- 모든 데이터 처리가 브라우저에서 완료 (서버 전송 없음)
- 쿠키 없음, 데이터 수집 없음
- PWA 지원으로 오프라인에서도 사용 가능

## 기능

| 도구 | 설명 |
|---|---|
| **JSON Viewer** | Monaco Editor 기반 코드 편집 + 인터랙티브 Tree View |
| **JSON Formatter** | 들여쓰기 옵션(2칸 / 4칸 / 탭)으로 JSON 정리 |
| **JSON Minifier** | 공백 제거 압축 + 절감률 표시 |
| **JSON → TypeScript** | JSON 데이터에서 TypeScript 인터페이스 자동 생성 |
| **JSON → YAML** | JSON을 YAML 형식으로 변환 |

## 기술 스택

- **Framework:** SvelteKit 2 + Svelte 5 (runes)
- **Build:** Vite 6, `adapter-static` (prerender)
- **Styling:** Tailwind CSS 4 + DaisyUI 5
- **Editor:** Monaco Editor (브라우저 내장 워커 활용)
- **i18n:** Inlang Paraglide JS (en, ko, ja)
- **PWA:** @vite-pwa/sveltekit (Workbox)
- **Deploy:** Cloudflare Pages (GitHub 연동 자동 배포)
- **Lint:** ESLint 9+ (flat config) + typescript-eslint + eslint-plugin-svelte

## 개발

```bash
npm install
npm run dev          # 개발 서버 (http://localhost:5173)
npm run build        # i18n 컴파일 + 프로덕션 빌드 → build/
npm run preview      # 빌드 결과 프리뷰
npm run check        # svelte-check 타입 검사
npm run lint         # ESLint
npm run lint:fix     # ESLint 자동 수정
```

## 프로젝트 구조

```
src/
├── routes/
│   ├── [lang]/                    # 언어별 라우트 (en, ko, ja)
│   │   ├── json-viewer/
│   │   ├── json-formatter/
│   │   ├── json-minifier/
│   │   ├── json-to-typescript/
│   │   └── json-to-yaml/
│   └── sitemap.xml/               # 동적 사이트맵
├── lib/
│   ├── components/
│   │   ├── editor/                # MonacoEditor, DualView, TreeView
│   │   ├── layout/                # Header, Sidebar, Footer
│   │   └── ui/                    # ThemeToggle, LocaleSwitcher, CopyButton
│   ├── config/                    # 사이트 설정 (로케일, 페이지 목록)
│   ├── monaco/                    # Monaco Editor 초기화
│   ├── paraglide/                 # [자동 생성] i18n 런타임
│   ├── stores/                    # 에디터·테마 상태
│   ├── types/                     # TypeScript 타입 정의
│   └── utils/                     # JSON 처리 유틸리티
i18n/
└── messages/                      # 번역 파일 (en.json, ko.json, ja.json)
docs/
├── planning.md                    # 기획안 및 로드맵
└── decisions/                     # ADR (Architecture Decision Records)
```

## 다국어 지원

URL 경로 기반 로케일 라우팅: `/{lang}/json-viewer`

| 언어 | 경로 |
|---|---|
| English | `/en/...` |
| 한국어 | `/ko/...` |
| 日本語 | `/ja/...` |

루트 URL(`/`) 접속 시 `navigator.languages` 기반으로 자동 리다이렉트.

## 배포

Cloudflare Pages에 GitHub 연동 자동 배포. `adapter-static` 사용으로 `build/` 디렉토리의 정적 파일을 서빙. Brotli/Gzip 사전 압축 포함.

## 라이선스

MIT
