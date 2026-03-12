export function sortJson(input: string, order: 'asc' | 'desc' = 'asc'): string {
	const parsed = JSON.parse(input);
	const sorted = sortValue(parsed, order);
	return JSON.stringify(sorted, null, 2);
}

function sortValue(value: unknown, order: 'asc' | 'desc'): unknown {
	if (Array.isArray(value)) {
		return value.map((item) => sortValue(item, order));
	}

	if (value !== null && typeof value === 'object') {
		const entries = Object.entries(value as Record<string, unknown>);
		entries.sort(([a], [b]) => (order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)));
		const sorted: Record<string, unknown> = {};
		for (const [key, val] of entries) {
			sorted[key] = sortValue(val, order);
		}
		return sorted;
	}

	return value;
}
