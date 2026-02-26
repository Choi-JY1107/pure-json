import adapter from '@sveltejs/adapter-cloudflare';

// Canonical source: src/lib/config/site.ts
// Duplicated here because svelte.config.js runs in Node (no $lib alias)
const locales = ['en', 'ko', 'ja'];

const pages = [
	'',
	'json-viewer',
	'json-formatter',
	'json-minifier',
	'json-to-typescript',
	'json-to-yaml'
];

const entries = locales.flatMap((lang) => pages.map((page) => `/${lang}${page ? `/${page}` : ''}`));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: { entries: ['*', ...entries, '/sitemap.xml'] }
	}
};

export default config;
