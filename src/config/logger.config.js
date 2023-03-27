const winston = require("winston");
const { createLogger, format, transports } = winston;
const { printf } = winston.format;
require("winston-daily-rotate-file");

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: "./logs/combined-%DATE%.log",
  datePattern: "DD-MM-YYYY",
  maxFiles: "3d",
});

const logFmt = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level}] ${message}`;
});

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  mqtt: 3,
  http: 4,
  sql: 5,
  debug: 6,
};

const logger = createLogger({
  levels: logLevels,
  level: process.env.LOG_LEVEL || "debug",
  format: format.combine(
    format.timestamp({
      format: "DD.MM.YYYY HH:mm:ss",
    }),
    format.align(),
    logFmt
  ),
  transports: [new transports.Console(), fileRotateTransport],
});

module.exports = logger;
