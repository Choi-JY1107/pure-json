import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { langEntries } from '$lib/config/site';

export const load: PageLoad = ({ params }) => {
	redirect(307, `/${params.lang}/json-viewer`);
};

export const entries = langEntries;
