import yaml from "js-yaml";

export function jsonToYaml(input: string): string {
  const parsed = JSON.parse(input);
  return yaml.dump(parsed, {
    indent: 2,
    lineWidth: 120,
    noRefs: true,
  });
}
