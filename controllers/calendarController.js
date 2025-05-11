const calendarService = require('../services/calendarService');

exports.getCalendarOverview = async (req, res) => {
    const { userId, month } = req.query;
    try {
        const data = await calendarService.getCalendarOverview(userId, month);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: '서버 오류' });
    }
};
