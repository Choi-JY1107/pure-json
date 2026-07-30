# ADR-008: AdSense "가치 없는 콘텐츠" 거절 대응

- **상태**: 구현 완료, 재심사 대기 (2026-07-30)
- **거절 사유**: "가치 없는 콘텐츠" (Low value content)
- **관련**: [ADR-006](006-adsense-rejection-analysis.md) (이전 거절: "게시자 콘텐츠가 없는 화면")

## 배경: ADR-006의 대응이 이번 거절을 만들었다

ADR-006은 "콘텐츠 부족" 거절에 대응해 10개 도구 페이지 전부에
`intro` + `howto` 3단계 + `features` 4개 + `usecases` 3개 + `faq` 5개라는
**동일한 템플릿**을 적용했다. 페이지당 400~600단어를 달성했다고 기록했지만,
실측 결과는 다음과 같았다.

| 항목 | ADR-006 주장 | 2026-07-30 실측 |
|------|-------------|----------------|
| 페이지당 단어 수 | 400~600 | **337~441** (평균 367) |
| 도구 10개 메시지 키 구조 | (기록 없음) | **9개가 완전히 동일한 29키 구조** |
| 사이트 전체 단어 수 | (기록 없음) | 8,269 |

구조가 같은 정도가 아니라 문장 골격까지 같았다. `"Paste your JSON into the input
panel on the left"` 같은 문구가 페이지마다 반복되었다. 즉 ADR-006은 콘텐츠 양 문제를
**템플릿 복제로 해결**했고, 그 결과 심사 기준이 "콘텐츠가 없다"에서
"콘텐츠가 프로그램으로 찍어낸 것처럼 보인다"로 옮겨간 것이다.

## 결정

**양을 늘리는 대신 도구별로 다른 종류의 콘텐츠를 만든다.**
같은 틀에 다른 단어를 채우는 방식을 버리고, 각 도구의 실제 구현 동작에서
그 도구에만 존재하는 기술적 내용을 뽑아낸다.

### 1. ToolPage에 4개 신규 섹션 추가

`src/lib/components/tool/ToolPage.svelte`에 도구별 고유 콘텐츠를 담는 슬롯을 추가했다.

| prop | 내용 | 차별화 근거 |
|------|------|-----------|
| `deep` | 3문단 심층 기술 해설 | 도구마다 주제가 완전히 다름 |
| `reference` | 3열 동작 레퍼런스 표 (입력 / 출력 / 설명) | 표의 행 자체가 도구별 고유 데이터 |
| `examples` | 실제 입출력 코드 블록 쌍 | 실행해서 확인한 실제 출력 |
| `pitfalls` | 함정 3개 (제목 / 설명 / 코드) | 도구별 실패 사례 |

`reference` 표와 `examples`의 첫 열은 코드이므로 번역하지 않고,
설명 열만 3개 언어로 번역했다. 코드 예시는 `.svelte`에 직접 둔다.

### 2. 모든 콘텐츠를 실행 검증 후 작성

레퍼런스 표와 예시에 적는 값은 전부 실제로 실행해서 확인한 출력이다.
이 과정에서 **문서가 주장하는 동작과 코드의 실제 동작이 다른 경우 4건**을 발견했고,
코드를 고쳤다(아래 "발견된 버그" 참고).

도구별 심층 주제:

- **Viewer** — 6개 노드 타입, `root.items[2].id` 경로 표기, 2단계 자동 펼침, 메모리 한계
- **Formatter** — 파싱/재직렬화 왕복의 숫자 정규화 (`1.0`→`1`, `1e3`→`1000`), 2^53 초과 정밀도 손실, 정수형 키 재배치
- **Minifier** — gzip 실측 비교 (원본 10,562B → 압축 6,154B로 41.7% 절감, 그러나 gzip 후에는 668B → 599B로 10.3%만 절감)
- **Sorter** — `localeCompare` vs 코드 포인트 정렬 차이, 숫자 키가 정렬 방향을 무시하는 문제
- **Diff** — 인덱스 기반 배열 대응, 순서 변경이 전 위치 변경으로 보고되는 이유
- **JSON→TS** — 선택성이 배열에서만 추론되는 이유, `null`→`null`, `[]`→`any[]`, `RootObject` 명명
- **JSON→YAML** — 노르웨이 문제와 js-yaml의 자동 인용 (`"no"`→`'no'`, `"1.10"`→`'1.10'`), 120자 접힌 블록 스칼라
- **JSON→CSV** — 인용 규칙, RFC 4180 이탈 2건 (LF 사용, BOM 없음), Excel 문자 깨짐 대응
- **CSV→JSON** — 전부 문자열로 내보내는 이유 (`07030`→`7030`, `1E5`→`100000` 방지)
- **JSON→XML** — XML 이름 규칙, 루트 배열과 숫자 시작 키 처리, 왕복 모호성

### 3. E-E-A-T: 익명 운영 해소

- `site.ts`에 `AUTHOR`(이름/핸들/URL/이메일), `GITHUB_URL`, `CONTENT_DATES` 추가
- `AuthorByline.svelte` 신규 컴포넌트를 도구 10개, 가이드 6개, About에 적용
- About/Contact의 "a small team of developers" 표현을 실명 단독 운영자로 교체
- 가이드에 `Article` JSON-LD (`author`/`publisher`/`datePublished`/`dateModified`)
- 도구 페이지에 `FAQPage` + `HowTo` JSON-LD
- `WebApplication` JSON-LD에 `author`/`publisher`/`codeRepository` 추가

### 4. 실재하지 않는 GitHub 주장 해소

`grep -rn "github.com" src/ static/` 결과가 **0건**이었는데,
카피 8곳이 "our GitHub repository"를 안내하고 있었다.
특히 `about_section6_p2`는 "the Contact page has an email and **a link to our GitHub**"라고
사실이 아닌 진술을 하고 있었다.

`GITHUB_URL`을 Contact(저장소 + 이슈), Privacy, Terms, About, 사이드바에 실제 링크로 삽입했다.
Privacy와 Terms의 문의 경로에는 이메일도 함께 넣어, 정책 문의가 막다른 길이 되지 않게 했다.

### 5. 기술 정비

- **canonical 태그 추가** — 기존에 전무했음 (`grep -rn "canonical" src/` → 0건)
- **AdSlot을 `{#key locale.current}` 밖으로 이동** — 언어 변경 시 `<ins>`가 재마운트되어
  같은 슬롯에 `adsbygoogle.push({})`가 두 번 실행되던 문제
- `privacy_last_updated` / `terms_last_updated`를 2026-07-30으로 갱신

## 발견된 버그 (콘텐츠 검증 과정에서)

문서에 적을 동작을 실행 검증하다가 코드가 주장과 다른 4건을 찾아 고쳤다.

1. **Formatter의 Tab 들여쓰기가 공백 1칸이었다**
   `json-formatter/+page.svelte`가 `indent = 1`을 넘겼고
   `JSON.stringify(v, null, 1)`은 탭이 아니라 공백 1칸을 출력한다.
   `formatJson`의 시그니처를 `number | string`으로 넓히고 `'\t'`를 넘기도록 수정.

2. **CSV 파서가 인용부호 안의 개행과 CRLF를 처리하지 못했다**
   `csv_to_json_faq_a2`는 "including fields with commas and newlines"라고 주장했지만,
   구현은 `input.trim().split('\n')`으로 먼저 줄을 쪼개고 있었다.
   문서 전체를 훑는 방식으로 `csv-to-json.ts`를 재작성. CRLF/CR/LF, 인용 내 개행,
   `""` 이스케이프, 빈 줄, 짧은 레코드를 모두 처리.

3. **루트가 배열이면 유효하지 않은 XML이 나왔다**
   최상위 요소가 여러 개(`<root>1</root><root>2</root>`)가 되어 파싱 불가.
   `<root>` 하나로 감싸고 각 항목을 `<item>`으로 출력하도록 수정.

4. **숫자로 시작하는 키가 유효하지 않은 XML 요소명이 되었다**
   `{"2nd":2}` → `<2nd>`. 이름 정제기가 허용되지 않는 문자만 치환하고
   선두 숫자/하이픈은 통과시켰다. `toElementName()`으로 분리하고 밑줄 접두사 추가.

이에 맞춰 `to_xml_faq_a1`("Is the generated XML valid?")의 답변도
근거를 갖춘 내용으로 다시 썼다.

## 결과

| 지표 | 이전 | 이후 |
|------|------|------|
| 도구 페이지 단어 수 | 337~441 (평균 367) | **984~1,179 (평균 1,112)** |
| 도구 10개 합계 | 3,667 | **11,117** |
| 사이트 전체 (도구 + 가이드) | 8,269 | **15,719** |
| 동일 키 구조를 공유하는 도구 페이지 | 9개 | 최대 5개 (키 이름만, 내용은 상이) |
| 도구 페이지 간 텍스트 유사도 | (템플릿 복제) | **평균 2.9%, 최대 4.4%** |
| i18n 키 (3개 언어 동기) | 708 | 1,003 |
| canonical 태그 | 없음 | 전 페이지 |
| GitHub 링크 | 0건 (8곳에서 허위 주장) | 실제 링크 |
| 저자 표기 | 없음 | 도구 10 + 가이드 6 + About |

## 남긴 것: 로케일별 URL (별도 결정 필요)

ko/ja 번역이 283KB 있지만 프리렌더 HTML은 경로당 영어 1종뿐이고 `hreflang`도 없다.
따라서 구글이 인덱싱할 수 있는 것은 영어 21페이지가 전부이며,
번역 투자분은 SEO상 보이지 않는다.

이를 고치려면 [ADR-005](005-remove-lang-prefix.md)에서 제거한 lang prefix를 되살리거나
다른 로케일 라우팅 전략을 도입해야 한다. 라우팅, 사이트맵, 모든 내부 링크,
`svelte.config.js`의 prerender entries가 함께 바뀌는 변경이므로
**재심사 직전에 손대지 않는다.** 승인 이후 별도 ADR로 다룬다.

## 재심사 체크리스트

빌드 산출물은 `build/`가 아니라 **`.svelte-kit/cloudflare/`** 이다.
`svelte.config.js`가 `adapter-cloudflare`를 먼저 선택하기 때문이며,
루트의 `build/`는 adapter-static 시절의 낡은 디렉토리라 확인에 쓰면 안 된다.
(이 착각으로 검증을 한 번 잘못했다.)

- [x] `.svelte-kit/cloudflare/guides/` 6개 + `contact.html` 생성 확인
- [x] 프리렌더 HTML 단어 수 확인 (도구 1,155~1,685 단어, 홈 1,685)
- [x] `deep`/`reference`/`examples`/`pitfalls` 텍스트가 프리렌더 HTML에 포함됨
      (Norway problem, 10.3 percent, 12345678901234567000, _2nd 스팟 체크)
- [x] canonical 태그가 페이지별 올바른 URL인지 확인
- [x] JSON-LD 확인 (도구: FAQPage + HowTo + Person / 가이드: Article + FAQPage + WebPage)
- [ ] Search Console에 sitemap 재제출 및 색인 생성 요청
- [ ] 색인 반영 확인 후 AdSense 재심사 신청

## 빌드 중 punycode DeprecationWarning (별건, 로컬 조치 완료)

### 원인

`wrangler`의 사전 번들 `wrangler-dist/cli.js`가 아주 오래된 패키지 두 개를 인라인해 두었고,
그 둘이 `punycode`를 bare specifier로 require한다.

```
whatwg-url@5.0.0/lib/url-state-machine.js  ->  __require("punycode")
tr46@0.0.3/index.js                        ->  __require("punycode")
```

bare `require("punycode")`는 항상 deprecated 내장 모듈로 해석되며,
`node_modules/punycode`로는 절대 가지 않는다. userland 패키지에 도달하려면
`require("punycode/")`처럼 슬래시가 필요하다.

`svelte.config.js`가 `@sveltejs/adapter-cloudflare`를 import하고
어댑터가 빌드 중 wrangler를 in-process로 사용하면서 로드된다.
`wrangler --version`과 `wrangler deploy --dry-run`은 경고를 내지 않는다.

### 규명 과정에서 확인한 것

- **`node_modules` 정적 grep은 오답을 준다.** grep하면 `tr46@1.0.1` / `whatwg-url@7.1.0`이
  잡히고 `@vite-pwa/sveltekit → workbox-build → source-map` 사슬로 이어지지만,
  이들은 빌드 중 한 번도 로드되지 않는다. 원인 규명은 반드시 `--trace-deprecation`으로 할 것.
- **wrangler 업그레이드로는 해결되지 않는다.** 4.68.1 → 4.115.0으로 올려도 bare require 2건이
  그대로 남는다. 줄 번호만 63093/63260 → 60981/61148로 이동했다.
- 쓰이는 API는 `toASCII`, `toUnicode`, `ucs2.decode` 셋뿐이고,
  내장(2.1.0)과 userland(2.3.1)의 결과가 IDN 케이스에서 모두 동일함을 확인했다.

### 조치

`scripts/patch-wrangler-punycode.mjs` + `package.json`의 `postinstall` 훅.
번들의 지정자 2개를 `"punycode/"`로 다시 쓴다.
경고를 끄는 것이 아니라 **deprecated 모듈이 실제로 로드되지 않게** 만드는 것이다.

설계상 선택한 점:

- **줄 번호가 아니라 문자열로 매칭한다.** 위에서 확인했듯 wrangler 릴리스마다 줄이 움직이므로
  `patch-package`의 라인 기반 diff는 업그레이드마다 깨진다. 문자열 치환은 버전에 무관하다.
- **경로는 `wrangler/package.json`을 거쳐 유도한다.** wrangler의 `exports` 맵이
  `.`, `./experimental-config`, `./package.json`만 노출하므로
  `require.resolve('wrangler/wrangler-dist/cli.js')`는 실패한다.
- **멱등이며 실패해도 install을 막지 않는다.** wrangler가 없거나 이미 패치되었거나
  상위에서 고쳐진 경우 모두 조용히 통과한다.
- `punycode`를 명시적 devDependency로 추가했다. 이전에는 `eslint → ajv → uri-js`를 통해
  우연히 hoist된 상태였고, 그 사슬이 바뀌면 치환된 지정자가 해석되지 않는다.

### 남은 일

진짜 근본 원인은 Cloudflare가 그 오래된 패키지들을 번들에 넣어둔 것이며 이 저장소에서 고칠 수 없다.
`cloudflare/workers-sdk`에 보고해야 하고, 상위에서 해결되면
`scripts/patch-wrangler-punycode.mjs`와 `postinstall` 훅을 삭제할 것.
스크립트는 그 시점에 "no bare punycode require found"를 출력하므로 제거 시점을 알 수 있다.

## npm audit (별건)

### `npm audit fix --force`를 절대 실행하지 말 것

`@sveltejs/kit`을 2.70.2에서 **0.0.30으로 다운그레이드**한다.
npm이 "취약한 의존성을 선언하지 않는 가장 오래된 버전"을 고르기 때문이며, 프로젝트가 통째로 깨진다.

### `brace-expansion` DoS 경고는 오탐이다 (조치 불필요)

`npm audit`은 `brace-expansion <=5.0.7`을 취약 범위로 보고하고,
설치된 사본은 `node_modules/filelist/node_modules/brace-expansion@2.1.3`이므로 걸린다.
그러나 **2.1.3은 이미 해당 CVE의 패치본이다.** 소스에 대응 코드가 들어 있다.

```js
var EXPANSION_MAX = 100000
// `EXPANSION_MAX` caps the *number* of expansions, but not their length. An
// ... (CVE-2026-14257). `EXPANSION_MAX_LENGTH` bounds the total number of
var EXPANSION_MAX_LENGTH = 4000000
```

주석이 명시하는 CVE-2026-14257이 곧 GHSA-mh99-v99m-4gvg다. 실측으로도 확인했다.

- `{0..100000000}` → 1억 개가 아니라 10만 개에서 잘림 (`EXPANSION_MAX`)
- 체인된 brace 그룹 12개로 총 길이를 노린 공격 → 총 길이 3,998,400에서 잘림
  (`EXPANSION_MAX_LENGTH` 바로 아래). 가드가 없으면 약 9.8MB로 팽창할 패턴이었다

**원인은 npm audit의 범위 데이터가 backport된 maintenance 라인을 이해하지 못하는 것이다.**
`brace-expansion`의 dist-tags를 보면 각 라인의 최신이 곧 패치본이다.

```
maintenance-v1: 1.1.17   maintenance-v2: 2.1.3
maintenance-v3: 3.0.5    latest: 5.0.8
```

audit은 이들을 `<=5.0.7`로 뭉뚱그려 전부 취약으로 표시한다.
2.1.3은 2.x 라인의 최신이므로 `minimatch@5.1.9`의 `^2.0.1` 범위 안에서 더 올릴 것도 없다.

> `workbox-build`를 7.4.0으로 고정하는 `overrides`를 한때 넣었다가 되돌렸다.
> 다운그레이드가 필요 없었고, 애초에 고칠 취약점이 없었다.
> 취약점 보고를 받으면 범위만 보고 판단하지 말고 **설치된 사본의 소스를 확인할 것.**

### `cookie` <0.7.0 (GHSA-pxg6-pf52-xh8x)

`@sveltejs/kit@2.70.2`가 취약 범위 `1.0.0-next.0 - 2.70.2`의 정확히 상한이다.
선언 범위가 `^2.16.0`이므로 **전진** 업그레이드로 해결된다.

```
npm i -D @sveltejs/kit@latest
```

실제 위험도는 사실상 없다. 이 사이트는 전 페이지 프리렌더이고 운영 환경에 서버 요청 처리가 없으며
서버에서 쿠키를 설정하지 않는다. 다만 수정 비용이 0이므로 올려두는 편이 낫다.

### 두 권고 모두 재심사를 막을 이유는 아니다

둘 다 빌드 타임 의존성이고 배포 산출물에 영향이 없다.
AdSense 재심사와 무관하게 처리하면 된다.

## 참고

- 도구 사이트가 "가치 없는 콘텐츠"로 걸리는 전형적 패턴은 콘텐츠 부족이 아니라
  **모든 도구 페이지가 같은 틀로 생성된 것**이다. ADR-006의 대응이 정확히 이 패턴을 만들었다.
- 차별화의 재료는 마케팅 문구가 아니라 **구현의 실제 동작**이다.
  각 도구의 유틸 코드를 읽고 실행해보면 그 도구에만 있는 이야기가 나온다.
- 검증 없이 쓴 문서는 허위 주장이 되고, 허위 주장은 그 자체로 감점 요인이다.
  이번에 4건이 그런 상태였다.
