import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '$lib/config/site';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	let target: Locale = DEFAULT_LOCALE;

	if (browser) {
		const languages = navigator.languages ?? [navigator.language];
		for (const lang of languages) {
			const code = lang.slice(0, 2).toLowerCase() as Locale;
			if (LOCALES.includes(code)) {
				target = code;
				break;
			}
		}
	}

	redirect(307, `/${target}/json-viewer`);
};
