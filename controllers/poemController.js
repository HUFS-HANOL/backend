const poemService = require('../services/poemService');

exports.savePoem = async (req, res) => {
    const { userId, date, content } = req.body;
    try {
        await poemService.savePoem(userId, date, content);
        res.json({ message: '시가 저장되었습니다.' });
    } catch (err) {
        res.status(500).json({ error: '서버 오류' });
    }
};
