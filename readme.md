📊 감정 캘린더 API 명세서
감정 기록 및 AI 시 좋아요 기능이 있는 감정 캘린더 API입니다. 이 문서는 API 요청 방식과 응답 예시를 정리한 명세서입니다.

📆 월별 캘린더 조회 API
GET /calendar/overview

🔹 요청 Query Parameters:

userId: 사용자 ID (필수)

month: 조회할 월 (형식: YYYY-MM)

🔹 응답 예시 json 복사 편집 [ { "date": "2025-04-01", "emotion": "행복", "liked": true }, { "date": "2025-04-02", "emotion": "피곤함", "liked": false } ]

💬 감정 상태 저장 API
POST /emotion

🔹 요청 Body json 복사 편집 { "userId": "123", "date": "2025-04-10", "emotion": "피곤함" } 🔹 응답 json 복사 편집 { "message": "감정이 저장되었습니다." }

❤️ 시 좋아요/취소 API
POST /poem/like

🔹 요청 Body json 복사 편집 { "userId": "123", "date": "2025-04-10", "like": true } like: true ➡️ 좋아요 false ➡️ 좋아요 취소

🔹 응답 json 복사 편집 { "message": "좋아요가 반영되었습니다." }

📊 감정 통계 API
GET /emotion/stats

🔹 요청 Query Parameters:

userId: 사용자 ID (필수)

month: 조회할 월 (형식: YYYY-MM)

🔹 응답 예시 json 복사 편집 { "행복": 5, "피곤함": 3, "슬픔": 2 }

📝 참고
날짜 형식은 YYYY-MM-DD 또는 YYYY-MM을 사용합니다.

모든 API는 인증된 사용자(userId) 기준으로 동작합니다.