const morgan = require("morgan");
const logger = require("../config/logger.config");

module.exports = morgan(":method :url status :status - :response-time ms", {
  stream: { write: (message) => logger.http(message.trim()) },
});
