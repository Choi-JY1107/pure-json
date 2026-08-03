<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { AUTHOR, GITHUB_URL } from '$lib/config/site';
	import * as m from '$lib/paraglide/messages.js';
</script>

<MetaTags title={m.privacy_title()} description={m.privacy_description()} />

<div class="legal-page">
	<article class="legal-page__article prose prose-sm">
		<h1>{m.privacy_h1()}</h1>
		<p><em>{m.privacy_last_updated()}</em></p>

		<h2>{m.privacy_section1_title()}</h2>
		<p>{m.privacy_section1_p1()}</p>
		<p>{m.privacy_section1_p2()}</p>

		<h2>{m.privacy_section2_title()}</h2>
		<p>{m.privacy_section2_p1()}</p>
		<ul>
			<li>{m.privacy_section2_li1()}</li>
			<li>{m.privacy_section2_li2()}</li>
			<li>{m.privacy_section2_li3()}</li>
			<li>{m.privacy_section2_li4()}</li>
		</ul>

		<h2>{m.privacy_section3_title()}</h2>
		<p>{m.privacy_section3_p1()}</p>
		<p>{m.privacy_section3_p2()}</p>

		<h2>{m.privacy_section4_title()}</h2>
		<p>{m.privacy_section4_p1()}</p>
		<p>{m.privacy_section4_p2()}</p>

		<h2>{m.privacy_section5_title()}</h2>
		<p>{m.privacy_section5_p1()}</p>

		<h2>{m.privacy_section6_title()}</h2>
		<p>{m.privacy_section6_p1()}</p>

		<h2>{m.privacy_section7_title()}</h2>
		<p>{m.privacy_section7_p1()}</p>
		<ul>
			<li><a href="mailto:{AUTHOR.email}">{AUTHOR.email}</a></li>
			<li>
				<a href="{GITHUB_URL}/issues" rel="noopener noreferrer" target="_blank"
					>{GITHUB_URL}/issues</a
				>
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
