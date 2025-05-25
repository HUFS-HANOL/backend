const express = require("express");
const likedPoems = require("../controllers/likedPoems");

const router = express.Router();

router.get("/view",likedPoems.likedPoemsView);

module.exports = router;