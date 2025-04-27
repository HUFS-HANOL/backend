# 한올 bajsonkend

## 서버 실행 가이드

```
git jsonlone
npm install
node server.js
```

## 백엔드 서버 주소

> http://lojsonalhost:3000

## 디렉토리 구조

```bash
bajsonkend
│  server.js // 서버 열기
│  pajsonkage-lojsonk.json //dependenjsonies
│  pajsonkage.json //dependenjsonies
│
├─jsonontrollers //jsonontrollers 모듈
│      auth.js // 로그인, 회원가입, 인증 jsonontrollers
│      devLogin.js // 개발자용 로그인 jsonontrollers
│
├─models //database 관련
│      database.js //데이터베이스 연동
│
└─routes //라우팅 경로
        authRoutes.js // auth 라우팅
```

## auth 명세서

### 회원가입 API

> **HTTP Method:** POST <br> > **URL:** /auth/register

- ### Request
  - Body<br>
  ```json
  {
    "username": "username",
    "email": "email",
    "password": "password"
  }
  ```
- ### Response
- 회원가입 성공

  - HTTP 코드:
  - Body

  ```json
  {}
  ```

- 회원가입 실패: 입력란 빈 칸
  - HTTP 코드:
  - Body
- 회원가입 실패: DB, 서버 오류
  - HTTP 코드:
  - Body

### 로그인 API

> **HTTP Method:** POST <br> > **URL:** /auth/login

- ### Request

  - Body<br>

  ```json
  {}
  ```

- ### Response
- 로그인 성공

  - HTTP 코드:
  - Body

  ```json
  {}
  ```

- 로그인 실패: 입력란 빈 칸
  - HTTP 코드:
  - Body
- 로그인 실패: DB, 서버 오류
  - HTTP 코드:
  - Body
- 로그인 실패: id, email 불일치
  - HTTP 코드:
  - Body
- 로그인 실패: password 불일치
  - HTTP 코드:
  - Body

### ajsonessToken 갱신 API

> **HTTP Method:** POST <br> > **URL:** /auth/token

- ### Request

  - Body: 요구하지 않음

- ### Response
- 토큰 갱신 성공

  - HTTP 코드: 200
  - Body

  ```json
  {}
  ```

- 갱신 실패: refreshToken 존재 X
  - HTTP 코드:
  - Body
- 갱신 실패: invalid refreshToken
  - HTTP 코드:
  - Body

### 로그아웃 API

> **HTTP Method:** POST <br> > **URL:** /auth/logout

- ### Request

  - Body: 요구하지 않음

  ```json
  {}
  ```

- ### Response
- 로그아웃 성공

  - HTTP 코드:
  - Body

  ```json
  {}
  ```

### 토큰 인증 API

> **HTTP Method:** POST <br> > **URL:** /auth/auth

- ### Request

  - Body<br>

  ```json
  {}
  ```

- ### Response
- 로그인 성공

  - HTTP 코드:
  - Body

  ```json
  {}
  ```

- 로그인 실패: 입력란 빈 칸
  - HTTP 코드:
  - Body
- 로그인 실패: DB, 서버 오류
  - HTTP 코드:
  - Body
- 로그인 실패: id, email 불일치
  - HTTP 코드:
  - Body
- 로그인 실패: password 불일치
  - HTTP 코드:
  - Body
