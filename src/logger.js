const { frame } = require("./frame");
const { normalizeOptions } = require("./normalize");

const LEVELS = {
  info: { label: "INFO", toStderr: false },
  warn: { label: "WARN", toStderr: true },
  error: { label: "ERROR", toStderr: true },
  success: { label: "OK", toStderr: false }
};

function buildLabel(opts) {
  const level = opts.level || "info";
  const meta = LEVELS[level] || LEVELS.info;

  const showLabel = opts.showLabel !== false;
  if (!showLabel) return "";

  const label = typeof opts.label === "string" && opts.label.length > 0 ? opts.label : meta.label;
  const ts = opts.timestamp ? new Date().toISOString() + " " : "";

  return `${ts}${label}: `;
}

function resolveStream(opts) {
  if (opts.stream && typeof opts.stream.write === "function") return opts.stream;

  const level = opts.level || "info";
  const meta = LEVELS[level] || LEVELS.info;

  return meta.toStderr ? process.stderr : process.stdout;
}

/**
 * Logs a framed message to stdout/stderr depending on level.
 * Returns the framed string for testability and reuse.
 */
function log(message, options) {
  const opts = normalizeOptions(options);
  const prefix = buildLabel(opts);

  // If prefix exists, prepend it to the first line only (keeps multi-line readable)
  const text = String(message ?? "");
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  if (prefix) lines[0] = prefix + lines[0];
  const framed = frame(lines.join("\n"), opts);

  const stream = resolveStream(opts);
  stream.write(framed + "\n");
  return framed;
}

// Convenience wrappers
function info(message, options = {}) {
  return log(message, { ...options, level: "info" });
}
function warn(message, options = {}) {
  return log(message, { ...options, level: "warn" });
}
function error(message, options = {}) {
  return log(message, { ...options, level: "error" });
}
function success(message, options = {}) {
  return log(message, { ...options, level: "success" });
}

module.exports = {
  log,
  info,
  warn,
  error,
  success,
  LEVELS
};
