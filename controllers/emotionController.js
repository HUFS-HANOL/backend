const emotionService = require('../services/emotionService');

exports.saveEmotion = async (req, res) => {
    const { userId, date, emotion } = req.body;
    try {
        await emotionService.saveEmotion(userId, date, emotion);
        res.json({ message: '감정이 저장되었습니다.' });
    } catch (err) {
        res.status(500).json({ error: '서버 오류' });
    }
};

exports.getEmotionStats = async (req, res) => {
    const { userId, month } = req.query;
    try {
        const stats = await emotionService.getEmotionStats(userId, month);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: '서버 오류' });
    }
};
