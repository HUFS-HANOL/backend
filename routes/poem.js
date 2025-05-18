const express = require('express');
const router = express.Router();
const poemController = require('../controllers/poemController');

// 시 좋아요/취소
router.post('/like', poemController.likeOrUnlikePoem);

module.exports = router;

router.post('/', poemController.savePoem);  // 시 저장 API 추가
