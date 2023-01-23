const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");

const app = express();
const port = 8080;

app.get("/", async (_, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const sequelize = new Sequelize("postgres://postgres:test123@localhost:31000/postgres");

// const DhtLog = sequelize.define("dht_log", {
//   temperature: DataTypes.NUMBER,
//   humidity: DataTypes.NUMBER,
//   timestamp: DataTypes.DATE,
// });

// await sequelize.sync();

// app.get("/api/dht22", async (_, res) => {
//   const dhtLogs = await DhtLog.findAll();
//   res.send(dhtLogs);
// });

// app.post("/api/dht22", async (req, res) => {
//   const data = req.body;
//   saveLogEntry(data);
//   res.send(data);
// });

// async function bootstrapDatabase() {}

// async function saveLogEntry(dhtLog) {
//   await DhtLog.create(dhtLog);
// }
