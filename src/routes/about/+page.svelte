<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { AUTHOR, GITHUB_URL } from '$lib/config/site';
	import AuthorByline from '$lib/components/ui/AuthorByline.svelte';
	import * as m from '$lib/paraglide/messages.js';
</script>

<MetaTags title={m.about_title()} description={m.about_description()} />

<div class="legal-page">
	<article class="legal-page__article prose prose-sm">
		<h1>{m.about_h1()}</h1>
		<AuthorByline />

		<h2>{m.about_section1_title()}</h2>
		<p>{m.about_section1_p1()}</p>
		<p>{m.about_section1_p2()}</p>

		<h2>{m.about_section2_title()}</h2>
		<p>{m.about_section2_p1()}</p>
		<ul>
			<li>{m.about_section2_li1()}</li>
			<li>{m.about_section2_li2()}</li>
			<li>{m.about_section2_li3()}</li>
			<li>{m.about_section2_li4()}</li>
		</ul>

		<h2>{m.about_section3_title()}</h2>
		<p>{m.about_section3_p1()}</p>
		<ul>
			<li>{m.about_section3_li1()}</li>
			<li>{m.about_section3_li2()}</li>
			<li>{m.about_section3_li3()}</li>
			<li>{m.about_section3_li4()}</li>
			<li>{m.about_section3_li5()}</li>
		</ul>

		<h2>{m.about_section4_title()}</h2>
		<p>{m.about_section4_p1()}</p>
		<p>{m.about_section4_p2()}</p>

		<h2>{m.about_section6_title()}</h2>
		<p>{m.about_section6_p1()}</p>
		<p>{m.about_section6_p2()}</p>
		<ul>
			<li>
				{m.contact_maintainer_name()}:
				<a href={AUTHOR.url} rel="noopener noreferrer author" target="_blank">{AUTHOR.name}</a>
			</li>
			<li>
				{m.contact_maintainer_name()} {m.contact_email_title()}:
				<a href="mailto:{AUTHOR.email}">{AUTHOR.email}</a>
			</li>
		</ul>

		<h2>{m.about_section5_title()}</h2>
		<p>{m.about_section5_p1()}</p>
		<p>
			<a href={GITHUB_URL} rel="noopener noreferrer" target="_blank">{GITHUB_URL}</a>
		</p>
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
