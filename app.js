const express = require('express');
const app = express();

app.use(express.json());

// calendar 관련 라우트
const calendarRoutes = require('./routes/calendar');
const emotionRoutes = require('./routes/emotion');
const poemRoutes = require('./routes/poem');

// ✅ 각각의 세부 라우트 등록
app.use('/calendar', calendarRoutes);               // GET /calendar/emotion, /calendar/overview 등
app.use('/calendar/emotion', emotionRoutes);        // POST /calendar/emotion, GET /calendar/emotion/stats
app.use('/calendar/poem', poemRoutes);              // POST /calendar/poem/like

module.exports = app;
