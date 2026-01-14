import fs from "fs/promises";
import { jsonc } from "jsonc";
import json5 from "json5";
import type { Plugin } from "vite";

export interface PluginOptions {
  json5ParserOptions?: Parameters<typeof json5.parse>[1];
  jsoncParserOptions?: Parameters<typeof jsonc.safe.parse>[1];
}

/**
 * Vite plugin for importing JSONC and JSON5 files as JSON.
 *
 * @param options.json5ParserOptions - JSON5 parser options. See: https://github.com/json5/json5#json5parse
 * @param options.jsoncParserOptions - JSONC parser options. See: https://onury.io/jsonc/api#jsonc.safe.parse
 */
export function jsonX(options: PluginOptions = {}): Plugin {
  const { json5ParserOptions, jsoncParserOptions } = options;

  return {
    name: "vite-plugin-jsonx",

    resolveId(id) {
      if (id.endsWith(".json5") || id.endsWith(".jsonc")) {
        return id;
      }
      return null;
    },

    async load(id) {
      if (!id.endsWith(".json5") && !id.endsWith(".jsonc")) {
        return null;
      }

      try {
        const content = await fs.readFile(id, "utf-8");

        if (id.endsWith(".json5")) {
          const data = json5.parse(content, json5ParserOptions);
          return `export default ${JSON.stringify(data)};`;
        }

        if (id.endsWith(".jsonc")) {
          const [err, data] = jsonc.safe.parse(content, jsoncParserOptions);
          if (err) throw err;
          return `export default ${JSON.stringify(data)};`;
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to parse ${id}: ${message}`);
      }

      return null;
    },
  };
}
