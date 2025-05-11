const express = require('express');
const app = express();

app.use(express.json());

const calendarRoutes = require('./routes/calendar');
const emotionRoutes = require('./routes/emotion');
const poemRoutes = require('./routes/poem');

app.use('/calendar', calendarRoutes);
app.use('/emotion', emotionRoutes);
app.use('/poem', poemRoutes);

app.listen(3000, () => console.log('서버 실행 중 (3000번 포트)'));
