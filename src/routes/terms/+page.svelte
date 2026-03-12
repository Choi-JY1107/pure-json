<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import * as m from '$lib/paraglide/messages.js';
</script>

<MetaTags title={m.terms_title()} description={m.terms_description()} />

<div class="legal-page">
	<article class="legal-page__article prose prose-sm">
		<h1>{m.terms_h1()}</h1>
		<p><em>{m.terms_last_updated()}</em></p>

		<h2>{m.terms_section1_title()}</h2>
		<p>{m.terms_section1_p1()}</p>

		<h2>{m.terms_section2_title()}</h2>
		<p>{m.terms_section2_p1()}</p>
		<ul>
			<li>{m.terms_section2_li1()}</li>
			<li>{m.terms_section2_li2()}</li>
			<li>{m.terms_section2_li3()}</li>
		</ul>

		<h2>{m.terms_section3_title()}</h2>
		<p>{m.terms_section3_p1()}</p>
		<ul>
			<li>{m.terms_section3_li1()}</li>
			<li>{m.terms_section3_li2()}</li>
			<li>{m.terms_section3_li3()}</li>
		</ul>

		<h2>{m.terms_section4_title()}</h2>
		<p>{m.terms_section4_p1()}</p>
		<p>{m.terms_section4_p2()}</p>

		<h2>{m.terms_section5_title()}</h2>
		<p>{m.terms_section5_p1()}</p>

		<h2>{m.terms_section6_title()}</h2>
		<p>{m.terms_section6_p1()}</p>

		<h2>{m.terms_section7_title()}</h2>
		<p>{m.terms_section7_p1()}</p>
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
