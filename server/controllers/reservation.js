const db = require('../../database/index.js');
const Reservations = require('../../database/models/reservations.js')
const cache = require('../cache.js');

const get = ((req, res) => {
  const id = req.query.id;
  Reservations.findOne({
    where: {
      roomId: id,
    },
  })
    .then((result) => {
      if (result === null) { res.sendStatus(200); }
      else {
        const reservation = result.dataValues;
        cache.saveToCache(id.toString(), JSON.stringify(reservation));
        res.send(reservation);
      }
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500);
    });
});

const post = ((req, res) => {
  console.log('testing', req.body)

  const data = {
    roomId: req.body.roomId,
    email: req.body.email,
    adults: req.body.guests.adults,
    children: req.body.guests.children,
    infants: req.body.guests.infants,
    check_in: new Date(req.body.check_in),
    check_out: new Date(req.body.check_out),
    createdAt: new Date(req.body.createdAt),
  };

  Reservations.bulkCreate([
    data,
  ], { validate: true })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = { get, post };
