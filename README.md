# 감정 캘린더 API 명세서

감정 기록 및 AI 시 좋아요 기능이 있는 감정 캘린더 API입니다. 이 문서는 API 요청 방식과 응답 예시를 정리한 명세서입니다.

---

## 🔐 인증 정보

- 모든 API는 인증된 사용자를 기준으로 동작합니다.
- JWT 토큰을 사용하며, 토큰은 `Authorization` 헤더에 `Bearer <token>` 형태로 전달합니다.
- 토큰은 로컬에서 `node generateToken.js` 명령어를 통해 생성할 수 있습니다.

---

## 📆 월별 캘린더 조회 API

### `GET /calendar/emotion`

#### 요청

- **Query Parameters:**
  - `userId` (필수): 사용자 ID
  - `month` (필수): 조회할 월 (형식: `YYYY-MM`)

#### 응답 예시

```json
[
  {
    "date": "2025-04-01",
    "emotion": "행복",
    "liked": true,
    "hasPoem": true
  }
]
```

---

## 🗓️ 특정 날짜 일기/시 상세 조회 API

### `GET /calendar/detail`

#### 요청

- **Query Parameters:**
  - `userId`: 사용자 ID
  - `date`: 날짜 (형식: `YYYY-MM-DD`)

#### 응답 예시

```json
{
  "date": "2025-05-31",
  "diary": {
    "title": "오늘의 일기 제목",
    "content": "오늘은 기분이 좋았다.",
    "created_at": "2025-05-31T10:00:00Z"
  },
  "emotion": {
    "type": "행복"
  },
  "poem": {
    "text": "햇살이 비추는 아침,\n마음이 따뜻해진다.",
    "created_at": "2025-05-31T10:10:00Z"
  }
}
```

---

## 💬 감정 상태 저장 API

### `POST /calendar/emotion`

#### 요청

```json
{
  "userId": "123",
  "date": "2025-04-10",
  "emotion": "피곤함"
}
```

#### 응답

```json
{
  "message": "감정이 저장되었습니다."
}
```

---

## ❤️ 시 좋아요/취소 API

### `POST /calendar/poem/like`

#### 요청

```json
{
  "poemId": 1,
  "liked": true
}
```

- `liked: true` ➡️ 좋아요
- `liked: false` ➡️ 좋아요 취소

#### 응답

```json
{
  "message": "좋아요가 반영되었습니다."
}
```

---

## 📊 감정 통계 API (기존 구조)

### `GET /calendar/emotions/stats`

#### 요청

- **Query Parameters:**
  - `userId` (필수): 사용자 ID
  - `month` (필수): 조회할 월 (형식: `YYYY-MM`)

#### 응답 예시

```json
{
  "행복": 5,
  "피곤함": 3,
  "슬픔": 2
}
```

---

## 📈 통합 감정 통계 API

### `GET /statistics/summary`

#### 설명  
사용자의 전체 감정 중 가장 많이 사용된 감정을 조회합니다.

#### 응답 예시

```json
{
  "mostUsedEmotion": {
    "name": "행복",
    "count": 12
  }
}
```

---

### `GET /statistics/monthly`

#### 설명  
해당 월에 사용된 감정들의 통계(개수 및 비율)를 제공합니다.

#### 응답 예시

```json
{
  "year": 2025,
  "month": 4,
  "emotions": [
    {
      "name": "행복",
      "count": 5,
      "percentage": 50
    },
    {
      "name": "피곤함",
      "count": 3,
      "percentage": 30
    },
    {
      "name": "슬픔",
      "count": 2,
      "percentage": 20
    }
  ]
}
```

---

### `GET /statistics/count`

#### 설명  
전체 감정 기록에서 감정별 누적 횟수를 제공합니다.

#### 응답 예시

```json
{
  "emotions": [
    {
      "name": "행복",
      "count": 20
    },
    {
      "name": "피곤함",
      "count": 10
    },
    {
      "name": "불안",
      "count": 7
    }
  ]
}
```

---

## 📝 참고 사항

- 날짜 형식은 `YYYY-MM-DD` 또는 `YYYY-MM`을 사용합니다.
- JWT 인증 토큰을 `Authorization: Bearer <token>` 형태로 포함해야 합니다.
- 모든 API는 인증된 사용자(userId)를 기준으로 동작합니다.
