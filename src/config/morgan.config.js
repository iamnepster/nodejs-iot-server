const morgan = require("morgan");
const log = require("fancylog");

module.exports = morgan(":method :url status :status - :response-time ms", {
  stream: { write: (message) => log.info(message.trim()) },
});
