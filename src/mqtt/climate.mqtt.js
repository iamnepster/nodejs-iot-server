const { mqttClient } = require("../config/mqtt.config");
const climateEntity = require("../database/climate.entity");
const log = require("fancylog");

mqttClient.on("connect", () => {
  mqttClient.subscribe("climate");
  log.info(`Mqtt client successfully subscribed to topic [climate]`);
});

mqttClient.on("message", async (_, message) => {
  log.debug(_);
  await climateEntity.create(JSON.parse(message));
  log.info(`Successfully saved entry to database ${message}`);
});
