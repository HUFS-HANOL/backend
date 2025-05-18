# 한올 backend

## 서버 실행 가이드

```
git clone --branch min-auth_ver.1 https://github.com/HUFS-HANOL/backend.git
```

.env 파일 backend 폴더에 삽입 후 다음 터미널 실행

```
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
│
├─models //database 관련
│      database.js //데이터베이스 연동
│
└─routes //라우팅 경로
        authRoutes.js // auth 라우팅
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
**05.18** diary_id,emotion_id 관련 추가, 시 저장 API 추가

### 일기->DB API

경로: api/today/diaries

메서드: POST

request:

```json
{
"user_id" : int,
"content" : "일기 텍스트 값"
}
```

\*user_id = 1 로 해서 테스트

response:

성공 - HTTP 코드: 201

```json
{
  "diaryMessage": "일기 저장 완료",
  "diay_id": int

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
"diary_id" : int
}
```

**05.18** `diary_id` 요청 추가. 일기->DB API의 `diary_id`값.

response:

성공

```json
{
"poem" :  "봄비는 \n 간질이는 손가락을 갖고 있나? \n 대지가 풋사랑에 빠진 것 같다 ",
"phrase" : "설레는 당신의 순간을 함께 응원할게요.",
"emotion_id" : int
}
```

**05.18** `emotion_id` 전달 추가. 전달받은 `emotion_id`는 이후에 시 저장에 다시 보내주세요.

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
  "poem": "시 텍스트 값"
}
```

`diary_id`: 일기->DB API response의 `diary_id`<br>
`emotion_id`: 시,문구 생성 API response의 `emotion_id`<br>
`poem`: 시, 문구 생성 API response의 `poem`

response:
성공 - HTTP 코드: 201

error -
HTTP 코드 500
