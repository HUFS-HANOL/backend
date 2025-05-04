const express = require("express");
const auth = require("../controllers/auth");
const devLogin = require("../controllers/devLogin")

const router = express.Router();

router.post("/register", auth.register);
router.post("/login", auth.login);
// router.post("/login", auht.devLogin);
router.post("/token", auth.refreshToken);
router.post("/logout", auth.logout);
router.post("/auth", auth.authenticateToken, (req, res) => {
    res.status(200).json({ message: "유효한 토큰", user: req.user });
});

module.exports = router;