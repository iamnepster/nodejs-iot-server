const { mqttClient } = require("../config/mqtt.config");
const logger = require("../config/logger.config");
const energyEntity = require("../database/energy.entity");
const climateEntity = require("../database/climate.entity");

const climateTopic = "climate";
const energyTopic = "energy";

function subscribeToTopic(topic, mqttClient) {
  mqttClient.subscribe(topic);
  logger.mqtt(`Mqtt client successfully subscribed to topic='${topic}'`);
}

mqttClient.on("connect", () => {
  subscribeToTopic(energyTopic, mqttClient);
  subscribeToTopic(climateTopic, mqttClient);
});

mqttClient.on("message", async (topic, message) => {
  logger.mqtt(`Recieved payload=${message} for topic=${topic}`);
  switch (topic) {
    case energyTopic:
      await energyEntity.create(JSON.parse(message));
      break;
    case climateTopic:
      await climateEntity.create(JSON.parse(message));
      break;
    default:
      logger.error(`No mapping provided for topic='${topic}'`);
  }
});
