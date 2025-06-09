const db = require("../models/database");
const fs = require('fs');
const path = require('path');

//data 파일
const dataPath = path.join(__dirname, '../data/generated_poems_ex.json');
const poemData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// 일기 데이터베이스 전송 
exports.todayDiaryDb = async(req, res) => {
    const {user_id, content, emotion_type, date} = req.body;
    try {
        const sql = "INSERT INTO diaries (user_id, content, emotion_type, date, created_at) VALUES (?, ?, ?, ?, NOW())";
        db.query(sql, [user_id, content, emotion_type, date], (err, result) => {
            if (err) {
                console.error("데이터 베이스 오류:", err);
                return res.status(500).json({ diaryMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
            } 
            res.status(201).json({
                diaryMessage: "일기 저장 완료", diary_id: result.insertId});
            console.log("일기 데이터베이스 저장 완료");
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ diaryMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
    }
}


// 시 값 프론트 전송
exports.todayPoem = async(req,res) => {
    const {content,diary_id,emotion_type} = req.body;
    if (!content) {
        return res.status(400).json({ diaryMessage: "일기 전송에 실패했습니다." });
    }
    try{
        //시, 문구 생성 반환 함수 실행 후 값 할당
        const poemPhrase = await todayGeneratePoem(content,emotion_type)
        const poemTitle = poemPhrase.title
        const poemText = poemPhrase.content
        const phraseText = "문구 미반영"
        const emotion_id = await todayEmotion(diary_id,emotion_type);
    res.json(
        {
            title: poemTitle,
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
// 매개변수: 일기 content, emotion_type , 리턴 값: poemtext, pharsetext, title
async function todayGeneratePoem(content, emotion_type){
    try{
    const found = poemData.find(
        (item) => item.question === content && item.golden_emotion === emotion_type
    );
    if (!found) {
        console.log('content, emotion_type 데이터 불일치');
        return {diaryMessage: "시, 문구 생성 오류"};
    }
    return {title:found.title, content:found.content};
}catch(err){
    console.log('에러:',err);
    return {diaryMessage:"오류 발생"};
}
}

// (감정 생성) = 감정 이미지 반환 함수
// 매개변수: 감정 값 , 리턴 값: 감정 이미지 url , emotion_id = emotion_id

// 감정 생성 함수
async function todayEmotion(diary_id,emotion_type) {
    const sql = "INSERT INTO emotions (diary_id, emotion_type, created_at) VALUES (?,?,NOW())";
    try {
        const emotion_id = await new Promise((resolve, reject) => {
            db.query(sql, [diary_id, emotion_type], (err, result) => {
                if (err) {
                    console.error("데이터베이스 오류:", err);
                    return reject(err); 
                }
                resolve(result.insertId); 
            });
        });

        console.log("감정 저장 완료, emotion_id:", emotion_id);
        return emotion_id; 
    } catch (err) {
        console.error("생성된 감정 저장 중 오류 발생:", err);
        throw err; 
    }
}

// 시 데이터베이스 전송
exports.todayPoemDb = async(req, res) => {
    const { diary_id, emotion_id, title, poem,} = req.body;
    if(!diary_id){
        return res.status(400).json({diaryMessage:"일기를 저장해주세요."});
    }
    try {
        const sql = "INSERT INTO poems (diary_id, emotion_id, title, poem_text, created_at) VALUES (?, ?, ?, ?, NOW())";
        db.query(sql, [diary_id, emotion_id, poem], (err, result) => {
            if (err) {
                console.error("데이터 베이스 오류:", err);
                return res.status(400).json({ diaryMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
            }
            console.log("시 데이터베이스 저장 완료");
            res.status(201).json({diaryMessage:"시 저장 완료.",poem_id: result.insertId});
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ diaryMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
    }
}

// 시 좋아요 기능
exports.todayLikePoem = (req, res) => {
    const { poem_id, liked } = req.body;
    db.query(
        `UPDATE poems SET liked = ? WHERE id = ?`,[liked ? 1 : 0, poem_id],(err, result) => {
            if (err) {
                console.error("데이터베이스 저장 오류:", err);
                return res.status(500).json({ diaryMessage: "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요." });
            }
            console.log("좋아요 반영 완료");
            return res.status(201).json({ diaryMessage: "좋아요가 반영되었습니다." });
        }
    );
};