export interface TreeNode {
	key: string;
	value: unknown;
	type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
	children?: TreeNode[];
	expanded?: boolean;
	depth: number;
	path: string;
}
