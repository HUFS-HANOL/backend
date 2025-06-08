const emotionService = require('../services/emotionService');

exports.saveEmotion = async (req, res) => {
    const { diaryId, emotionType, emotionScore, date } = req.body;

    if (!diaryId || !emotionType || !emotionScore || !date) {
        return res.status(400).json({ error: '필수 데이터가 누락되었습니다.' });
    }

    try {
        await emotionService.saveEmotion(diaryId, emotionType, emotionScore, date);
        res.json({ message: '감정이 저장되었습니다.' });
    } catch (err) {
        console.error('saveEmotion error:', err);
        res.status(500).json({ error: '서버 오류' });
    }
};

exports.getEmotionStats = async (req, res) => {
    const { userId, month } = req.query;

    if (!userId || !month) {
        return res.status(400).json({ error: 'userId와 month는 필수 쿼리 파라미터입니다.' });
    }

    try {
        const stats = await emotionService.getEmotionStats(userId, month);
        res.json(stats);
    } catch (err) {
        console.error('getEmotionStats error:', err);
        res.status(500).json({ error: '서버 오류' });
    }
};
