require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/database");
// const accessSecretKey = "accessSecretKey"
// const refreshSecretKey = "refreshSecretKey"


const accessSecretKey = process.env.ACCESS_SECRETKEY;
const refreshSecretKey = process.env.REFRESH_SECRETKEY;

//회원가입
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ authMessage: "필수 입력란을 모두 작성해야 합니다." });
    }

    try {
        //패스워드 해시화 
        const hashedPassword = await bcrypt.hash(password, 10);

        //DB에 유저정보 입력
        const sql = "INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())";
        db.query(sql, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error("데이터 베이스 오류:", err);
                return res.status(500).json({ authMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
            }
            res.status(200).json({ authMessage: "회원가입이 완료되었습니다." });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ authMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
    }
};


//로그인
exports.login = (req, res) => {

    // 로그인시 email, username 둘 중 하나만 입력해도 인식 가능하도록 'identifier'라는 변수를 별도로 설정
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ authMessage: "아이디와 비밀번호를 입력해주세요." });
    }

    const identifierField = identifier.includes("@") ? "email" : "username";

    const sql = `SELECT * FROM users WHERE ${identifierField} = ?`;
    db.query(sql, [identifier], async (err, results) => {
        if (err) {
            console.error("데이터 베이스 오류:", err);
            return res.status(500).json({ authMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
        }

        if (results.length === 0) {
            return res.status(404).json({ authMessage: "잘못된 아이디 또는 이메일입니다." });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ authMessage: "잘못된 비밀번호입니다." });
        }

        // accessToken 생성 (short-lived, 15m)
        const accessToken = jwt.sign({ id: user.id, username: user.username }, accessSecretKey, { expiresIn: "15m" });

        // refreshToken 생성 (long-lived, 7d)
        const refreshToken = jwt.sign({ id: user.id, username: user.username }, refreshSecretKey, { expiresIn: "7d" });

        // refreshToekn 쿠키에 저장(httpOnly)
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        });

        //
        res.status(200).json({ authMessage: "로그인에 성공했습니다.", accessToken });
    });
};


// acessToken 갱신 
exports.refreshToken = (req, res) => {
    const refreshToken = req.cookies?.refreshToken; 
    if (!refreshToken) {
        console.error("Refresh Token이 존재하지 않음.")
        return res.status(401).json({ authMessage: "인증이 필요합니다. 다시 로그인해주세요." });
    }

   
    jwt.verify(refreshToken, refreshSecretKey, (err, user) => {
        if (err) {
            console.error("Refresh Token이 유효하지 않음.",err)
            return res.status(403).json({ authMessage: "인증에 실패했습니다. 다시 로그인해주세요." });
        }

        
        const accessToken = jwt.sign({ id: user.id, username: user.username }, accessSecretKey, { expiresIn: "15m" });

        res.status(200).json({ accessToken });
    });
};


//로그아웃
exports.logout = (req, res) => {
    res.clearCookie("refreshToken");
    res.status(200).json({ authMessage: "로그아웃 되었습니다." });
};

//토큰 인증
exports.authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) {
        console.log("Access Denied. 토큰이 제공되지 않음.")
        return res.status(401).json({ authMessage: "인증에 실패했습니다." });
    }

    // Access Token 검증
    jwt.verify(token, accessSecretKey, (err, user) => {
        if (err) {
            console.error("Access Token 검증 실패:", err.message);
            return res.status(403).json({ authMessage: "인증에 실패했습니다. 다시 로그인해주세요." });
        }

        // 사용자 정보를 요청 객체에 저장하여 다음 미들웨어에서 사용 가능
        req.user = user;
        next();
    });
};