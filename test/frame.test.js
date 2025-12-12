const test = require("node:test");
const assert = require("node:assert/strict");
const { frame } = require("../src");
const { expectSnapshot } = require("./helpers/snapshot");

test("frame: returns a string and does not throw for basic input", () => {
  const out = frame("Hello");
  assert.equal(typeof out, "string");
  assert.ok(out.includes("Hello"));
});

test("frame: supports empty string and 0 (no falsy trap)", () => {
  assert.doesNotThrow(() => frame(""));
  assert.doesNotThrow(() => frame(0));
});

test("frame: supports Buffer input", () => {
  const out = frame(Buffer.from("Hi", "utf8"));
  assert.ok(out.includes("Hi"));
});

test("frame: normalizes Windows newlines", () => {
  const out = frame("A\r\nB\r\nC", { style: "ascii" });
  const lines = out.split("\n");

  // Extract framed content lines (ignore borders)
  const content = lines.filter((l) => l.startsWith("|") && l.endsWith("|"));

  assert.equal(content.length, 3);
  assert.ok(content[0].includes("A"));
  assert.ok(content[1].includes("B"));
  assert.ok(content[2].includes("C"));
});

test("frame: multiline width is based on longest line", () => {
  const out = frame("short\nmuch longer", { style: "ascii" });
  expectSnapshot("frame.snap.txt", out);
});

test("frame: vertical padding adds blank framed lines", () => {
  const out = frame("Hi", { style: "unicode", paddingY: 2 });
  const lines = out.split("\n");

  // top + padTop(2) + content(1) + padBottom(2) + bottom = 7
  assert.ok(lines.length >= 7);
});

test("frame: throws on invalid align", () => {
  assert.throws(() => frame("Hi", { align: "diagonal" }), /align must be one of/i);
});

test("frame: throws on invalid style object", () => {
  assert.throws(() => frame("Hi", { style: { h: "-" } }), /style must be a preset name/i);
});
