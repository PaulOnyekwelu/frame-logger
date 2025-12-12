# frame-logger

A lightweight, dependency-free utility for framing and logging structured messages in Node.js applications and CI pipelines.

`frame-logger` focuses on **clear, readable console output** without the complexity of full logging frameworks. It is designed for scripts, developer tooling, and continuous integration environments where important messages must stand out.

## Motivation

Console output in automation scripts and CI pipelines is often noisy and unstructured, making it difficult to quickly identify important information such as failures, warnings, or key milestones.

`frame-logger` was created to address this problem by:

- Making important messages visually distinct
- Supporting multi-line messages with correct alignment
- Remaining small, deterministic, and dependency-free
- Separating formatting (pure functions) from output (logging)

The project intentionally focuses on **presentation and clarity**, rather than log aggregation or transport.


## Installation

```bash
npm install frame-logger
```

Node.js 18+ is recommended.


## Examples

### Basic Framing (Pure Function)

```js
const { frame } = require("frame-logger");

const output = frame("Hello world", {
  style: "unicode",
  padding: 1
});

console.log(output);
```

Output:

```
┌─────────────┐
│ Hello world │
└─────────────┘
```


### Multi-line Messages

```js
frame("Line one\nLine two\nLine three", {
  style: "ascii",
  align: "center"
});
```

The frame width is calculated based on the **longest line**, ensuring correct alignment.


### Logging with Levels

```js
const { info, warn, error, success } = require("frame-logger");

info("Starting build");
warn("Deprecated configuration detected");
error("Build failed\nCheck logs for details");
success("Deployment completed");
```

Log levels automatically select the appropriate output stream (`stdout` or `stderr`).


## API Reference

### `frame(message, options?)`

Returns a framed string. This function is **pure** and performs no I/O.

**Parameters**
- `message` — any value convertible to string
- `options` — optional configuration object

**Options**

| Option | Type | Description |
|------|------|-------------|
| `style` | string \| object | `ascii`, `unicode`, `minimal`, or a custom style object |
| `align` | string | `left`, `center`, or `right` |
| `padding` | number | Sets both horizontal and vertical padding |
| `paddingX`, `paddingY` | number | Axis-specific padding |
| `paddingLeft`, `paddingRight`, `paddingTop`, `paddingBottom` | number | Fine-grained padding control |



### `log(message, options?)`

Prints a framed message and returns the framed string.

Additional options:

| Option | Type | Description |
|------|------|-------------|
| `level` | string | `info`, `warn`, `error`, `success` |
| `showLabel` | boolean | Show or hide the level label (default: true) |
| `label` | string | Override label text |
| `timestamp` | boolean | Prefix an ISO timestamp |
| `stream` | Writable | Custom output stream |


### Convenience Methods

```js
info(message, options?)
warn(message, options?)
error(message, options?)
success(message, options?)
```

These are thin wrappers around `log()` with predefined log levels.


## CLI Usage

`frame-logger` is intentionally designed as a **library-first** tool.

At present, it does **not** expose a command-line interface. This design keeps the package lightweight and focused, while allowing it to be embedded easily in custom scripts, CLIs, and CI tooling.

A CLI wrapper may be introduced in a future major release if there is sufficient demand.


## License

ISC License.
