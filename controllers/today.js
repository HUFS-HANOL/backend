const db = require("../models/database");
let diaryId = ''; // 일기 데이터베이스 전송 함수에서 값 할당
let emotionId= ''; // 시 값 전송 함수에서 값 할당 (원래는 시,문구 생성 함수에서 할당)
let poemText =''; // 시 값 전송 함수에서 값 할당 (원래는 시,문구 생성 함수에서 할당)

// 일기 데이터베이스 전송 
exports.todayDiaryDb = async(req, res) => {
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
            diaryId = result.inserID
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ diaryMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
    }
}


// 시 값 전송
exports.todayPoem = async(req,res) => {
    const content = req.body;
    if (!content) {
        return res.status(400).json({ diaryMessage: "일기를 작성해주세요." });
    }
    try{
        //시, 문구 생성 반환 함수 실행 후 값 할당
        poemText = "봄비는 \n 간질이는 손가락을 갖고 있나? \n 대지가 풋사랑에 빠진 것 같다 "
        pharseText = "설레는 당신의 순간을 함께 응원할게요."
    res.json(
        {
            poem: poemText,
            phrase: pharseText

        }
    )
}catch(error){
    console.error(error);
    res.status(500).json({ diaryMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
}
}

// 시, 문구 생성 반환 함수 
// 매개변수: 일기 content , 리턴 값: poemtext, pharsetext
// 파이썬 API를 가져와서 직접 실행할 것인지, API 서버에 보내고 받을 것인지

// (감정 생성) = 감정 이미지 반환 함수
// 매개변수: 감정 값 , 리턴 값: 감정 이미지 url , emotionId = emotion_id

// 시 데이터베이스 전송
exports.todayPoemDb = async(req, res) => {
    const {user_id, content} = req.body;
    try {
        const sql = "INSERT INTO poems (diary_id, emotion_id, poem_text, created_at) VALUES (?, ?, ?, NOW())";
        // 쿼리 생성
        db.query(sql, [diaryId, emotionId, poemText], (err, result) => {
            if (err) {
                console.error("데이터 베이스 오류:", err);
                return res.status(500).json({ diaryMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
            }
            console.log("시 데이터베이스 저장 완료");
            res.status(201);
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ diaryMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
    }
}
