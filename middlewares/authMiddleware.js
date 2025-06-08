const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 토큰 없으면 거절
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "인증 토큰이 없습니다." });
  }

  const token = authHeader.split(" ")[1];

  console.log("authHeader", authHeader);

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_SECRETKEY || "default_secret"
    );
    req.user = decoded; // req.user에 유저 정보 주입
    next();
  } catch (err) {
    console.error("JWT 인증 오류:", err);
    return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
};

module.exports = authMiddleware;
