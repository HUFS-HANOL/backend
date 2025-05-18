const pool = require('../db');

exports.savePoem = async (userId, date, content) => {
    const conn = await pool.getConnection();
    try {
        await conn.query(
            `INSERT INTO poems (user_id, date, content)
             VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE content = VALUES(content)`,
            [userId, date, content]
        );
    } finally {
        conn.release();
    }
};
