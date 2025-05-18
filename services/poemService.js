const pool = require('../db');

// 시 저장 (poems 테이블에 diary_id, poem_text 업데이트 또는 삽입)
exports.savePoem = async (diaryId, poemText) => {
    const conn = await pool.getConnection();
    try {
        await conn.query(
            `INSERT INTO poems (diary_id, poem_text)
             VALUES (?, ?)
             ON DUPLICATE KEY UPDATE poem_text = VALUES(poem_text)`,
            [diaryId, poemText]
        );
    } finally {
        conn.release();
    }
};

// 시 좋아요/취소 (poems 테이블 liked 컬럼 업데이트)
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
