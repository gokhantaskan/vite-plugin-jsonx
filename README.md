# vite-plugin-jsonx

[![CI](https://github.com/gokhantaskan/vite-plugin-jsonx/actions/workflows/main.yml/badge.svg)](https://github.com/gokhantaskan/vite-plugin-jsonx/actions/workflows/main.yml)
[![codecov](https://codecov.io/gh/gokhantaskan/vite-plugin-jsonx/graph/badge.svg)](https://codecov.io/gh/gokhantaskan/vite-plugin-jsonx)
[![npm version](https://img.shields.io/npm/v/vite-plugin-jsonx.svg)](https://www.npmjs.com/package/vite-plugin-jsonx)
[![npm downloads](https://img.shields.io/npm/dm/vite-plugin-jsonx.svg)](https://www.npmjs.com/package/vite-plugin-jsonx)
[![license](https://img.shields.io/npm/l/vite-plugin-jsonx.svg)](https://github.com/gokhantaskan/vite-plugin-jsonx/blob/main/LICENSE)

This is a Vite plugin that enables you to import JSONC and JSON5 files as modules in your Vite project.

## Features

- Import JSON5 files as modules
- Import JSONC files as modules
- Customizable parse options for both JSON5 and JSONC files

## Installation

You can install the plugin using npm:

    npm install vite-plugin-jsonx --save-dev

Or you can use yarn:

    yarn add vite-plugin-jsonx --dev

## Usage

To use this plugin, first add it to your vite.config.js or vite.config.ts:

```js
import { jsonX } from 'vite-plugin-jsonx';

export default {
  plugins: [
    jsonX()
  ]
}
```

or with custom options: 

```js
export default {
  plugins: [
    jsonX({
      json5ParserOptions // optional, custom parser options for json5
      jsoncParserOptions // optional, custom parser options for jsonc
    })
  ]
}
```

Add the following to your `env.d.ts` file:

```ts
/// <reference types="vite-plugin-jsonx/client" />
```

With this setup, you can now import JSONC and JSON5 files in your application:

    import datac from './data.jsonc';
    import data5 from './data.json5';

## Options

This plugin supports the following options:

- `jsoncParserOptions`: An optional object with custom parsing options for JSONC files. For more information, [visit the documentation](https://onury.io/jsonc//api#jsonc.safe.parse).
- `json5ParserOptions`: An optional object with custom parsing options for JSON5 files. For more information, [visit the documentation](https://github.com/json5/json5#json5parse).
