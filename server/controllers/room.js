const db = require('../../db/index.js');
const Room = require('../../db/models/rooms.js');
const cache = require('../cache.js');

exports.get = ((req, res) => {
  const id = req.query.id;
  Room.findAll({
    where: {
      id: id,
    },
  })
    .then((result) => {
      const room = result[0].dataValues;
      cache.saveToCache(id.toString(), JSON.stringify(room));
      res.send(room);
    })
    .catch((err) => {
      console.log('Error: ', err);
      res.sendStatus(500);
    });
});

