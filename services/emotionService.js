const pool = require('../db');

exports.saveEmotion = async (diaryId, emotionType, emotionScore, createdAt) => {
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
    } finally {
        conn.release();
    }
};

exports.getEmotionStats = async (userId, month) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(
            `SELECT e.emotion_type, COUNT(*) AS count
             FROM emotions e
             JOIN diaries d ON e.diary_id = d.id
             WHERE d.user_id = ? AND DATE_FORMAT(e.created_at, '%Y-%m') = ?
             GROUP BY e.emotion_type`,
            [userId, month]
        );

        const stats = {};
        rows.forEach(row => {
            stats[row.emotion_type] = row.count;
        });
        return stats;
    } finally {
        conn.release();
    }
};