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

export const ADSENSE_CLIENT = 'ca-pub-4837179301443377';
export const ADSENSE_SLOT = '5281424133';

export const LOCALE_META = {
	en: { label: 'EN', nativeName: 'English' },
	ko: { label: '한', nativeName: '한국어' },
	ja: { label: '日', nativeName: '日本語' }
} as const;
