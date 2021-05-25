const keys = require("./config");

// SETUP EXPRESS
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser());

// SETUP pg

const { Pool } = require("pg");
const pgClient = new Pool({
  port: keys.pgPort,
  host: keys.pgHost,
  user: keys.pgUser,
  password: keys.pgPassword,
  database: keys.pgDatabase,
});

pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS table_values (number INT)")
    .catch((err) => console.error(err));
});

// REDIS CLIENT
const redis = require("redis");

const redisClient = redis.createClient({
  port: keys.redisPort,
  host: keys.redisHost,
  retry_strategy: () => 1000,
});

const redisPublisher = redisClient.duplicate();

// ROUTE HANDLER

app.get("/values/all", async (req, res) => {
  const resData = await pgClient.query("SELECT * FROM table_values");

  res.send(resData.rows);
});

app.get("/values/current", (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.send(values);
  });
});

app.post("/values", (req, res) => {
  const { index } = req.body;

  if (index > 40) {
    return res.status(422).send("Index is too high");
  }

  redisClient.hset("values", index, "Nothing yet!");
  redisPublisher.publish("insert", index);
  pgClient.query("INSERT INTO table_values(number) VALUES($1)", [index]);
});

app.listen(5000, (err) => {
  if (!err) console.log("LISTEN PORT: ", 5000);
});
