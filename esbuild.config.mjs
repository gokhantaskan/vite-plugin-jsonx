import * as esbuild from "esbuild";

const shared = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  external: ["vite", "json5", "jsonc"],
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
