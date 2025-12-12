// src/normalize.js

function normalizeMessage(input) {
  if (input === undefined) {
    throw new TypeError("frame-logger: message is required.");
  }

  const text = Buffer.isBuffer(input) ? input.toString("utf8") : String(input);

  // Normalize newlines
  return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function normalizeOptions(options) {
  if (options === undefined) return {};
  if (options === null || typeof options !== "object") {
    throw new TypeError("frame-logger: options must be an object if provided.");
  }
  return options;
}

function normalizeAlign(value) {
  if (!value) return "left";
  if (value === "left" || value === "center" || value === "right") return value;
  throw new TypeError("frame-logger: align must be one of left|center|right.");
}

function normalizePadding(options) {
  const base = Number.isFinite(options.padding) ? options.padding : 0;
  const px = Number.isFinite(options.paddingX) ? options.paddingX : base;
  const py = Number.isFinite(options.paddingY) ? options.paddingY : base;

  const left = Number.isFinite(options.paddingLeft) ? options.paddingLeft : px;
  const right = Number.isFinite(options.paddingRight) ? options.paddingRight : px;
  const top = Number.isFinite(options.paddingTop) ? options.paddingTop : py;
  const bottom = Number.isFinite(options.paddingBottom) ? options.paddingBottom : py;

  const clampInt = (n) => Math.max(0, Math.floor(n));

  return {
    left: clampInt(left),
    right: clampInt(right),
    top: clampInt(top),
    bottom: clampInt(bottom)
  };
}

module.exports = {
  normalizeMessage,
  normalizeOptions,
  normalizeAlign,
  normalizePadding
};
