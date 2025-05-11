const pool = require('../db');

exports.likeOrUnlikePoem = async (userId, date, like) => {
    const conn = await pool.getConnection();
    try {
        await conn.query(
            `INSERT INTO poems (user_id, date, liked)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE liked = VALUES(liked)`,
            [userId, date, like ? 1 : 0]
        );
    } finally {
        conn.release();
    }
};
