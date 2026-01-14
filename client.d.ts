declare module "*.jsonc" {
  const value: Record<string, unknown>;
  export default value;
}

declare module "*.json5" {
  const value: Record<string, unknown>;
  export default value;
}
