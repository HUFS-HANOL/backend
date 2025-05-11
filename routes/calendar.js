const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

// 월별 캘린더 조회
router.get('/overview', calendarController.getCalendarOverview);

module.exports = router;
