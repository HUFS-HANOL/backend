const pool = require('../db');

// 📆 월별 일기 개요
exports.getCalendarOverview = async (userId, month) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(
            `SELECT 
                d.id AS diaryId,
                DATE_FORMAT(d.date, '%Y-%m-%d') AS date,
                e.emotion_type AS emotion,
                IF(p.poem_text IS NOT NULL, TRUE, FALSE) AS hasPoem
            FROM diaries d
            LEFT JOIN emotions e ON e.diary_id = d.id
            LEFT JOIN poems p ON p.diary_id = d.id
            WHERE d.user_id = ?
              AND DATE_FORMAT(d.date, '%Y-%m') = ?`,
            [userId, month]
        );
        return rows;
    } finally {
        conn.release();
    }
};

// 📆 월별 감정 정보
exports.getCalendarEmotion = async (userId, month) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(
            `SELECT 
                DATE_FORMAT(d.date, '%Y-%m-%d') AS date,
                e.emotion_type AS emotion,
                IF(p.liked = 1, TRUE, FALSE) AS liked,
                IF(p.poem_text IS NOT NULL, TRUE, FALSE) AS hasPoem
            FROM diaries d
            LEFT JOIN emotions e ON e.diary_id = d.id
            LEFT JOIN poems p ON p.diary_id = d.id
            WHERE d.user_id = ?
              AND DATE_FORMAT(d.date, '%Y-%m') = ?`,
            [userId, month]
        );
        return rows;
    } finally {
        conn.release();
    }
};

// 😊 감정 저장 (삽입 또는 업데이트)
exports.saveEmotion = async ({ diaryId, emotionType, emotionScore }) => {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        const [diaries] = await conn.query(
            `SELECT id FROM diaries WHERE id = ?`,
            [diaryId]
        );

        if (diaries.length === 0) {
            throw new Error('해당 다이어리가 존재하지 않습니다.');
        }

        const [exists] = await conn.query(
            `SELECT id FROM emotions WHERE diary_id = ?`,
            [diaryId]
        );

        if (exists.length > 0) {
            await conn.query(
                `UPDATE emotions 
                 SET emotion_type = ?, emotion_score = ?
                 WHERE diary_id = ?`,
                [emotionType, emotionScore, diaryId]
            );
        } else {
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

// 📋 특정 날짜의 가장 최근 일기/감정/시 조회
exports.getDiaryEmotionPoemByDate = async (userId, date) => {
    const conn = await pool.getConnection();
    try {
        const [diaryRows] = await conn.query(
            `SELECT id, title, content, created_at 
             FROM diaries 
             WHERE user_id = ? AND DATE(date) = ?
             ORDER BY created_at DESC
             LIMIT 1`,
            [userId, date]
        );

        if (diaryRows.length === 0) return null;

        const diary = diaryRows[0];

        const [emotionRows] = await conn.query(
            `SELECT emotion_type
             FROM emotions
             WHERE diary_id = ?`,
            [diary.id]
        );

        const [poemRows] = await conn.query(
            `SELECT 
                COALESCE(title, '') AS title,
                poem_text, liked, created_at
             FROM poems
             WHERE diary_id = ?`,
            [diary.id]
        );

        return {
            date,
            diary,
            emotion: emotionRows[0] || null,
            poem: poemRows[0] || null
        };
    } finally {
        conn.release();
    }
};

// 📊 감정 통계
exports.getEmotionStats = async (userId, month) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(
            `SELECT e.emotion_type, COUNT(*) AS count
             FROM diaries d
             JOIN emotions e ON d.id = e.diary_id
             WHERE d.user_id = ?
               AND DATE_FORMAT(d.date, '%Y-%m') = ?
             GROUP BY e.emotion_type`,
            [userId, month]
        );

        const result = {};
        for (const row of rows) {
            result[row.emotion_type] = row.count;
        }

        return result;
    } finally {
        conn.release();
    }
};
