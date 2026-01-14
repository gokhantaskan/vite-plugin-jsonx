import { describe, it, expect } from "vitest";
import { jsonX } from "../src/index";
import path from "path";
import fs from "fs/promises";
import os from "os";

const examplesDir = path.resolve(__dirname, "../examples");

describe("jsonX plugin", () => {
  const plugin = jsonX();

  describe("resolveId", () => {
    it("resolves .json5 files", () => {
      const resolveId = plugin.resolveId as (id: string) => string | null;
      expect(resolveId("config.json5")).toBe("config.json5");
      expect(resolveId("/path/to/file.json5")).toBe("/path/to/file.json5");
    });

    it("resolves .jsonc files", () => {
      const resolveId = plugin.resolveId as (id: string) => string | null;
      expect(resolveId("config.jsonc")).toBe("config.jsonc");
      expect(resolveId("/path/to/file.jsonc")).toBe("/path/to/file.jsonc");
    });

    it("returns null for other file types", () => {
      const resolveId = plugin.resolveId as (id: string) => string | null;
      expect(resolveId("config.json")).toBeNull();
      expect(resolveId("config.js")).toBeNull();
      expect(resolveId("config.ts")).toBeNull();
      expect(resolveId("file.json5.bak")).toBeNull();
    });
  });

  describe("load", () => {
    const load = plugin.load as (id: string) => Promise<string | null>;

    it("returns null for non-json5/jsonc files", async () => {
      expect(await load("config.json")).toBeNull();
      expect(await load("config.js")).toBeNull();
    });

    describe("JSON5 parsing", () => {
      it("parses example.json5 correctly", async () => {
        const filePath = path.join(examplesDir, "example.json5");
        const result = await load(filePath);

        expect(result).toContain("export default");
        expect(result).toContain('"unquoted"');
        expect(result).toContain('"and you can quote me on that"');
        expect(result).toContain("912559"); // 0xdecaf in decimal
      });

      it("handles JSON5 features", async () => {
        const tempFile = path.join(os.tmpdir(), "test-features.json5");
        await fs.writeFile(
          tempFile,
          `{
            // single line comment
            /* multi-line
               comment */
            unquoted: 'value',
            trailing: true,
          }`
        );

        const result = await load(tempFile);
        expect(result).toBe(
          'export default {"unquoted":"value","trailing":true};'
        );

        await fs.unlink(tempFile);
      });
    });

    describe("JSONC parsing", () => {
      it("parses example.jsonc correctly", async () => {
        const filePath = path.join(examplesDir, "example.jsonc");
        const result = await load(filePath);

        expect(result).toBe('export default {"name":"example"};');
      });

      it("strips comments from JSONC", async () => {
        const tempFile = path.join(os.tmpdir(), "test-comments.jsonc");
        await fs.writeFile(
          tempFile,
          `{
            // this is a comment
            "key": "value" /* inline comment */
          }`
        );

        const result = await load(tempFile);
        expect(result).toBe('export default {"key":"value"};');

        await fs.unlink(tempFile);
      });
    });

    describe("error handling", () => {
      it("throws descriptive error for invalid JSON5", async () => {
        const tempFile = path.join(os.tmpdir(), "invalid.json5");
        await fs.writeFile(tempFile, "{ invalid: }");

        await expect(load(tempFile)).rejects.toThrow(/Failed to parse/);
        await expect(load(tempFile)).rejects.toThrow(tempFile);

        await fs.unlink(tempFile);
      });

      it("throws descriptive error for invalid JSONC", async () => {
        const tempFile = path.join(os.tmpdir(), "invalid.jsonc");
        await fs.writeFile(tempFile, '{ "invalid": }');

        await expect(load(tempFile)).rejects.toThrow(/Failed to parse/);
        await expect(load(tempFile)).rejects.toThrow(tempFile);

        await fs.unlink(tempFile);
      });

      it("throws error for non-existent files", async () => {
        const nonExistent = "/path/to/nonexistent.json5";
        await expect(load(nonExistent)).rejects.toThrow();
      });
    });
  });

  describe("plugin options", () => {
    it("passes json5ParserOptions to parser", async () => {
      const customPlugin = jsonX({
        json5ParserOptions: (key, value) => {
          if (key === "secret") return undefined;
          return value;
        },
      });

      const tempFile = path.join(os.tmpdir(), "reviver.json5");
      await fs.writeFile(tempFile, '{ secret: "hidden", visible: "shown" }');

      const load = customPlugin.load as (id: string) => Promise<string | null>;
      const result = await load(tempFile);

      expect(result).toBe('export default {"visible":"shown"};');

      await fs.unlink(tempFile);
    });
  });

  describe("plugin metadata", () => {
    it("has correct plugin name", () => {
      expect(plugin.name).toBe("vite-plugin-jsonx");
    });
  });
});
