const pool = require('../db');

// 시 저장
exports.savePoem = async (diaryId, poemText, title = null) => {
    const conn = await pool.getConnection();
    try {
        await conn.query(
            `INSERT INTO poems (diary_id, poem_text, title)
             VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE 
                 poem_text = VALUES(poem_text),
                 title = VALUES(title)`,
            [diaryId, poemText, title]
        );
    } finally {
        conn.release();
    }
};

// 시 좋아요/취소
exports.likePoem = async (poemId, liked) => {
    const conn = await pool.getConnection();
    try {
        await conn.query(
            `UPDATE poems SET liked = ? WHERE id = ?`,
            [liked ? 1 : 0, poemId]
        );
    } finally {
        conn.release();
    }
};

// userId와 date로 poemId 조회
exports.findPoemIdByUserIdAndDate = async (userId, date) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(
            `SELECT p.id AS poemId
             FROM poems p
             JOIN diaries d ON p.diary_id = d.id
             WHERE d.user_id = ? AND d.date = ?`,
            [userId, date]
        );

        if (rows.length === 0) return null;
        return rows[0].poemId;
    } finally {
        conn.release();
    }
};