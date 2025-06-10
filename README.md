# 한올 backend

## 서버 실행 가이드

```
git clone https://github.com/HUFS-HANOL/backend.git
npm install
node server.js
```

merge 후 수정 예정

## .env 파일 관련

https://github.com/HUFS-HANOL/backend/tree/hanol_database
<br>
https://www.notion.so/ERD-DB-env-1c6b98bc90c680d19f14d3bb784595ac?pvs=4

## 백엔드 서버 주소

> http://localhost:3000

## 디렉토리 구조

```bash
backend
│  server.js // 서버 열기
│  package-lock.json //dependencies
│  package.json //dependencies
│
├─controllers //controllers 모듈
│      auth.js // 로그인, 회원가입, 인증 controllers
│      devLogin.js // 개발자용 로그인 controllers
│      likedPoems.js // 찜한 시 controllers
│      today.js // 오늘 일기 controllers
│
├─models //database 관련
│      database.js //데이터베이스 연동
│
└─routes //라우팅 경로
│        authRoutes.js // auth 라우팅
│        likedPoemsRoutes.js // 찜한 시 라우팅
│        todayRoutes.js // 오늘 일기 라우팅
```

## auth 명세서

### 회원가입 API

> **HTTP Method:** POST <br> > **URL:** /api/auth/register

- ### Request

  - Body
    ```json
    {
      "username": "username",
      "email": "email",
      "password": "password"
    }
    ```
    email은 @이 포함되어야 함.

- ### Response
- 회원가입 성공

  - HTTP 코드: 200
  - Body
    ```json
    { "authMessage": "회원가입이 완료되었습니다." }
    ```

- 회원가입 실패: 입력란 빈 칸

  - HTTP 코드: 400
  - Body
    ```json
    { "authMessage": "필수 입력란을 모두 작성해야 합니다." }
    ```

- 회원가입 실패: DB, 서버 오류
  - HTTP 코드: 500
  - Body
    ```json
    {
      "authMessage": "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요."
    }
    ```

### 로그인 API

> **HTTP Method:** POST <br> > **URL:** /api/auth/login

- ### Request

  - Body
    ```json
    {
      "identifier": "identifier",
      "password": "password"
    }
    ```
    identifier에는 username, email 둘 다 들어갈 수 있음

- ### Response
- 로그인 성공

  - HTTP 코드:200
  - Body

  ```json
  {
    "authMessage": "로그인에 성공했습니다.",
    "accessToken": "ef3464r...."
  }
  ```

- 로그인 실패: 입력란 빈 칸
  - HTTP 코드:400
  - Body
    ```json
    { "authMessage": "아이디와 비밀번호를 입력해주세요." }
    ```
- 로그인 실패: DB, 서버 오류
  - HTTP 코드:500
  - Body
    ```json
    {
      "authMessage": "서버가 요청을 처리할 수 없습니다. 나중에 다시 시도해주세요."
    }
    ```
- 로그인 실패: id, email 불일치
  - HTTP 코드:404
  - Body
    ```json
    { "authMessage": "잘못된 아이디 또는 이메일입니다." }
    ```
- 로그인 실패: password 불일치
  - HTTP 코드:401
  - Body
    ```json
    { "authMessage": "잘못된 비밀번호입니다." }
    ```

### acessToken 갱신 API

> **HTTP Method:** POST <br> > **URL:** /api/auth/token

- ### Request

  - Body: 요구하지 않음

- ### Response
- 토큰 갱신 성공

  - HTTP 코드: 200
  - Body

  ```json
  { "accessToken": "ef3464r...." }
  ```

- 갱신 실패: refreshToken 존재 X

  - HTTP 코드: 401
  - Body
    ```json
    { "authMessage": "인증이 필요합니다. 다시 로그인해주세요." }
    ```

- 갱신 실패: 유효하지 않은 refreshToken
  - HTTP 코드: 403
  - Body
    ```json
    { "authMessage": "인증에 실패했습니다. 다시 로그인해주세요." }
    ```

### 로그아웃 API

> **HTTP Method:** POST <br> > **URL:** /api/auth/logout

- ### Request

  - Body: 요구하지 않음

- ### Response
- 로그아웃 성공

  - HTTP 코드:
  - Body

  ```json
  { "authMessage": "로그아웃 되었습니다." }
  ```

### 토큰 인증 API

> **HTTP Method:** POST <br> > **URL:** /api/auth/auth

- ### Request

  - header

  `Authorization`: Bearer {accessToken}<br>
  예시) `Authorization`: Bearer reyfdhsfd...

- ### Response
- 인증 성공

  - HTTP 코드:200
  - Body

  ```json
  {
        "message": "유효한 토큰",
        "user": {
        "id": ,
        "username": ,
        "iat": ,
        "exp":
    }
  }
  ```

- 인증 실패: 토큰이 제공되지 않음
  - HTTP 코드: 401
  - Body
    ```json
    { "authMessage": "인증에 실패했습니다." }
    ```
- 인증 실패: 제공된 토큰의 인증이 실패
  - HTTP 코드: 403
  - Body
    ```json
    { "authMessage": "인증에 실패했습니다. 다시 로그인해주세요." }
    ```

## today 명세서

상위 경로: api/today<br>
**05.18** `diary_id`,`emotion_id` 관련 추가, 시 저장 API 추가 <br>
**06.06**

- 일기-> DB API: `emotion_type` 요청 추가
- 시, 문구 생성 API: `emotion_type` 요청 추가
- 시 저장 API: `poem_id` 응답 추가
- 시 좋아요 API 추가

**06.09**

- 일기 -> DB API: `date` 요청 추가
- 시, 문구 생성 API: `title` 응답 추가
- 시 -> DB API: `title` 요청 추가
- 주의사항: 시,문구 생성 API에서 content와 emotion_type이 시연 데이터와 일치하지 않는 경우 오류 메세지를 응답함.

### 일기->DB API

경로: api/today/diaries

메서드: POST

request:

```json
{
"user_id" : int,
"content" : "일기 텍스트 값",
"emotion_type":"감정 유형(보통,기쁨 등)"
"date":"2025-01-01(YYYY-MM-DD)"
}
```

**06.06** `emotion_type` 추가, 사용자가 선택한 감정

**06.09** `date` 요청 추가, YYYY-MM-DD 형식, 캘린더에서 넘어올시 캘린더 날짜, 오늘 일기에서 작성시 오늘 날짜

response:

성공 - HTTP 코드: 201

```json
{
  "diaryMessage": "일기 저장 완료",
  "diary_id": int
}
```

**05.18** `diary_id` 전달 추가.
전달받은 `diary_id`는 시,문구 생성과 시 저장에서 다시 보내주세요.

error - HTTP 코드: 500

### 시, 문구 생성 API

\*시연을 위해 단순히 더미데이터를 반환하도록 했습니다.

경로: api/today/poemphrase

메서드: POST

request:

```json
{
"content" : "일기 텍스트 값",
"diary_id" : int,
"emotion_type":"감정 유형(보통,기쁨 등)"
}
```

**05.18** `diary_id` 요청 추가. 일기->DB API의 `diary_id`값.

**06.06** `emotion_type` 추가, 사용자가 선택한 감정.

**06.09** `content`와 `emotion_type`은 데이터 파일과 일치하지 않으면 오류 메시지 응답.

response:

성공

```json
{
"title": "시 타이틀",
"poem" :  "시 텍스트 값",
"phrase" : "생성된 문구",
"emotion_id" : int
}
```

**05.18** `emotion_id` 전달 추가. 전달받은 `emotion_id`는 이후에 시 저장에 다시 보내주세요.

**06.09** `title` 응답 추가, phrase는 "문구 미반영"으로 응답함. 데이터 업데이트시 추후 수정.

error -

HTTP 코드 400 : 데이터베이스 오류

HTTP 코드 500 : 서버 오류

### 시 저장 API

경로: api/today/poems

메서드: POST

request:

```json
{
  "diary_id":int,
  "emotion_id":int,
  "title":"시 제목 값",
  "poem": "시 텍스트 값"
}
```

`diary_id`: 일기->DB API response의 `diary_id`<br>
`emotion_id`: 시,문구 생성 API response의 `emotion_id`<br>
`title`: 시,문구 생성 API response의 `title` <br>
`poem`: 시, 문구 생성 API response의 `poem`

**06.09** `title` 요청 추가

response: <br>
성공 <br>
HTTP 코드: 201 <br>
**06.06**

```json
{
  "diaryMessage":"시 저장 완료.",
  "poem_id":int
}
```

`poem_id`: 저장된 시의 id, 시 좋아요 API 요청에서 요구함.

error -
HTTP 코드 500

### 시 좋아요 API

request:

```json
{
  "poem_id":int,
  "liked":0 or 1
}
```

`poem_id`: 시 저장 API에서 응답 받은 poem_id <br>
`liked`: 좋아요 -> 1, 좋아요 취소 -> 0

response:

성공 - HTTP 코드: 201

에러 - HTTP 코드: 500

## likedPoems 명세서

상위 경로: api/likedPoems

### 찜한 시 조회 API
**06.09** `date` 응답 추가, `created_at`응답 제거

경로: api/likedPoems/view

메서드: GET

request:

- Query Param <br>
  `user_id` : 사용자 ID

response: <br>
`poem_text` : 사용자가 찜한 시 내용<br>
~~`created_at`: 찜한 시가 생성된 시간~~<br>
`date`: 시 저장 날짜 (일기 저장시 입력했던 date)

```json
{
    "poems": [
        {
            "poem_text": "무거운 서류 뭉치처럼\n쌓여가는 피로\n의자에 몸을 맡기고\n한숨이 길어만 간다",
            "date": "2025-06-06T15:00:00.000Z"
        }
    ]
}
```

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

### `GET /statistics/yearly-happiness`

#### 설명  
전체 감정중 행복도를 표시합니다.

#### 응답 예시

```json
{
    "year": 2025,
    "emotions": [
        "기쁨",
        "행복함",
        "즐거움"
    ],
    "monthlyCounts": [
        {
            "month": 1,
            "count": 0
        },
        {
            "month": 2,
            "count": 0
        },
        {
            "month": 3,
            "count": 0
        },
        {
            "month": 4,
            "count": 0
        },
        {
            "month": 5,
            "count": 12
        },
        {
            "month": 6,
            "count": 7
        },
        {
            "month": 7,
            "count": 0
        },
        {
            "month": 8,
            "count": 0
        },
        {
            "month": 9,
            "count": 0
        },
        {
            "month": 10,
            "count": 0
        },
        {
            "month": 11,
            "count": 0
        },
        {
            "month": 12,
            "count": 0
        }
    ]
}
```

---

## 📝 참고 사항

- 날짜 형식은 `YYYY-MM-DD` 또는 `YYYY-MM`을 사용합니다.
- JWT 인증 토큰을 `Authorization: Bearer <token>` 형태로 포함해야 합니다.
- 모든 API는 인증된 사용자(userId)를 기준으로 동작합니다.
