import type { TreeNode } from '$lib/types/tree';

function getType(value: unknown): TreeNode['type'] {
	if (value === null) return 'null';
	if (Array.isArray(value)) return 'array';
	return typeof value as TreeNode['type'];
}

export function parseJsonToTree(
	value: unknown,
	key: string = 'root',
	depth: number = 0,
	path: string = ''
): TreeNode {
	const type = getType(value);
	const node: TreeNode = {
		key,
		value,
		type,
		depth,
		path: path || key,
		expanded: depth < 2
	};

	if (type === 'object' && value !== null) {
		node.children = Object.entries(value as Record<string, unknown>).map(([k, v]) =>
			parseJsonToTree(v, k, depth + 1, `${path}.${k}`)
		);
	} else if (type === 'array') {
		node.children = (value as unknown[]).map((v, i) =>
			parseJsonToTree(v, String(i), depth + 1, `${path}[${i}]`)
		);
	}

	return node;
}
