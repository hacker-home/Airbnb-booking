const roomController = require('../controllers/room.js');
const reservationController = require('../controllers/reservation.js');
const router = require('express').Router();

router.get('/room', roomController.get);

router.get('/booking', reservationController.get);
router.post('/booking', reservationController.post);

module.exports = router;