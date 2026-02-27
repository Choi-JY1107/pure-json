import { browser } from '$app/environment';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '$lib/config/site';
import { setLocale as paraglidSetLocale, getLocale } from '$lib/paraglide/runtime.js';

class LocaleStore {
	current = $state<Locale>(DEFAULT_LOCALE);

	constructor() {
		if (browser) {
			this.current = this.detectLocale();
			this.apply(this.current);
		}
	}

	set(locale: Locale) {
		this.current = locale;
		if (browser) {
			localStorage.setItem('preferred-locale', locale);
			document.documentElement.lang = locale;
		}
		paraglidSetLocale(locale, { reload: false });
	}

	private detectLocale(): Locale {
		// 1. localStorage
		const stored = localStorage.getItem('preferred-locale') as Locale | null;
		if (stored && LOCALES.includes(stored)) return stored;

		// 2. Paraglide current (cookie/globalVariable)
		try {
			const paraglideLocale = getLocale() as Locale;
			if (LOCALES.includes(paraglideLocale)) return paraglideLocale;
		} catch {
			// getLocale may throw if no locale found
		}

		// 3. navigator.languages
		const languages = navigator.languages ?? [navigator.language];
		for (const lang of languages) {
			const code = lang.slice(0, 2).toLowerCase() as Locale;
			if (LOCALES.includes(code)) return code;
		}

		// 4. fallback
		return DEFAULT_LOCALE;
	}

	private apply(locale: Locale) {
		paraglidSetLocale(locale, { reload: false });
		if (browser) {
			document.documentElement.lang = locale;
		}
	}
}

export const locale = new LocaleStore();
