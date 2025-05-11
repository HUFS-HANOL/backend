📆 달력 월별 조회 API
해당 월의 날짜별 감정과 시 좋아요 여부를 가져옵니다. (달력에 표시용)

GET /calendar/overview

요청 (Query Parameter)
userId: 사용자 ID (예: "123")

month: 조회할 월 (YYYY-MM 형식) (예: "2025-04")

응답
json
복사
편집
[
  {
    "date": "2025-04-01",
    "emotion": "행복",
    "liked": true
  },
  {
    "date": "2025-04-02",
    "emotion": "피곤함",
    "liked": false
  }
]
💬 감정 상태 저장 API
특정 날짜의 감정을 저장하거나 수정합니다.

POST /emotion

요청 (Body)
json
복사
편집
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
해당 날짜에 생성된 시를 "나만의 좋아요"로 저장하거나 취소합니다.

POST /poem/like

요청 (Body)
json
복사
편집
{
  "userId": "123",
  "date": "2025-04-10",
  "like": true
}
like: true ➡️ 좋아요

like: false ➡️ 취소

응답
json
복사
편집
{
  "message": "좋아요가 반영되었습니다."
}
📊 감정 통계 API
특정 월의 감정 통계를 가져옵니다. (달력 하단 통계표시용)

GET /emotion/stats

요청 (Query Parameter)
userId: 사용자 ID

month: 조회할 월 (YYYY-MM 형식)

응답
json
복사
편집
{
  "행복": 10,
  "피곤함": 5,
  "슬픔": 2
}
📝 참고
날짜 형식은 모두 YYYY-MM-DD 또는 YYYY-MM을 사용합니다.

모든 API는 로그인된 사용자의 userId 기준으로 동작합니다.
