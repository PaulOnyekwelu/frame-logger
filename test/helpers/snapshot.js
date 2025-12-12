const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");

function snapshotPath(name) {
  return path.join(__dirname, "..", "__snapshots__", name);
}

function expectSnapshot(name, actual) {
  const p = snapshotPath(name);
  const update = process.env.UPDATE_SNAPSHOTS === "1";

  if (update) {
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, actual, "utf8");
    return;
  }

  if (!fs.existsSync(p)) {
    throw new Error(`Snapshot missing: ${name}. Run: npm run test:update to generate it.`);
  }

  const expected = fs.readFileSync(p, "utf8");
  assert.equal(actual, expected);
}

module.exports = { expectSnapshot };
