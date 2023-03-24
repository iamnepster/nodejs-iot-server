const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const mqtt = require("mqtt");
const { Sequelize, DataTypes } = require("sequelize");
const log = require("fancylog");
const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);
const mqtt_port = 1883;

server.listen(mqtt_port, function () {
  log.info(`Mqtt server started and listening on port ${mqtt_port}`);

  const mqttClient = mqtt.connect("mqtt://localhost:1883");
  log.info("Mqtt client connection successful");

  const app = express();
  const port = 8080;

  app.use(morgan("combined"));
  app.use(helmet());
  app.use(bodyParser.json());

  const sequelize = new Sequelize("sqlite:./data/telemetry.db");

  const DhtLog = sequelize.define("climate", {
    clientName: DataTypes.STRING,
    temperature: DataTypes.DOUBLE,
    humidity: DataTypes.DOUBLE,
    timestamp: DataTypes.DATE,
  });

  mqttClient.on("connect", () => {
    mqttClient.subscribe("climate");
  });

  mqttClient.on("message", async (_, message) => {
    await DhtLog.create(JSON.parse(message));
    log.info(`Successfully saved entry to database ${message}`);
  });

  app.get("/api/climate", async (_, res) => {
    const dhtLogs = await DhtLog.findAll();
    res.send(dhtLogs);
  });

  app.post("/api/climate", async (req, res) => {
    const payload = JSON.stringify(req.body);
    mqttClient.publish("climate", payload);
    log.info(`Successfully published entry to queue ${payload}`);
    res.status(202).send();
  });

  app.listen(port, async () => {
    log.info(`Nodejs server started and listening on port ${port}`);

    try {
      await sequelize.authenticate();
      await sequelize.sync();
      log.info("Database connection has been established successfully");
    } catch (error) {
      log.error("Couldn't establish database connection:", error);
    }
  });
});
