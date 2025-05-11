💬 감정 상태 저장 API
POST /emotion
요청
json
{
  "userId": "123",
  "date": "2025-04-10",
  "emotion": "피곤함"
}
응답
json
복사
편집
{
  "message": "감정이 저장되었습니다."
}
❤️ 시 좋아요/취소 API
POST /poem/like
요청
json
{
  "userId": "123",
  "date": "2025-04-10",
  "like": true
}
like: true ➡️ 좋아요

like: false ➡️ 좋아요 취소

응답
json
{
  "message": "좋아요가 반영되었습니다."
}
📊 감정 통계 API
GET /emotion/stats
요청
Query Parameters:

userId (필수): 사용자 ID

month (필수): 조회할 월 (형식: YYYY-MM)

응답 예시
json
{
  "행복": 5,
  "피곤함": 3,
  "슬픔": 2
}
📝 참고
날짜 형식은 YYYY-MM-DD 또는 YYYY-MM을 사용합니다.

모든 API는 인증된 사용자(userId) 기준으로 동작합니다.