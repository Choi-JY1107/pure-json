let adapter;
try {
	adapter = (await import('@sveltejs/adapter-cloudflare')).default;
} catch {
	adapter = (await import('@sveltejs/adapter-static')).default;
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			entries: [
				'*',
				'/',
				'/json-formatter',
				'/json-minifier',
				'/json-sorter',
				'/json-to-typescript',
				'/json-to-yaml',
				'/json-to-csv',
				'/csv-to-json',
				'/json-to-xml',
				'/json-diff',
				'/guides',
				'/guides/what-is-json',
				'/guides/json-vs-yaml-xml',
				'/guides/json-syntax-errors',
				'/guides/json-rest-api',
				'/guides/json-schema',
				'/guides/large-json-files',
				'/about',
				'/contact',
				'/privacy',
				'/terms',
				'/sitemap.xml'
			]
		}
	}
};

export default config;
