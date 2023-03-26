const sequelize = require("../config/database.config");
const { DataTypes } = require("sequelize");

const climateEntity = sequelize.define("climate", {
  clientName: DataTypes.STRING,
  temperature: DataTypes.DOUBLE,
  humidity: DataTypes.DOUBLE,
  timestamp: DataTypes.DATE,
});

module.exports = climateEntity;
