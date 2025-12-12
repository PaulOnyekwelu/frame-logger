const { frame, createFramer } = require("./frame");
const { log, info, warn, error, success } = require("./logger");

module.exports = {
  // Framing (pure)
  frame,
  createFramer,

  // Logging (side effects)
  log,
  info,
  warn,
  error,
  success
};
