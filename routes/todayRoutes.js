const express = require("express");
const today = require("../controllers/today");

const router = express.Router();

router.post("/diaries", today.todayDiaryDb);
router.post("/poemphrase", today.todayPoem);
router.post("/poems",today.todayPoemDb);

module.exports = router;