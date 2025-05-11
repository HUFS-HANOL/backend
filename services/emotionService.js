const pool = require('../db');

exports.saveEmotion = async (userId, date, emotion) => {
    const conn = await pool.getConnection();
    try {
        await conn.query(
            `INSERT INTO emotions (user_id, date, emotion_type) 
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE emotion_type = VALUES(emotion_type)`,
            [userId, date, emotion]
        );
    } finally {
        conn.release();
    }
};

exports.getEmotionStats = async (userId, month) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(
            `SELECT emotion_type, COUNT(*) AS count
       FROM emotions
       WHERE user_id = ? AND DATE_FORMAT(date, '%Y-%m') = ?
       GROUP BY emotion_type`,
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
