export const LOCALES = ['en', 'ko', 'ja'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const BASE_URL = 'https://purejson.org';
export const PAGES = [
	'json-viewer',
	'json-formatter',
	'json-minifier',
	'json-sorter',
	'json-to-typescript',
	'json-to-yaml',
	'json-to-csv',
	'csv-to-json',
	'json-to-xml',
	'json-diff'
] as const;

export const GUIDE_PAGES = [
	'what-is-json',
	'json-vs-yaml-xml',
	'json-syntax-errors',
	'json-rest-api',
	'json-schema',
	'large-json-files'
] as const;

export const ADSENSE_CLIENT = 'ca-pub-4837179301443377';
export const ADSENSE_SLOT = '5281424133';

/** Public source repository. Referenced from Contact, About, Privacy, Terms and the sidebar. */
export const GITHUB_URL = 'https://github.com/Choi-JY1107/pure-json';

/**
 * Site owner shown in author bylines and structured data.
 * `name` is what appears on the page — replace it with a legal name if you prefer.
 */
export const AUTHOR = {
	name: 'Choi JY',
	handle: 'Choi-JY1107',
	url: 'https://github.com/Choi-JY1107',
	email: 'contact@purejson.org'
} as const;

/** Publication dates used in Article structured data. Bump `modified` when content changes. */
export const CONTENT_DATES = {
	published: '2026-03-12',
	modified: '2026-07-30'
} as const;

export const LOCALE_META = {
	en: { label: 'EN', nativeName: 'English' },
	ko: { label: '한', nativeName: '한국어' },
	ja: { label: '日', nativeName: '日本語' }
} as const;
