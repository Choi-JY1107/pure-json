import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			entries: [
				'*',
				'/json-viewer',
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
