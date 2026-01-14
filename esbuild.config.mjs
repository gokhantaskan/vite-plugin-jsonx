import * as esbuild from "esbuild";

/** @type {esbuild.BuildOptions} */
const shared = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "node20",
  external: ["vite", "json5", "jsonc"],
  sourcemap: true,
  logLevel: "info",
};

// CJS build
await esbuild.build({
  ...shared,
  outfile: "dist/index.js",
  format: "cjs",
});

// ESM build
await esbuild.build({
  ...shared,
  outfile: "dist/vite-plugin-jsonx.esm.js",
  format: "esm",
});

console.log("Build complete");
