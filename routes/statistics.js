const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');
const authenticate = require('../middlewares/authenticate');

router.get('/summary', authenticate, statisticsController.getEmotionSummary);

module.exports = router;

router.get('/monthly', authenticate, statisticsController.getMonthlyEmotionStats);

router.get('/count', authenticate, statisticsController.getTotalEmotionCount);
