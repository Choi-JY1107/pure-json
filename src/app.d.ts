/// <reference types="@sveltejs/kit" />
/// <reference types="@vite-pwa/sveltekit/info" />

interface Env {
	[key: string]: unknown;
}

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: Env;
			ctx: ExecutionContext;
			caches: CacheStorage;
			cf?: IncomingRequestCfProperties;
		}
	}
}

export {};
