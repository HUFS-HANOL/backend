const calendarService = require('../services/calendarService');

exports.getCalendarOverview = async (req, res) => {
    const { userId, month } = req.query;
    try {
        const data = await calendarService.getCalendarOverview(userId, month);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '서버 오류' });
    }
};

exports.getCalendarEmotion = async (req, res) => {
    const { userId, month } = req.query;
    try {
        const data = await calendarService.getCalendarEmotion(userId, month);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '서버 오류' });
    }
};

exports.saveEmotion = async (req, res) => {
    try {
        const { diaryId, emotionType, emotionScore } = req.body;
        await calendarService.saveEmotion({ diaryId, emotionType, emotionScore });
        res.json({ message: '감정이 저장되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};
