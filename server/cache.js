
const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);

exports.cache = (req, res, next) => {
  const id = req.query.id;
  client.get(id.toString(), (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.send(data);
    } else {
      next();
    }
  })
}

exports.saveToCache = (key, data) => {
  client.setex(key, 3600, data);
}

