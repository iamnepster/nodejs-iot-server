const express = require("express");
const energyEntity = require("../database/energy.entity");
const { mqttClient } = require("../config/mqtt.config");
const logger = require("../config/logger.config");
const router = express.Router();

router.get("/", async (_, res) => {
  const energyEntities = await energyEntity.findAll();
  res.send(energyEntities);
});

router.post("/", async (req, res) => {
  const payload = JSON.stringify(req.body);
  mqttClient.publish("energy", payload);
  logger.mqtt(`Successfully published payload='${payload}' to topic='energy'`);
  res.status(202).send();
});

module.exports = router;
