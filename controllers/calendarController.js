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

exports.getDiaryDetailByDate = async (req, res) => {
    const { userId, date } = req.query;

    if (!userId || !date) {
        return res.status(400).json({ message: 'userId와 date가 필요합니다.' });
    }

    try {
        const result = await calendarService.getDiaryEmotionPoemByDate(userId, date);

        if (!result) {
            return res.status(404).json({ message: '해당 날짜에 일기 데이터가 없습니다.' });
        }

        res.json(result);
    } catch (err) {
        console.error('Error in getDiaryDetailByDate:', err);
        res.status(500).json({ message: '서버 에러' });
    }
};

exports.getCalendarEmotionStats = async (req, res) => {
    const { userId, month } = req.query;

    if (!userId || !month) {
        return res.status(400).json({ message: 'userId와 month가 필요합니다.' });
    }

    try {
        const stats = await calendarService.getEmotionStats(userId, month);
        res.json(stats); // 예: { "기쁨": 5, "슬픔": 3 }
    } catch (err) {
        console.error('Error in getCalendarEmotionStats:', err);
        res.status(500).json({ message: '서버 오류' });
    }
};
