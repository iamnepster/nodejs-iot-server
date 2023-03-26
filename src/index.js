const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const log = require("fancylog");
const database = require("./config/database.config");
const climateRouter = require("./rest/climate.routes");
const aedes = require("aedes")();
const mqttBroker = require("net").createServer(aedes.handle);
const { mqttPort } = require("./config/mqtt.config");
const morganConfig = require("./config/morgan.config");
require("./mqtt/climate.mqtt");

const app = express();
const port = 8080;

app.use(morganConfig);
app.use(helmet());
app.use(bodyParser.json());
app.use("/api/climate", climateRouter);

mqttBroker.listen(mqttPort, async () => {
  log.info(`Mqtt server started and listening on port ${mqttPort}`);

  try {
    await database.authenticate();
    await database.sync();
    log.info("Database connection has been established successfully");
  } catch (error) {
    log.error("Couldn't establish database connection:", error);
  }

  app.listen(port, () => {
    log.info(`Nodejs server started and listening on port ${port}`);
  });
});
