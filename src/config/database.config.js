const { Sequelize } = require("sequelize");
const logger = require("../config/logger.config");

const sequelize = new Sequelize("sqlite:./data/telemetry.db", {
  logging: (msg) => logger.sql(msg),
});

module.exports = sequelize;
