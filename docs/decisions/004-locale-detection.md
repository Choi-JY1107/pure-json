# 004. 브라우저 로케일 자동 감지

- **상태**: 확정
- **일자**: 2026-02-25

## 맥락

루트 URL(`/`) 접속 시 사용자를 적절한 언어 페이지로 리다이렉트해야 함.

## 결정

- `src/routes/+page.ts`에서 `navigator.languages`를 읽어 지원 로케일(en, ko, ja) 매칭
- 매칭되는 로케일이 없으면 기본값 `en` 사용
- 307 Temporary Redirect로 `/{locale}/json-viewer`로 이동

## 근거

- Static adapter 사용 → 서버 사이드 `Accept-Language` 헤더 파싱 불가
- `navigator.languages`는 브라우저에서 사용 가능한 가장 신뢰할 수 있는 로케일 정보
- 영구 리다이렉트(301)가 아닌 임시 리다이렉트(307)를 사용하여 언어 변경 후에도 캐싱 문제 방지
