const db = require('./../db'); // MySQL 연결 설정

exports.getMostUsedEmotion = async (userId) => {
  const [rows] = await db.execute(`
    SELECT emotions.emotion_type, COUNT(*) AS count
    FROM emotions
    JOIN diaries ON emotions.diary_id = diaries.id
    WHERE diaries.user_id = ?
    GROUP BY emotions.emotion_type
    ORDER BY count DESC
    LIMIT 1
  `, [userId]);

  if (rows.length === 0) return null;

  return {
    name: rows[0].emotion_type,
    count: rows[0].count
  };
};

exports.getMonthlyEmotionStats = async (userId) => {
  const [rows] = await db.execute(`
    SELECT 
      emotions.emotion_type,
      COUNT(*) AS count
    FROM emotions
    JOIN diaries ON emotions.diary_id = diaries.id
    WHERE diaries.user_id = ?
      AND MONTH(diaries.date) = MONTH(CURRENT_DATE())
      AND YEAR(diaries.date) = YEAR(CURRENT_DATE())
    GROUP BY emotions.emotion_type
  `, [userId]);

  const total = rows.reduce((acc, row) => acc + row.count, 0);

  const emotionStats = rows.map(row => ({
    name: row.emotion_type,
    count: row.count,
    percentage: Math.round((row.count / total) * 100)
  }));

  const now = new Date();

  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    emotions: emotionStats
  };
};

exports.getTotalEmotionCount = async (userId) => {
  const [rows] = await db.execute(`
    SELECT 
      emotions.emotion_type,
      COUNT(*) AS count
    FROM emotions
    JOIN diaries ON emotions.diary_id = diaries.id
    WHERE diaries.user_id = ?
    GROUP BY emotions.emotion_type
  `, [userId]);

  return {
    emotions: rows.map(row => ({
      name: row.emotion_type,
      count: row.count
    }))
  };
};

exports.getYearlyHappinessStats = async (userId) => {
  const happyEmotions = ['기쁨', '행복함', '즐거움'];

  const placeholders = happyEmotions.map(() => '?').join(',');
  const params = [userId, ...happyEmotions];

  const [rows] = await db.execute(`
    SELECT 
      MONTH(diaries.date) AS month,
      COUNT(*) AS count
    FROM emotions
    JOIN diaries ON emotions.diary_id = diaries.id
    WHERE diaries.user_id = ?
      AND YEAR(diaries.date) = YEAR(CURRENT_DATE())
      AND emotions.emotion_type IN (${placeholders})
    GROUP BY MONTH(diaries.date)
    ORDER BY month
  `, params);

  const monthlyCounts = [];
  for (let m = 1; m <= 12; m++) {
    const found = rows.find(row => row.month === m);
    monthlyCounts.push({ month: m, count: found ? found.count : 0 });
  }

  return {
    year: new Date().getFullYear(),
    emotions: happyEmotions,
    monthlyCounts
  };
};
