const express = require("express");
const today = require("../controllers/today");

const router = express.Router();

router.post("/database", today.todayToDb);
router.post("/poemphasre", today.todayPoem);