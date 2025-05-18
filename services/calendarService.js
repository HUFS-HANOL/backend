const pool = require('../db');

exports.getCalendarOverview = async (userId, month) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(
            `SELECT 
                d.id AS diaryId,
                DATE_FORMAT(d.created_at, '%Y-%m-%d') AS date,
                e.emotion_type AS emotion,
                IF(p.poem_text IS NOT NULL, TRUE, FALSE) AS hasPoem
            FROM diaries d
            LEFT JOIN emotions e ON e.diary_id = d.id
            LEFT JOIN poems p ON p.diary_id = d.id
            WHERE d.user_id = ?
              AND DATE_FORMAT(d.created_at, '%Y-%m') = ?`,
            [userId, month]
        );
        return rows;
    } finally {
        conn.release();
    }
};

exports.getCalendarEmotion = async (userId, month) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(
            `SELECT 
                DATE_FORMAT(d.created_at, '%Y-%m-%d') AS date,
                e.emotion_type AS emotion,
                IF(p.liked = 1, TRUE, FALSE) AS liked,
                IF(p.poem_text IS NOT NULL, TRUE, FALSE) AS hasPoem
            FROM diaries d
            LEFT JOIN emotions e ON e.diary_id = d.id
            LEFT JOIN poems p ON p.diary_id = d.id
            WHERE d.user_id = ?
              AND DATE_FORMAT(d.created_at, '%Y-%m') = ?`,
            [userId, month]
        );
        return rows;
    } finally {
        conn.release();
    }
};
