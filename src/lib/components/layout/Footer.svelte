<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
</script>

<footer class="footer">
	<div class="footer__right">
		<a href="/about" class="footer__link">{m.footer_about()}</a>
		<a href="/contact" class="footer__link">{m.contact_title()}</a>
		<a href="/privacy" class="footer__link">{m.footer_privacy()}</a>
		<a href="/terms" class="footer__link">{m.footer_terms()}</a>
		<span class="footer__copyright">&copy; {new Date().getFullYear()} {m.copyright_text()}</span>
	</div>
</footer>

<style>
	@reference "../../../app.css";

	.footer {
		@apply px-4 md:px-6 py-3 flex flex-wrap items-center justify-end gap-2
		       bg-surface-container-lowest border-t
		       text-[0.75rem] font-medium;
		border-color: color-mix(in srgb, var(--md-outline-variant) 50%, transparent);
		color: var(--md-on-surface-variant);
	}
	.footer__right {
		@apply flex items-center gap-4;
	}
	.footer__link {
		@apply hover:text-on-surface transition-colors no-underline;
		color: var(--md-on-surface-variant);
	}
	.footer__copyright {
		@apply font-mono text-[0.6875rem];
		color: var(--md-outline);
	}
</style>
