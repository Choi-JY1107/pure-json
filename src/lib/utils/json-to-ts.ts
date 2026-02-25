import JsonToTS from 'json-to-ts';

export function jsonToTypescript(input: string): string {
	const parsed = JSON.parse(input);
	const interfaces = JsonToTS(parsed);
	return interfaces.join('\n\n');
}
