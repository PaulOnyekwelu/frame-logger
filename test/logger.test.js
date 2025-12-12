const test = require("node:test");
const assert = require("node:assert/strict");
const { info, warn, error, success, log } = require("../src");
const { expectSnapshot } = require("./helpers/snapshot");

function createMemoryStream() {
  let buf = "";
  return {
    write(chunk) {
      buf += String(chunk);
    },
    get output() {
      return buf;
    }
  };
}

test("log: writes framed output to provided stream and returns it", () => {
  const stream = createMemoryStream();
  const returned = log("Hello", { stream, style: "ascii", padding: 1 });

  assert.equal(stream.output, returned + "\n");
  assert.ok(returned.includes("Hello"));
});

test("level wrappers: include default labels on first line only", () => {
  const stream = createMemoryStream();
  info("Line1\nLine2", { stream, style: "ascii" });

  // Snapshot makes it easy to verify label placement and overall shape
  expectSnapshot("logger.snap.txt", stream.output);
});

test("timestamp option prefixes label with ISO timestamp", () => {
  const stream = createMemoryStream();
  success("Done", { stream, timestamp: true, style: "ascii" });

  // Basic check: ISO timestamp begins with YYYY-
  assert.match(stream.output, /\d{4}-\d{2}-\d{2}T/);
});

test("showLabel=false removes label", () => {
  const stream = createMemoryStream();
  warn("No label", { stream, showLabel: false, style: "ascii" });
  assert.doesNotMatch(stream.output, /WARN:/);
});
