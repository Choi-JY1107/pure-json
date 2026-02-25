import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { LOCALES, type Locale } from '$lib/config/site';
import { setLocale } from '$lib/paraglide/runtime.js';

export const load: LayoutLoad = ({ params }) => {
	const lang = params.lang as Locale;

	if (!LOCALES.includes(lang)) {
		error(404, 'Not found');
	}

	setLocale(lang, { reload: false });
	return { lang };
};
