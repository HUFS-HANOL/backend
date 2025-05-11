const pool = require('../db');

exports.getCalendarOverview = async (userId, month) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(
            `SELECT d.date, e.emotion_type AS emotion, 
              IF(p.liked = 1, true, false) AS liked
       FROM dates d
       LEFT JOIN emotions e ON d.user_id = e.user_id AND d.date = e.date
       LEFT JOIN poems p ON d.user_id = p.user_id AND d.date = p.date
       WHERE d.user_id = ? AND DATE_FORMAT(d.date, '%Y-%m') = ?`,
            [userId, month]
        );
        return rows;
    } finally {
        conn.release();
    }
};
