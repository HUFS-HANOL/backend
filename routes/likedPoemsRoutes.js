const express = require("express");
const likedPoems = require("../controllers/likedPoems");

const router = express.Router();

rotuer.get("/retrieve",likedPoems.retrieve);

module.exports = router;