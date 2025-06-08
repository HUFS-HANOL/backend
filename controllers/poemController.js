const poemService = require('../services/poemService');

// 시 저장
exports.savePoem = async (req, res) => {
    const { diaryId, poemText, title } = req.body;

    if (!diaryId || !poemText) {
        return res.status(400).json({ error: 'diaryId와 poemText는 필수입니다.' });
    }

    try {
        await poemService.savePoem(diaryId, poemText, title);
        res.json({ message: '시가 저장되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '서버 오류' });
    }
};

// 시 좋아요/취소
exports.likePoem = async (req, res) => {
    const { poemId, liked } = req.body;

    if (!poemId) {
        return res.status(400).json({ error: 'poemId가 필요합니다.' });
    }

    try {
        await poemService.likePoem(poemId, liked);
        res.json({ message: '좋아요가 반영되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '서버 오류' });
    }
};
