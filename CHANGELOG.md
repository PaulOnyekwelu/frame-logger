# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to Semantic Versioning.



## [2.4.0] — Testing & Reliability

### Added
- Comprehensive unit tests for framing and logging behavior
- Snapshot testing to prevent regressions in formatted output
- Cross-platform test tooling compatible with Windows, macOS, and Linux
- Continuous Integration via GitHub Actions

### Changed
- Improved test coverage for multiline, alignment, and padding edge cases



## [2.2.0] — Logging Semantics

### Added
- Logging API with `info`, `warn`, `error`, and `success` levels
- Correct stdout / stderr routing based on log level
- Optional labels and ISO timestamp support
- Ability to override output stream for advanced use cases


## [2.1.0] — Framing Engine

### Added
- Multi-line framing with longest-line width calculation
- Horizontal and vertical padding
- Text alignment (`left`, `center`, `right`)
- Multiple frame styles (`ascii`, `unicode`, `minimal`)
- Support for custom frame style objects


## [2.0.0] — Core API Redesign

### Added
- Pure `frame()` API returning deterministic string output
- Unicode-safe framing
- Extensible internal architecture

### Changed
- Removed falsy argument traps (e.g. `0`, empty string now valid input)
- Normalized newline handling across platforms


## [1.0.0] — Initial Release

### Added
- Basic message framing with repeated character borders
