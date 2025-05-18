const express = require('express');
const router = express.Router();
const poemController = require('../controllers/poemController');

// 시 좋아요/취소
router.post('/like', poemController.likePoem);

// 시 저장 API 추가
router.post('/', poemController.savePoem);

module.exports = router;
