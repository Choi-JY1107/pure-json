export function jsonToXml(input: string): string {
	const parsed = JSON.parse(input);
	const declaration = '<?xml version="1.0" encoding="UTF-8"?>\n';

	// An XML document must have exactly one root element. A top level array would
	// otherwise emit one <root> per item, so wrap it and give the items a tag.
	if (Array.isArray(parsed)) {
		if (parsed.length === 0) return declaration + '<root />';
		const items = parsed.map((item) => toXml(item, 'item', 1));
		return `${declaration}<root>\n${items.join('\n')}\n</root>`;
	}

	return declaration + toXml(parsed, 'root', 0);
}

/**
 * Turn a JSON key into a valid XML element name.
 *
 * Characters XML does not allow in a name become underscores. A name may not
 * start with a digit or a hyphen, so those get an underscore prefix rather than
 * being silently emitted as invalid markup.
 */
function toElementName(key: string): string {
	const cleaned = key.replace(/[^a-zA-Z0-9_-]/g, '_');
	if (cleaned === '') return '_';
	return /^[a-zA-Z_]/.test(cleaned) ? cleaned : `_${cleaned}`;
}

function toXml(value: unknown, tag: string, depth: number): string {
	const indent = '  '.repeat(depth);

	if (value === null || value === undefined) {
		return `${indent}<${tag} />`;
	}

	if (Array.isArray(value)) {
		if (value.length === 0) return `${indent}<${tag} />`;
		return value.map((item) => toXml(item, tag, depth)).join('\n');
	}

	if (typeof value === 'object') {
		const entries = Object.entries(value as Record<string, unknown>);
		if (entries.length === 0) return `${indent}<${tag} />`;
		const children = entries.map(([key, val]) => toXml(val, toElementName(key), depth + 1));
		return `${indent}<${tag}>\n${children.join('\n')}\n${indent}</${tag}>`;
	}

	const escaped = String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

	return `${indent}<${tag}>${escaped}</${tag}>`;
}
