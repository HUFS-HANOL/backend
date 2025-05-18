// db.js
// db.js
const mysql = require('mysql2/promise'); // 꼭 promise 버전!
require('dotenv').config(); // .env에서 DB 정보 읽기

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;

require('dotenv').config(); // .env 파일에서 환경 변수 읽기

exports.saveEmotion = async (req, res) => {
    console.log('Request Body:', req.body);
    const { diaryId, emotionType, emotionScore, createdAt } = req.body;

    if (!diaryId || !emotionType || !emotionScore || !createdAt) {
        console.log('Missing data:', { diaryId, emotionType, emotionScore, createdAt });
        return res.status(400).json({ error: '필수 데이터가 누락되었습니다.' });
    }

    const conn = await pool.getConnection();
    try {
        await conn.query(
            `INSERT INTO emotions (diary_id, emotion_type, emotion_score, created_at)
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
                emotion_type = VALUES(emotion_type),
                emotion_score = VALUES(emotion_score),
                created_at = VALUES(created_at)`,
            [diaryId, emotionType, emotionScore, createdAt]
        );
        res.json({ message: '감정이 저장되었습니다.' });
    } catch (err) {
        console.error('saveEmotion error:', err);
        res.status(500).json({ error: '서버 오류' });
    } finally {
        conn.release();
    }
};
