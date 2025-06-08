const express = require('express');
const router = express.Router();
const emotionController = require('../controllers/emotionController');

// 감정 저장
router.post('/', emotionController.saveEmotion);

// 감정 통계 조회
router.get('/stats', emotionController.getEmotionStats);

module.exports = router;
