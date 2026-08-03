<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';

	// The signature: a self-describing JSON object. The product's facts, as JSON.
	// Kept as code (English literals) on purpose — this is the artifact, not prose.
	type Tok = { k: string; v: string; t: 'string' | 'number' | 'keyword' };
	const lines: Tok[] = [
		{ k: 'name', v: '"PureJSON"', t: 'string' },
		{ k: 'tools', v: '10', t: 'number' },
		{ k: 'runsIn', v: '"your browser"', t: 'string' },
		{ k: 'dataLeaves', v: 'false', t: 'keyword' },
		{ k: 'tracking', v: 'null', t: 'keyword' },
		{ k: 'offline', v: 'true', t: 'keyword' },
		{ k: 'price', v: '"$0"', t: 'string' }
	];
</script>

<section class="hero">
	<div class="hero__intro">
		<span class="hero__eyebrow">{m.home_hero_eyebrow()}</span>
		<h1 class="hero__title">{m.home_hero_title()}</h1>
		<p class="hero__subtitle">{m.home_hero_subtitle()}</p>

		<div class="hero__actions">
			<a href="#workspace" class="hero__cta hero__cta--primary">
				<span class="material-symbols-outlined" style="font-size:1.125rem">bolt</span>
				{m.home_hero_cta_primary()}
			</a>
			<a href="/guides" class="hero__cta hero__cta--ghost">
				{m.home_hero_cta_secondary()}
				<span class="material-symbols-outlined" style="font-size:1.125rem">arrow_forward</span>
			</a>
		</div>
	</div>

	<!-- Signature: self-describing JSON -->
	<div class="hero__code" aria-hidden="true">
		<div class="hero__code-bar">
			<span class="hero__brace">&#123; &#125;</span>
			<span class="hero__filename">purejson.json</span>
		</div>
		<pre class="hero__pre"><span class="tok-punct">&#123;</span>
{#each lines as line, i (line.k)}<span class="hero__line" style="--i:{i}">  <span class="tok-key">"{line.k}"</span><span class="tok-punct">: </span><span class="tok-{line.t}">{line.v}</span>{#if i < lines.length - 1}<span class="tok-punct">,</span>{/if}
</span>{/each}<span class="tok-punct">&#125;</span><span class="hero__cursor"></span></pre>
	</div>
</section>

<style>
	@reference "../../../app.css";

	.hero {
		@apply grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-12 items-center
		       py-6 md:py-10 mb-2;
	}

	/* ── Intro column ── */
	.hero__eyebrow {
		@apply inline-block font-mono text-xs font-semibold mb-4 px-2.5 py-1 rounded-full;
		color: var(--md-primary);
		background: var(--md-primary-container);
		letter-spacing: 0.02em;
	}
	.hero__title {
		@apply font-headline font-extrabold leading-[1.05] tracking-tight m-0;
		font-size: clamp(2rem, 4.6vw, 3.25rem);
		color: var(--md-on-surface);
	}
	.hero__subtitle {
		@apply mt-4 text-base md:text-lg leading-relaxed max-w-xl;
		color: var(--md-on-surface-variant);
		white-space: pre-line;
	}

	.hero__actions {
		@apply mt-7 flex flex-wrap items-center gap-3;
	}
	.hero__cta {
		@apply inline-flex items-center gap-2 px-5 py-3 rounded-xl
		       text-sm font-semibold no-underline transition-all duration-150;
	}
	.hero__cta--primary {
		color: var(--md-on-primary);
		background: linear-gradient(135deg, var(--md-primary), var(--md-primary-dim));
		box-shadow: 0 10px 26px -10px color-mix(in srgb, var(--md-primary) 70%, transparent);
	}
	.hero__cta--primary:hover {
		filter: brightness(1.07);
		transform: translateY(-1px);
	}
	.hero__cta--ghost {
		color: var(--md-on-surface);
		background: var(--md-surface-container-high);
	}
	.hero__cta--ghost:hover {
		background: var(--md-surface-container-highest);
	}

	/* ── Code card (signature) ── */
	.hero__code {
		@apply rounded-2xl overflow-hidden;
		background: var(--md-surface-container-lowest);
		border: 1px solid color-mix(in srgb, var(--md-outline-variant) 60%, transparent);
		box-shadow: 0 24px 60px -30px color-mix(in srgb, var(--md-primary) 45%, transparent),
			0 8px 24px -12px rgba(0, 0, 0, 0.25);
	}
	.hero__code-bar {
		@apply flex items-center gap-2.5 px-4 h-11;
		background: var(--md-surface-container-low);
		border-bottom: 1px solid color-mix(in srgb, var(--md-outline-variant) 45%, transparent);
	}
	.hero__brace {
		@apply flex items-center justify-center w-6 h-6 rounded-md font-mono text-xs font-semibold;
		color: var(--md-primary);
		background: var(--md-primary-container);
		letter-spacing: -0.05em;
	}
	.hero__filename {
		@apply font-mono text-xs;
		color: var(--md-on-surface-variant);
	}
	.hero__pre {
		@apply font-mono m-0 p-5 md:p-6 overflow-x-auto;
		font-size: clamp(0.8125rem, 1.4vw, 0.95rem);
		line-height: 1.9;
		color: var(--md-on-surface);
	}
	.hero__line {
		@apply block;
		animation: hero-line-in 0.5s ease-out backwards;
		animation-delay: calc(var(--i) * 90ms + 150ms);
	}
	@keyframes hero-line-in {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
	}

	.tok-key {
		color: var(--md-primary);
	}
	.tok-string {
		color: var(--md-tertiary);
	}
	.tok-number {
		color: var(--color-syntax-number);
	}
	.tok-keyword {
		color: var(--color-syntax-keyword);
		font-weight: 500;
	}
	.tok-punct {
		color: var(--md-on-surface-variant);
	}

	.hero__cursor {
		@apply inline-block w-2 h-[1.1em] align-text-bottom ml-1;
		background: var(--md-primary);
		animation: hero-blink 1.1s step-end infinite;
	}
	@keyframes hero-blink {
		50% {
			opacity: 0;
		}
	}
</style>
