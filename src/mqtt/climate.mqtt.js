const { mqttClient } = require("../config/mqtt.config");
const climateEntity = require("../database/climate.entity");
const logger = require("../config/logger.config");

mqttClient.on("connect", () => {
  mqttClient.subscribe("climate");
  logger.mqtt(`Mqtt client successfully subscribed to topic - climate`);
});

mqttClient.on("message", async (topic, message) => {
  logger.mqtt(`Recieved payload=${message} for topic=${topic}`);
  if (topic === "climate") {
    await climateEntity.create(JSON.parse(message));
  }
});
