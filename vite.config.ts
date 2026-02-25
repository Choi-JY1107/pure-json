import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		SvelteKitPWA({
			registerType: 'prompt',
			manifest: {
				name: 'PureJSON - Global JSON Viewer',
				short_name: 'PureJSON',
				description: 'Free online JSON viewer, formatter, validator. No server, no data leak.',
				theme_color: '#570df8',
				background_color: '#ffffff',
				display: 'standalone',
				start_url: '/en/json-viewer',
				scope: '/',
				icons: [
					{
						src: '/icons/icon-192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/icons/icon-512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: '/icons/icon-512-maskable.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				]
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
				maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
			}
		})
	],
	optimizeDeps: {
		include: ['monaco-editor']
	},
	build: {
		chunkSizeWarningLimit: 4000
	},
	worker: {
		format: 'es'
	}
});
