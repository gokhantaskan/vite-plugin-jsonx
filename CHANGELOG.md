# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.3] - 2026-01-14

### Changed

- Migrated build tooling from tsdx to esbuild
- Switched to vitest for testing
- Switched to oxlint for linting
- Updated Node.js minimum version to 20
- Bumped all dev dependencies to latest versions

### Removed

- Removed tsdx dependency
- Removed legacy ESLint configuration

## [1.1.2] - 2024-12-15

### Changed

- Updated readme

## [1.1.1] - 2024-12-15

### Fixed

- Include client.d.ts in package

## [1.1.0] - 2024-12-15

### Added

- Client type declarations for better TypeScript support

## [1.0.0] - 2024-12-14

### Added

- Initial release
- Support for JSON5 (.json5) files
- Support for JSONC (.jsonc) files
- Vite plugin for importing extended JSON formats
