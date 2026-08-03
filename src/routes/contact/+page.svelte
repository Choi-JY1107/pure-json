<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { AUTHOR, GITHUB_URL } from '$lib/config/site';
	import * as m from '$lib/paraglide/messages.js';

	const email = AUTHOR.email;
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
		<p>
			<a href="{GITHUB_URL}/issues" rel="noopener noreferrer" target="_blank">{GITHUB_URL}/issues</a>
		</p>

		<h2>{m.contact_response_title()}</h2>
		<p>{m.contact_response_p1()}</p>

		<h2>{m.contact_maintainer_title()}</h2>
		<p>{m.contact_maintainer_p1()}</p>
		<ul>
			<li>{m.contact_maintainer_name()}: {AUTHOR.name}</li>
			<li>
				{m.contact_maintainer_profile()}:
				<a href={AUTHOR.url} rel="noopener noreferrer" target="_blank">{AUTHOR.url}</a>
			</li>
			<li>
				{m.contact_maintainer_source()}:
				<a href={GITHUB_URL} rel="noopener noreferrer" target="_blank">{GITHUB_URL}</a>
			</li>
		</ul>
	</article>
</div>

<style>
	@reference "../../app.css";

	.legal-page__article {
		@apply max-w-none;
	}
</style>
