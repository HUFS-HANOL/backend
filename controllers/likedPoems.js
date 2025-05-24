const db = require("../models/database");


exports.retrieve = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const [rows] = await db.query(
      `SELECT poems.poem_text , poems.created_at
       FROM users
       JOIN diaries ON users.id = diaries.user_id
       JOIN poems ON diaries.id = poems.diary_id
       WHERE users.id = ?
       AND poems.liked = true`, [user_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ likedPoemsMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
  }
};
