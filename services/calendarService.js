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

exports.saveEmotion = async ({ diaryId, emotionType, emotionScore }) => {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        // 1) diaryId가 실제로 존재하는지 확인
        const [diaries] = await conn.query(
            `SELECT id FROM diaries WHERE id = ?`,
            [diaryId]
        );

        if (diaries.length === 0) {
            throw new Error('해당 다이어리가 존재하지 않습니다.');
        }

        // 2) emotions 테이블에 기존 감정 기록이 있는지 확인
        const [exists] = await conn.query(
            `SELECT id FROM emotions WHERE diary_id = ?`,
            [diaryId]
        );

        if (exists.length > 0) {
            // 이미 감정이 있으면 update
            await conn.query(
                `UPDATE emotions 
                 SET emotion_type = ?, emotion_score = ?
                 WHERE diary_id = ?`,
                [emotionType, emotionScore, diaryId]
            );
        } else {
            // 없으면 insert
            await conn.query(
                `INSERT INTO emotions (diary_id, emotion_type, emotion_score, created_at)
                 VALUES (?, ?, ?, NOW())`,
                [diaryId, emotionType, emotionScore]
            );
        }

        await conn.commit();
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
};

const db = require('../db');

exports.getDiaryEmotionPoemByDate = async (userId, date) => {
    const [diaryRows] = await db.execute(`
    SELECT id, title, content, created_at 
    FROM diaries 
    WHERE user_id = ? AND DATE(created_at) = ?
  `, [userId, date]);

    if (diaryRows.length === 0) return null;

    const diary = diaryRows[0];

    const [emotionRows] = await db.execute(`
    SELECT emotion_type
    FROM emotions 
    WHERE diary_id = ?
  `, [diary.id]);

    const emotion = emotionRows[0] || null;

    const [poemRows] = await db.execute(`
    SELECT poem_text, created_at 
    FROM poems 
    WHERE diary_id = ?
  `, [diary.id]);

    const poem = poemRows[0] || null;

    return {
        date,
        diary,
        emotion,
        poem
    };
};
