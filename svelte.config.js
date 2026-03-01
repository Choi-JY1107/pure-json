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
				'/json-to-typescript',
				'/json-to-yaml',
				'/sitemap.xml'
			]
		}
	}
};

export default config;
