const express = require('express');
const { createEvent, getRecentEvents, getAllEvents } = require('../controllers/event.controller');

const router = express.Router();

router.post('/addEvent', createEvent);
router.get('/getRecentEvents', getRecentEvents);
router.get('/getAllEvents', getAllEvents);

module.exports = router;