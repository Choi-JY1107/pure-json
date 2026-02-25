import type { RequestHandler } from './$types';
import { LOCALES, PAGES, BASE_URL } from '$lib/config/site';

export const prerender = true;

export const GET: RequestHandler = () => {
	const urls = LOCALES.flatMap((lang) =>
		PAGES.map((page) => {
			const path = `/${lang}${page ? `/${page}` : ''}`;
			const alternates = LOCALES.map(
				(alt) =>
					`  <xhtml:link rel="alternate" hreflang="${alt}" href="${BASE_URL}/${alt}${page ? `/${page}` : ''}" />`
			).join('\n');

			return `
  <url>
    <loc>${BASE_URL}${path}</loc>
${alternates}
    <changefreq>weekly</changefreq>
    <priority>${page === '' || page === 'json-viewer' ? '1.0' : '0.8'}</priority>
  </url>`;
		})
	);

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

	return new Response(xml.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
