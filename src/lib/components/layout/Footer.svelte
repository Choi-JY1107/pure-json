<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';

	let { lang = 'en' }: { lang?: string } = $props();
</script>

<footer class="footer footer-center">
	<div class="footer__info">
		<p class="footer__tagline">
			🔒 {m.footer_tagline()}
		</p>
		<p class="footer__privacy">
			{m.footer_privacy()}
		</p>
	</div>
	<div class="footer__meta">
		<span>&copy; {new Date().getFullYear()} {m.copyright_text()}</span>
		<span>·</span>
		<span>{m.open_source()}</span>
	</div>
</footer>

<style>
	@reference "../../../app.css";

	.footer {
		@apply p-6 bg-base-200 text-base-content border-t border-base-300;
	}
	.footer__tagline {
		@apply font-semibold text-sm;
	}
	.footer__privacy {
		@apply text-xs text-base-content/70 mt-1;
	}
	.footer__meta {
		@apply flex gap-4 text-xs text-base-content/70;
	}
</style>
