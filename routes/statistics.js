const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');
const authMiddleware = require('../middlewares/authMiddleware'); // ✅ 인증 미들웨어 가져오기

router.get('/summary', authMiddleware, statisticsController.getEmotionSummary);
router.get('/monthly', authMiddleware, statisticsController.getMonthlyEmotionStats);
router.get('/count', authMiddleware, statisticsController.getTotalEmotionCount);
router.get('/yearly-happiness', authMiddleware, statisticsController.getYearlyHappinessStats);

module.exports = router;