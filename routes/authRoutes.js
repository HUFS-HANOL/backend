const express = require("express");
const auth = require("../controllers/auth");

const router = express.Router();

router.post("/register", auth.register);
router.post("/login", auth.login);
// router.post("/login", auth.devLogin);
router.post("/token", auth.refreshToken);
router.post("/logout", auth.logout);
router.post("/auth", auth.authenticateToken, (req, res) => {
    res.status(200).json({ user: req.user });
});

module.exports = router;