const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

// 월별 캘린더 개요 조회
router.get('/overview', calendarController.getCalendarOverview);

// 월별 감정 캘린더 조회
router.get('/emotion', calendarController.getCalendarEmotion);

module.exports = router;
