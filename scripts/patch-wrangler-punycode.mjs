#!/usr/bin/env node
/**
 * Stop wrangler's prebundled CLI from loading Node's deprecated `punycode` builtin.
 *
 * WHY
 * ---
 * wrangler ships a prebundled `wrangler-dist/cli.js` that inlines two very old
 * packages, both of which require punycode with a bare specifier:
 *
 *     whatwg-url@5.0.0/lib/url-state-machine.js   ->  __require("punycode")
 *     tr46@0.0.3/index.js                         ->  __require("punycode")
 *
 * A bare `require("punycode")` always resolves to the deprecated Node builtin,
 * never to node_modules/punycode. Reaching the userland package requires the
 * trailing slash form, `require("punycode/")`. Rewriting the specifier therefore
 * removes the deprecated call itself; it does not merely silence DEP0040.
 *
 * Only `toASCII`, `toUnicode` and `ucs2.decode` are used, and punycode@2.3.1
 * provides all three, so behaviour is unchanged.
 *
 * The warning surfaces during `vite build` because svelte.config.js loads
 * @sveltejs/adapter-cloudflare, which uses wrangler in-process. `wrangler
 * --version` and `wrangler deploy --dry-run` do not trigger it.
 *
 * This is interim remediation. The real fix belongs upstream in
 * cloudflare/workers-sdk, which should rebuild without those ancient packages.
 * Once it lands, delete this script and the postinstall hook.
 *
 * Matching is by string, not by line number, because the offending lines move
 * between wrangler releases (4.68.1 had them at 63093/63260, 4.115.0 at
 * 60981/61148). Upgrading wrangler does not fix the problem, so this needs to
 * keep working across versions.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';

const BARE = '__require("punycode")';
const USERLAND = '__require("punycode/")';

const require = createRequire(import.meta.url);

function resolveBundle() {
	// wrangler's exports map only exposes ".", "./experimental-config" and
	// "./package.json", so the dist file cannot be resolved as a subpath. Go
	// through package.json (which is exported) and read its main field, rather
	// than hardcoding a node_modules path that breaks under other hoisting layouts.
	let manifestPath;
	try {
		manifestPath = require.resolve('wrangler/package.json');
	} catch {
		return null;
	}

	const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
	const main = manifest.main ?? 'wrangler-dist/cli.js';
	const bundle = resolve(dirname(manifestPath), main);

	return existsSync(bundle) ? bundle : null;
}

function main() {
	const bundle = resolveBundle();
	if (!bundle) {
		// wrangler absent (e.g. a CI job that only runs lint) is not an error.
		console.log('[patch-wrangler-punycode] wrangler not found, nothing to do');
		return;
	}

	// The rewrite is pointless unless the userland package is actually resolvable.
	try {
		require.resolve('punycode/');
	} catch {
		console.error(
			'[patch-wrangler-punycode] punycode is not installed, skipping.\n' +
				'  Add it so the rewritten specifier resolves: npm i -D punycode'
		);
		return;
	}

	const source = readFileSync(bundle, 'utf8');
	const count = source.split(BARE).length - 1;

	if (count === 0) {
		// Either already patched, or a future wrangler fixed it upstream.
		const already = source.split(USERLAND).length - 1;
		console.log(
			already > 0
				? `[patch-wrangler-punycode] already patched (${already} occurrence(s))`
				: '[patch-wrangler-punycode] no bare punycode require found, wrangler may be fixed upstream'
		);
		return;
	}

	writeFileSync(bundle, source.split(BARE).join(USERLAND));
	console.log(`[patch-wrangler-punycode] rewrote ${count} bare punycode require(s) in ${bundle}`);
}

main();
