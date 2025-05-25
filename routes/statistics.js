const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

// 인증 미들웨어 없이 바로 컨트롤러 함수 연결
router.get('/summary', statisticsController.getEmotionSummary);
router.get('/monthly', statisticsController.getMonthlyEmotionStats);
router.get('/count', statisticsController.getTotalEmotionCount);

module.exports = router;
