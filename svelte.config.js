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
				'/sitemap.xml'
			]
		}
	}
};

export default config;
