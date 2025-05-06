const db = require("../models/database");

// 데이터베이스 전송 
exports.todayToDb = async(req, res) => {
    const {user_id, content} = req.body;
    try {
        const sql = "INSERT INTO diaries (user_id, content, created_at) VALUES (?, ?,  NOW())";
        db.query(sql, [user_id, content], (err, result) => {
            if (err) {
                console.error("데이터 베이스 오류:", err);
                return res.status(500).json({ diaryMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
            }
            console.log("일기 데이터베이스 저장 완료");
            res.status(201);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ diaryMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
    }
}

// 시 값 반환
exports.todayPoem = async(req,res) => {
    const content = req.body;
    if (!content) {
        return res.status(400).json({ diaryMessage: "일기를 작성해주세요." });
    }
    try{
    res.json(
        {
            poem: "봄비는 \n 간질이는 손가락을 갖고 있나? \n 대지가 풋사랑에 빠진 것 같다 ",
            phrase: "설레는 당신의 순간을 함께 응원할게요."

        }
    )
}catch(error){
    console.error(error);
    res.status(500).json({ diaryMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
}
}