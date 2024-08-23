const express=  require('express');
const { addFeedback, getFeedbackAll } = require('../controllers/feedback.controller');

const router = express.Router();

router.post('/createFeedback', addFeedback);
router.get('/getFeedback', getFeedbackAll)

module.exports= router;