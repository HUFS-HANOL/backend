const statisticsService = require('../services/statisticsService');

exports.getEmotionSummary = async (req, res) => {
    try {
        const userId = req.user.id; // JWT 인증 미들웨어로부터 user 정보 추출
        const mostUsedEmotion = await statisticsService.getMostUsedEmotion(userId);

        res.json({ mostUsedEmotion });
    } catch (error) {
        console.error('Error in getEmotionSummary:', error);
        res.status(500).json({ message: '서버 에러' });
    }
};

exports.getMonthlyEmotionStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await statisticsService.getMonthlyEmotionStats(userId);
        res.json(stats);
    } catch (err) {
        console.error('Error in getMonthlyEmotionStats:', err);
        res.status(500).json({ message: '서버 에러' });
    }
};

exports.getTotalEmotionCount = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await statisticsService.getTotalEmotionCount(userId);
        res.json(stats);
    } catch (err) {
        console.error('Error in getTotalEmotionCount:', err);
        res.status(500).json({ message: '서버 에러' });
    }
};

exports.getYearlyHappinessStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await statisticsService.getYearlyHappinessStats(userId);
        res.json(stats);
    } catch (error) {
        console.error('Error in getYearlyHappinessStats:', error);
        res.status(500).json({ message: '서버 에러' });
    }
};
