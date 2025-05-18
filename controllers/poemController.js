const poemService = require('../services/poemService');

// 시 저장: diaryId, poemText를 받아서 저장
exports.savePoem = async (req, res) => {
    const { diaryId, poemText } = req.body;
    try {
        await poemService.savePoem(diaryId, poemText);
        res.json({ message: '시가 저장되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '서버 오류' });
    }
};

// 시 좋아요/취소: poemId, liked 상태를 받아서 업데이트
exports.likePoem = async (req, res) => {
    const { poemId, liked } = req.body;
    try {
        await poemService.likePoem(poemId, liked);
        res.json({ message: '좋아요가 반영되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '서버 오류' });
    }
};
