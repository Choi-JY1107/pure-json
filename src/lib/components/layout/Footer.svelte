<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
</script>

<footer class="footer">
	<div class="footer__left">
		<span class="material-symbols-outlined footer__lock-icon" style="font-variation-settings: 'FILL' 1;">lock</span>
		<span>{m.footer_tagline()}</span>
	</div>
	<div class="footer__right">
		<a href="/about" class="footer__link">{m.footer_about()}</a>
		<a href="/privacy" class="footer__link">{m.footer_privacy()}</a>
		<a href="/terms" class="footer__link">{m.footer_terms()}</a>
		<span class="footer__copyright">&copy; {new Date().getFullYear()} {m.copyright_text()}</span>
	</div>
</footer>

<style>
	@reference "../../../app.css";

	.footer {
		@apply px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-2
		       bg-surface-container-lowest border-t
		       text-[0.75rem] font-medium;
		border-color: color-mix(in srgb, var(--md-outline-variant) 50%, transparent);
		color: var(--md-on-surface-variant);
	}
	.footer__left {
		@apply flex items-center gap-2;
	}
	.footer__lock-icon {
		font-size: 0.875rem;
		color: var(--md-tertiary);
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
