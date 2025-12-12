const { resolveStyle } = require("./styles");
const {
  normalizeMessage,
  normalizeOptions,
  normalizeAlign,
  normalizePadding
} = require("./normalize");

function applyAlignment(line, width, align) {
  const gap = width - line.length;
  if (gap <= 0) return line;

  if (align === "right") return " ".repeat(gap) + line;
  if (align === "center") {
    const left = Math.floor(gap / 2);
    const right = gap - left;
    return " ".repeat(left) + line + " ".repeat(right);
  }
  // left
  return line + " ".repeat(gap);
}

function frame(message, options) {
  const text = normalizeMessage(message);
  const opts = normalizeOptions(options);

  const style = resolveStyle(opts.style);
  const align = normalizeAlign(opts.align);
  const pad = normalizePadding(opts);

  const lines = text.split("\n"); // preserve empty lines

  const contentWidth = lines.reduce((max, line) => Math.max(max, line.length), 0);

  const innerWidth = contentWidth + pad.left + pad.right;

  const topBorder = style.tl + style.h.repeat(innerWidth) + style.tr;
  const bottomBorder = style.bl + style.h.repeat(innerWidth) + style.br;

  const emptyContentLine =
    style.v + " ".repeat(innerWidth) + style.v;

  const out = [];
  out.push(topBorder);

  // Vertical padding (top)
  for (let i = 0; i < pad.top; i++) out.push(emptyContentLine);

  // Content lines
  for (const rawLine of lines) {
    const aligned = applyAlignment(rawLine, contentWidth, align);
    const body =
      " ".repeat(pad.left) +
      aligned +
      " ".repeat(pad.right);

    out.push(style.v + body + style.v);
  }

  // Vertical padding (bottom)
  for (let i = 0; i < pad.bottom; i++) out.push(emptyContentLine);

  out.push(bottomBorder);
  return out.join("\n");
}

function createFramer(defaultOptions = {}) {
  return (message, options = {}) => frame(message, { ...defaultOptions, ...options });
}

module.exports = { frame, createFramer };
