const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// ✅ CORS 설정 
app.use(cors({
    origin: 'http://localhost:5173', // 
    credentials: true
}));

// ✅ JSON, 쿠키 파서
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ✅ 라우터 등록
const calendarRoutes = require('./routes/calendar');
const emotionRoutes = require('./routes/emotion');
const poemRoutes = require('./routes/poem');
const statisticsRoutes = require('./routes/statistics');

app.use('/api/calendar', calendarRoutes);
app.use('/api/emotion', emotionRoutes);
app.use('/api/poem', poemRoutes);
app.use('/api/statistics', statisticsRoutes);

module.exports = app;
