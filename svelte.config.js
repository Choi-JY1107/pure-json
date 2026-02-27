import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: true,
			strict: true
		}),
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
