const SAMPLE_JSON = `{
  "name": "PureJSON",
  "version": "1.0.0",
  "description": "Free Online JSON Tools",
  "features": [
    "JSON Viewer",
    "JSON Formatter",
    "JSON Validator",
    "JSON Minifier",
    "JSON to TypeScript",
    "JSON to YAML"
  ],
  "security": {
    "serverProcessing": false,
    "dataCollection": false,
    "cookies": false
  },
  "isAwesome": true
}`;

class EditorStore {
	input = $state('');
	output = $state('');
	error = $state('');

	setInput(value: string) {
		this.input = value;
		this.error = '';
	}

	setOutput(value: string) {
		this.output = value;
	}

	setError(message: string) {
		this.error = message;
		this.output = '';
	}

	clear() {
		this.input = '';
		this.output = '';
		this.error = '';
	}

	loadSample() {
		this.input = SAMPLE_JSON;
		this.error = '';
	}
}

const stores = new Map<string, EditorStore>();

function getEditorStore(key: string): EditorStore {
	if (!stores.has(key)) {
		stores.set(key, new EditorStore());
	}
	return stores.get(key)!;
}

export { EditorStore, getEditorStore };
