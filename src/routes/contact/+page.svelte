<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import * as m from '$lib/paraglide/messages.js';

	const email = 'contact@purejson.org';
</script>

<MetaTags title={m.contact_title()} description={m.contact_description()} />

<div class="legal-page">
	<article class="legal-page__article prose prose-sm">
		<h1>{m.contact_h1()}</h1>
		<p>{m.contact_intro()}</p>

		<h2>{m.contact_email_title()}</h2>
		<p>{m.contact_email_p1()}</p>
		<p>
			<a href="mailto:{email}">{email}</a>
		</p>

		<h2>{m.contact_github_title()}</h2>
		<p>{m.contact_github_p1()}</p>

		<h2>{m.contact_response_title()}</h2>
		<p>{m.contact_response_p1()}</p>
	</article>
</div>

<style>
	@reference "../../app.css";

	.legal-page {
		@apply max-w-3xl mx-auto;
	}
	.legal-page__article {
		@apply max-w-none;
	}
</style>
