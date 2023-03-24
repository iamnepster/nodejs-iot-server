const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const mqtt = require("mqtt");
const { Sequelize, DataTypes } = require("sequelize");
const log = require("fancylog");

const app = express();
const port = 8080;
app.use(morgan("combined"));
app.use(helmet());
app.use(bodyParser.json());

const sequelize = new Sequelize("sqlite:./data/telemetry.db");

const DhtLog = sequelize.define("dht_log", {
  clientName: DataTypes.STRING,
  temperature: DataTypes.DOUBLE,
  humidity: DataTypes.DOUBLE,
  timestamp: DataTypes.DATE,
});

const mqttClient = mqtt.connect("mqtt://localhost:1883");

mqttClient.on("connect", () => {
  mqttClient.subscribe("climate");
});

mqttClient.on("message", async (_, message) => {
  await DhtLog.create(JSON.parse(message));
  log.info(`Saved entry to queue ${JSON.parse(message)}`);
});

app.get("/api/climate", async (_, res) => {
  const dhtLogs = await DhtLog.findAll();
  res.send(dhtLogs);
});

app.post("/api/climate", async (req, res) => {
  const payload = JSON.stringify(req.body);
  log.info(`Pushed entry to queue ${payload}`);
  mqttClient.publish("climate", payload);
  res.status(202).send();
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
