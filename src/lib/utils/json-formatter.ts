/**
 * Re-indent JSON.
 *
 * `indent` is passed straight to JSON.stringify, so a number means that many
 * spaces and a string is used verbatim. Tab indentation therefore needs '\t',
 * not 1: JSON.stringify(v, null, 1) emits a single space.
 */
export function formatJson(input: string, indent: number | string = 2): string {
	const parsed = JSON.parse(input);
	return JSON.stringify(parsed, null, indent);
}

export function minifyJson(input: string): string {
	const parsed = JSON.parse(input);
	return JSON.stringify(parsed);
}
