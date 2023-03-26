const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("sqlite:./data/telemetry.db", {
  logging: false,
});

module.exports = sequelize;
