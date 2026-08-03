<script lang="ts">
	import { AUTHOR, CONTENT_DATES } from '$lib/config/site';
	import * as m from '$lib/paraglide/messages.js';

	let { updated = CONTENT_DATES.modified }: { updated?: string } = $props();
</script>

<div class="byline not-prose">
	<span class="byline__item">
		<span class="material-symbols-outlined byline__icon">person</span>
		<span class="byline__label">{m.byline_written_by()}</span>
		<a class="byline__author" href={AUTHOR.url} rel="noopener noreferrer author" target="_blank">
			{AUTHOR.name}
		</a>
	</span>
	<span class="byline__item">
		<span class="material-symbols-outlined byline__icon">update</span>
		<span class="byline__label">{m.byline_updated()}</span>
		<time class="byline__value" datetime={updated}>{updated}</time>
	</span>
</div>

<style>
	@reference "../../../app.css";

	/* `not-prose` is a Typography plugin class and cannot go through @apply, so it
	   sits on the element itself. */
	.byline {
		@apply flex flex-wrap items-center gap-x-5 gap-y-1.5 py-3;
	}
	.byline__item {
		@apply inline-flex items-center gap-1.5;
	}
	.byline__icon {
		font-size: 0.9375rem;
		color: var(--md-outline);
	}
	.byline__label {
		@apply font-mono text-[0.625rem] uppercase tracking-widest;
		color: var(--md-outline);
	}
	.byline__author {
		@apply text-[0.75rem] font-semibold no-underline transition-colors;
		color: var(--md-on-surface);
	}
	.byline__author:hover {
		color: var(--md-primary);
	}
	.byline__value {
		@apply font-mono text-[0.6875rem];
		color: var(--md-on-surface-variant);
	}
</style>
