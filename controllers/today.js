const db = require("../models/database");

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
            res.status(201).json({
                diaryMessage: "일기 저장 완료",
            diary_id: result.insertId});
            console.log("일기 데이터베이스 저장 완료");
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ diaryMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
    }
}


// 시 값 전송
exports.todayPoem = async(req,res) => {
    const {content, diary_id} = req.body;
    if (!content) {
        return res.status(400).json({ diaryMessage: "일기 전송에 실패했습니다." });
    }
    try{
        //시, 문구 생성 반환 함수 실행 후 값 할당
        const poemText = "봄비는 \n 간질이는 손가락을 갖고 있나? \n 대지가 풋사랑에 빠진 것 같다 "
        const phraseText = "설레는 당신의 순간을 함께 응원할게요."
        // 감정 생성 함수 실행
        const emotion_id = await todayEmotion(diary_id);
    res.json(
        {
            poem: poemText,
            phrase: phraseText,
            emotion_id: emotion_id

        }
    )
            
}catch(error){
    console.error("오류 발생:", error);
    res.status(500).json({ diaryMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
}
}

// 시, 문구 생성 반환 함수 
// 매개변수: 일기 content , 리턴 값: poemtext, pharsetext
// 파이썬 API를 가져와서 직접 실행할 것인지, API 서버에 보내고 받을 것인지

// (감정 생성) = 감정 이미지 반환 함수
// 매개변수: 감정 값 , 리턴 값: 감정 이미지 url , emotion_id = emotion_id

// 감정 생성 함수
async function todayEmotion(diary_id) {
    const sql = "INSERT INTO emotions (diary_id, emotion_type, emotion_score, created_at) VALUES (?,?,?,NOW())";
    emotionType = "행복함"
    emotionScore = 1
    try {
        const emotion_id = await new Promise((resolve, reject) => {
            db.query(sql, [diary_id, emotionType, emotionScore], (err, result) => {
                if (err) {
                    console.error("데이터베이스 오류:", err);
                    return reject(err); 
                }
                resolve(result.insertId); 
            });
        });

        console.log("생성된 감정 저장 완료, emotion_id:", emotion_id);
        return emotion_id; 
    } catch (err) {
        console.error("생성된 감정 저장 중 오류 발생:", err);
        throw err; 
    }
}

// 시 데이터베이스 전송
exports.todayPoemDb = async(req, res) => {
    const { diary_id, poem, emotion_id} = req.body;
    try {
        const sql = "INSERT INTO poems (diary_id, emotion_id, poem_text, created_at) VALUES (?, ?, ?, NOW())";
        db.query(sql, [diary_id, emotion_id, poem], (err, result) => {
            if (err) {
                console.error("데이터 베이스 오류:", err);
                return res.status(400).json({ diaryMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
            }
            console.log("시 데이터베이스 저장 완료");
            res.status(201).json({diaryMessage:"시 저장 완료."});
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ diaryMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
    }
}
