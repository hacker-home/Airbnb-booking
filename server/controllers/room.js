const db = require('../../db/index.js');
const Room = require('../../db/models/rooms.js');

exports.get = ((req, res) => {
  Room.findAll({
    where: {
      id: Number.parseInt(req.query.id, 10),
    },
  })
    .then((result) => {
      res.send(result[0].dataValues);
    })
    .catch((err) => {
      console.log('Error: ', err);
      res.sendStatus(500);
    });
});

