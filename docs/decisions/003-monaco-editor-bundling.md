# 003. Monaco Editor 번들링 전략

- **상태**: 확정
- **일자**: 2026-02-25

## 맥락

Monaco Editor는 단일 청크로 약 3.3MB(gzip ~850KB)를 차지.
Vite의 기본 `chunkSizeWarningLimit`(500KB)을 크게 초과.

## 결정

- `vite.config.ts`에서 `build.chunkSizeWarningLimit: 4000`으로 경고 임계값 상향
- Monaco는 기존대로 **dynamic import**(`await import('$lib/monaco')`)로 lazy-load 유지
- `optimizeDeps.include: ['monaco-editor']`로 개발 서버 사전 번들링
- Worker는 `worker.format: 'es'`로 ES module 형식 사용

## 시도했으나 실패한 방법

- `rollupOptions.output.manualChunks`로 분리 시도 → SvelteKit SSR 빌드에서 external module 충돌 에러 발생

## 근거

- Monaco는 이미 lazy-load되어 초기 로딩에 영향 없음
- SvelteKit은 SSR/클라이언트를 동일 Vite config로 빌드하므로 `manualChunks` 사용 불가
- 경고 자체는 실질적 성능 문제가 아니므로 임계값 조정이 적절
