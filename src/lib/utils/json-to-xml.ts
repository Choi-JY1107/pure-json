export function jsonToXml(input: string): string {
	const parsed = JSON.parse(input);
	return '<?xml version="1.0" encoding="UTF-8"?>\n' + toXml(parsed, 'root', 0);
}

function toXml(value: unknown, tag: string, depth: number): string {
	const indent = '  '.repeat(depth);

	if (value === null || value === undefined) {
		return `${indent}<${tag} />`;
	}

	if (Array.isArray(value)) {
		return value.map((item) => toXml(item, tag, depth)).join('\n');
	}

	if (typeof value === 'object') {
		const entries = Object.entries(value as Record<string, unknown>);
		if (entries.length === 0) return `${indent}<${tag} />`;
		const children = entries.map(([key, val]) => {
			const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, '_');
			return toXml(val, safeKey, depth + 1);
		});
		return `${indent}<${tag}>\n${children.join('\n')}\n${indent}</${tag}>`;
	}

	const escaped = String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

	return `${indent}<${tag}>${escaped}</${tag}>`;
}
