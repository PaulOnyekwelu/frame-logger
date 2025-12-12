const STYLES = {
  ascii: { h: "-", v: "|", tl: "+", tr: "+", bl: "+", br: "+" },
  unicode: { h: "─", v: "│", tl: "┌", tr: "┐", bl: "└", br: "┘" },
  // CI-safe / minimal noise (still boxed)
  minimal: { h: "—", v: " ", tl: " ", tr: " ", bl: " ", br: " " }
};

const REQUIRED_STYLE_KEYS = ["h", "v", "tl", "tr", "bl", "br"];

function isValidStyleObject(style) {
  if (!style || typeof style !== "object") return false;
  return REQUIRED_STYLE_KEYS.every((k) => typeof style[k] === "string" && style[k].length > 0);
}

function resolveStyle(style) {
  if (!style) return STYLES.ascii;

  if (typeof style === "string") {
    return STYLES[style] || STYLES.ascii;
  }

  if (!isValidStyleObject(style)) {
    throw new TypeError(
      "frame-logger: style must be a preset name (ascii|unicode|minimal) or an object with keys: " +
        REQUIRED_STYLE_KEYS.join(", ")
    );
  }

  return style;
}

module.exports = { STYLES, resolveStyle, isValidStyleObject };
