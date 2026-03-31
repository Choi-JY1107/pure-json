<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';

</script>

<footer class="footer">
	<div class="footer__info">
		<p class="footer__tagline">
			🔒 {m.footer_tagline()}
		</p>
		<p class="footer__privacy">
			{m.footer_privacy_text()}
		</p>
	</div>
	<div class="footer__links">
		<a href="/about">{m.footer_about()}</a>
		<span>·</span>
		<a href="/privacy">{m.footer_privacy()}</a>
		<span>·</span>
		<a href="/terms">{m.footer_terms()}</a>
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
		@apply p-6 bg-surface-container-low text-on-surface border-t border-surface-container
		       flex flex-col items-center gap-2 text-center;
	}
	.footer__tagline {
		@apply font-semibold text-sm;
	}
	.footer__privacy {
		@apply text-xs text-on-surface/70 mt-1;
	}
	.footer__links {
		@apply flex gap-2 text-xs;
	}
	.footer__links a {
		@apply underline hover:no-underline;
	}
	.footer__meta {
		@apply flex gap-4 text-xs text-on-surface/70;
	}
</style>
