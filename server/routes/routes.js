const roomController = require('../controllers/room.js');
const reservationController = require('../controllers/reservation.js');
const cache = require('../cache.js');
const router = require('express').Router();
const renderReact = require('../templates/renderReact.js');

router.get('/room', cache.cache, roomController.get);
router.get('/booking', cache.cache, reservationController.get);
router.post('/booking', reservationController.post);

module.exports = router;