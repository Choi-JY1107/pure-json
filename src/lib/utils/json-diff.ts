export type DiffEntry = {
	path: string;
	type: 'added' | 'removed' | 'changed';
	oldValue?: unknown;
	newValue?: unknown;
};

export function jsonDiff(leftInput: string, rightInput: string): DiffEntry[] {
	const left = JSON.parse(leftInput);
	const right = JSON.parse(rightInput);
	const diffs: DiffEntry[] = [];
	compare(left, right, '', diffs);
	return diffs;
}

export function formatDiff(diffs: DiffEntry[]): string {
	if (diffs.length === 0) return 'No differences found.';

	return diffs
		.map((d) => {
			switch (d.type) {
				case 'added':
					return `+ ${d.path}: ${JSON.stringify(d.newValue)}`;
				case 'removed':
					return `- ${d.path}: ${JSON.stringify(d.oldValue)}`;
				case 'changed':
					return `~ ${d.path}:\n    - ${JSON.stringify(d.oldValue)}\n    + ${JSON.stringify(d.newValue)}`;
			}
		})
		.join('\n');
}

function compare(left: unknown, right: unknown, path: string, diffs: DiffEntry[]): void {
	if (left === right) return;

	if (typeof left !== typeof right || Array.isArray(left) !== Array.isArray(right)) {
		diffs.push({ path: path || '(root)', type: 'changed', oldValue: left, newValue: right });
		return;
	}

	if (Array.isArray(left) && Array.isArray(right)) {
		const maxLen = Math.max(left.length, right.length);
		for (let i = 0; i < maxLen; i++) {
			const p = `${path}[${i}]`;
			if (i >= left.length) {
				diffs.push({ path: p, type: 'added', newValue: right[i] });
			} else if (i >= right.length) {
				diffs.push({ path: p, type: 'removed', oldValue: left[i] });
			} else {
				compare(left[i], right[i], p, diffs);
			}
		}
		return;
	}

	if (left !== null && right !== null && typeof left === 'object' && typeof right === 'object') {
		const leftObj = left as Record<string, unknown>;
		const rightObj = right as Record<string, unknown>;
		const allKeys = new Set([...Object.keys(leftObj), ...Object.keys(rightObj)]);

		for (const key of allKeys) {
			const p = path ? `${path}.${key}` : key;
			if (!(key in leftObj)) {
				diffs.push({ path: p, type: 'added', newValue: rightObj[key] });
			} else if (!(key in rightObj)) {
				diffs.push({ path: p, type: 'removed', oldValue: leftObj[key] });
			} else {
				compare(leftObj[key], rightObj[key], p, diffs);
			}
		}
		return;
	}

	diffs.push({ path: path || '(root)', type: 'changed', oldValue: left, newValue: right });
}
