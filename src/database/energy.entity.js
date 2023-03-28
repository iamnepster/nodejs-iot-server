const sequelize = require("../config/database.config");
const { DataTypes } = require("sequelize");

const energyEntity = sequelize.define("energy", {
  clientName: DataTypes.STRING,
  watt: DataTypes.DOUBLE,
  timestamp: DataTypes.DATE,
});

module.exports = energyEntity;
