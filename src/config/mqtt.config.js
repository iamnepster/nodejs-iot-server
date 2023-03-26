const mqtt = require("mqtt");
const mqttPort = 1883;

const mqttClient = mqtt.connect(`mqtt://localhost:${mqttPort}`);

module.exports = { mqttPort, mqttClient };
