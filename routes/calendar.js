const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

// 월별 캘린더 개요 조회
router.get('/overview', calendarController.getCalendarOverview);

// 월별 감정 캘린더 조회
router.get('/emotion', calendarController.getCalendarEmotion);

// 감정 상태 저장 (POST /calendar/emotion)
router.post('/emotion', calendarController.saveEmotion);

router.get('/detail', calendarController.getDiaryDetailByDate);

// 감정 통계 라우터 추가
router.get('/emotions/stats', calendarController.getCalendarEmotionStats);

module.exports = router;
