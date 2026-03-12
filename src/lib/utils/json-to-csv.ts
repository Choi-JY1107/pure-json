export function jsonToCsv(input: string): string {
	const parsed = JSON.parse(input);
	const rows = Array.isArray(parsed) ? parsed : [parsed];

	if (rows.length === 0) return '';

	const headers = [...new Set(rows.flatMap((row) => Object.keys(row)))];
	const escapeCsv = (val: unknown): string => {
		if (val === null || val === undefined) return '';
		const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
		return str.includes(',') || str.includes('"') || str.includes('\n')
			? `"${str.replace(/"/g, '""')}"`
			: str;
	};

	const lines = [
		headers.join(','),
		...rows.map((row) => headers.map((h) => escapeCsv(row[h])).join(','))
	];

	return lines.join('\n');
}
