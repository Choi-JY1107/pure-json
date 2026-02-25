import { browser } from '$app/environment';

class ThemeStore {
	current = $state<'light' | 'dark'>('light');

	constructor() {
		if (browser) {
			this.current = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
		}
	}

	toggle() {
		this.current = this.current === 'light' ? 'dark' : 'light';
		if (browser) {
			localStorage.setItem('theme', this.current);
			document.documentElement.setAttribute('data-theme', this.current);
		}
	}

	get isDark() {
		return this.current === 'dark';
	}
}

export const theme = new ThemeStore();
