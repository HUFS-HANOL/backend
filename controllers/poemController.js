const poemService = require('../services/poemService');

exports.likeOrUnlikePoem = async (req, res) => {
    const { userId, date, like } = req.body;
    try {
        await poemService.likeOrUnlikePoem(userId, date, like);
        res.json({ message: '좋아요가 반영되었습니다.' });
    } catch (err) {
        res.status(500).json({ error: '서버 오류' });
    }
};
