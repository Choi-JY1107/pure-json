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
		@apply h-10 px-6 flex items-center justify-between
		       bg-surface-container-lowest border-t border-outline-variant/10
		       text-[0.5625rem] uppercase tracking-widest font-medium text-outline;
	}
	.footer__left {
		@apply flex items-center gap-2;
	}
	.footer__lock-icon {
		font-size: 0.75rem;
		color: var(--md-tertiary);
	}
	.footer__right {
		@apply flex items-center gap-4;
	}
	.footer__link {
		@apply text-secondary hover:text-on-surface transition-colors no-underline;
	}
	.footer__copyright {
		@apply text-outline/60;
	}
</style>
