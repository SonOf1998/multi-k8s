const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;

  var a = 1
  var b = 1
  for (let i = 2; i < index; i++) {
    tmp = b
    b = a + b
    a = tmp
  }

  return b
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');
