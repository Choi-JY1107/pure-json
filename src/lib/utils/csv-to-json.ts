export function csvToJson(input: string): string {
	const lines = input.trim().split('\n');
	if (lines.length < 2) throw new Error('CSV must have a header row and at least one data row.');

	const headers = parseCsvLine(lines[0]);
	const rows = lines.slice(1).map((line) => {
		const values = parseCsvLine(line);
		const obj: Record<string, string> = {};
		headers.forEach((h, i) => {
			obj[h] = values[i] ?? '';
		});
		return obj;
	});

	return JSON.stringify(rows, null, 2);
}

function parseCsvLine(line: string): string[] {
	const result: string[] = [];
	let current = '';
	let inQuotes = false;

	for (let i = 0; i < line.length; i++) {
		const ch = line[i];
		if (inQuotes) {
			if (ch === '"') {
				if (line[i + 1] === '"') {
					current += '"';
					i++;
				} else {
					inQuotes = false;
				}
			} else {
				current += ch;
			}
		} else {
			if (ch === '"') {
				inQuotes = true;
			} else if (ch === ',') {
				result.push(current);
				current = '';
			} else {
				current += ch;
			}
		}
	}
	result.push(current);
	return result;
}
