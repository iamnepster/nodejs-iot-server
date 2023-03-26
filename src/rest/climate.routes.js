const express = require("express");
const climateEntity = require("../database/climate.entity");
const { mqttClient } = require("../config/mqtt.config");
const log = require("fancylog");
const router = express.Router();

router.get("/", async (_, res) => {
  const climateEntities = await climateEntity.findAll();
  res.send(climateEntities);
});

router.post("/", async (req, res) => {
  const payload = JSON.stringify(req.body);
  mqttClient.publish("climate", payload);
  log.info(`Successfully published entry to queue ${payload}`);
  res.status(202).send();
});

module.exports = router;
