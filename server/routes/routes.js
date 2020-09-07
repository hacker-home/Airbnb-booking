const roomController = require('../controllers/room.js');
const reservationController = require('../controllers/reservation.js');
const cache = require('../cache.js');
const router = require('express').Router();

router.get('/room', cache.cache, roomController.get);
router.get('/booking', cache.cache, reservationController.get);
router.post('/booking', reservationController.post);

module.exports = router;