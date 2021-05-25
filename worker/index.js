const config = require("./config");
const redis = require("redis");

const redisClient = redis.createClient({
  host: config.redisHost,
  port: config.redisPort,
  retry_strategy: () => 1000,
});

const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 2) + fib(index - 1);
}

sub.on("message", (channel, message) => {
  redisClient.hset("values", message, fib(+message));
});

sub.subscribe("insert");
