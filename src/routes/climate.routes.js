const express = require("express");
const climateEntity = require("../database/climate.entity");
const { mqttClient } = require("../config/mqtt.config");
const logger = require("../config/logger.config");
const router = express.Router();

router.get("/", async (_, res) => {
  const climateEntities = await climateEntity.findAll();
  res.send(climateEntities);
});

router.post("/", async (req, res) => {
  const payload = JSON.stringify(req.body);
  mqttClient.publish("climate", payload);
  logger.mqtt(`Successfully published payload=${payload} to topic [climate]`);
  res.status(202).send();
});

module.exports = router;
