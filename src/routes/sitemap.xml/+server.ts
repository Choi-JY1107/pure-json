import type { RequestHandler } from './$types';
import { PAGES, GUIDE_PAGES, BASE_URL } from '$lib/config/site';

export const prerender = true;

export const GET: RequestHandler = () => {
	const toolPages = PAGES.filter((p) => p !== 'json-viewer');

	const staticPages = ['about', 'privacy', 'terms'];

	const urls = [
		`
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`,
		...toolPages.map(
			(page) => `
  <url>
    <loc>${BASE_URL}/${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
		),
		`
  <url>
    <loc>${BASE_URL}/guides</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`,
		...GUIDE_PAGES.map(
			(page) => `
  <url>
    <loc>${BASE_URL}/guides/${page}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
		),
		...staticPages.map(
			(page) => `
  <url>
    <loc>${BASE_URL}/${page}</loc>
    <changefreq>monthly</changefreq>
    <priority>${page === 'about' ? '0.5' : '0.3'}</priority>
  </url>`
		)
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

	return new Response(xml.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
