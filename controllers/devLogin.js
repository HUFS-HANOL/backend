// const jwt = require("jsonwebtoken");
// const accessSecretKey = "accessSecretKey"
// const refreshSecretKey = "refreshSecretKey"

// //sql 연동 없이 사용하는 개발자용 login 모듈입니다.

// //관리자 계정
// const testUser = [
//     {
//         id: 1,
//         username: "hanol",
//         email: "hanol@example.com",
//         password: "1234"
//     }
// ]

// exports.devLogin = (req, res) => {

//     const { identifier, password } = req.body;

//     if (!identifier || !password) {
//         return res.status(400).json({ authMessage: "아이디와 비밀번호를 입력해주세요." });
//     }

//     const identifierField = identifier.includes("@") ? "email" : "username";
//     const user = testUser.find((u) => u[identifierField] === identifier);

//     if (!user) {
//         return res.status(404).json({ authMessage: "잘못된 아이디 또는 이메일입니다." });
//     }

//     if (user.password !== password) {
//         return res.status(401).json({ authMessage: "잘못된 비밀번호입니다." });
//     }

//     const accessToken = jwt.sign({ id: user.id, username: user.username }, accessSecretKey, { expiresIn: "15m" });
//     const refreshToken = jwt.sign({ id: user.id, username: user.username }, refreshSecretKey, { expiresIn: "7d" });

//     res.cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         secure: true,
//         sameSite: "Strict",
//     });

//         res.status(200).json({ authMessage: "로그인에 성공했습니다.", accessToken });
    
// };