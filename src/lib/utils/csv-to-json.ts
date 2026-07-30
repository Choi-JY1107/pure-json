export function csvToJson(input: string): string {
	const records = parseCsv(input);
	if (records.length < 2) throw new Error('CSV must have a header row and at least one data row.');

	const headers = records[0];
	const rows = records.slice(1).map((values) => {
		const obj: Record<string, string> = {};
		headers.forEach((h, i) => {
			obj[h] = values[i] ?? '';
		});
		return obj;
	});

	return JSON.stringify(rows, null, 2);
}

/**
 * Parse CSV text into rows of fields.
 *
 * Scans the whole document instead of splitting on newlines first, so a newline
 * inside a quoted field stays part of that field. Handles LF, CRLF and CR line
 * endings, and "" as an escaped double quote.
 */
function parseCsv(input: string): string[][] {
	const rows: string[][] = [];
	let row: string[] = [];
	let current = '';
	let inQuotes = false;
	// Tracks whether the current field was started at all, so a quoted empty
	// field ("") is not mistaken for a blank line.
	let sawField = false;

	const endField = () => {
		row.push(current);
		current = '';
		sawField = false;
	};
	const endRow = () => {
		endField();
		rows.push(row);
		row = [];
	};

	for (let i = 0; i < input.length; i++) {
		const ch = input[i];

		if (inQuotes) {
			if (ch === '"') {
				if (input[i + 1] === '"') {
					current += '"';
					i++;
				} else {
					inQuotes = false;
				}
			} else {
				current += ch;
			}
			continue;
		}

		if (ch === '"') {
			inQuotes = true;
			sawField = true;
		} else if (ch === ',') {
			endField();
		} else if (ch === '\r' || ch === '\n') {
			if (ch === '\r' && input[i + 1] === '\n') i++; // CRLF is one terminator
			// Skip blank lines rather than emitting a row of one empty field
			if (row.length > 0 || current !== '' || sawField) endRow();
		} else {
			current += ch;
			sawField = true;
		}
	}

	// Trailing record with no line terminator
	if (row.length > 0 || current !== '' || sawField) endRow();

	return rows;
}
