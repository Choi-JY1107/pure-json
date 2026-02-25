# 002. i18n: Inlang Paraglide JS

- **상태**: 확정
- **일자**: 2026-02-25

## 맥락

다국어(en, ko, ja) 지원이 필요한 정적 사이트.
SSR/SSG 환경에서 URL 기반 로케일 라우팅(`/en/`, `/ko/`, `/ja/`)을 사용.

## 결정

- **Inlang Paraglide JS**를 i18n 솔루션으로 채택
- 메시지 파일: `i18n/messages/{locale}.json` (JSON 형식, snake_case 키)
- 빌드 시 `paraglide-js compile`로 `src/lib/paraglide/` 자동 생성
- 컴포넌트에서 `import * as m from '$lib/paraglide/messages.js'`로 사용

## 근거

- 컴파일 타임 i18n → 번들 크기 최소화, 런타임 오버헤드 없음
- SvelteKit의 `[lang]` 라우트 파라미터와 자연스럽게 통합
- 타입 안전성: 컴파일 시점에 누락 키 감지 가능

## 주의사항

- `src/lib/paraglide/` 디렉토리는 자동 생성 → 직접 수정 금지
- 새 메시지 키 추가 시 3개 언어 파일(en, ko, ja) 모두 업데이트 필요
