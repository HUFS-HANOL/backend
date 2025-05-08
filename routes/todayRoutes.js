const express = require("express");
const today = require("../controllers/today");

const router = express.Router();

router.post("/database", today.todayDiaryDb);
router.post("/poemphasre", today.todayPoem);

module.exports = router;