const { default: adapter } = await import(
	process.env.CF_PAGES ? '@sveltejs/adapter-cloudflare' : '@sveltejs/adapter-static'
);

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
