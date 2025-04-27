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

  - Body
    ```json
    {
      "username": "username",
      "email": "email", //@이 포함되어야 함.
      "password": "password"
    }
    ```

- ### Response
- 회원가입 성공

  - HTTP 코드: 201
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

> **HTTP Method:** POST <br> > **URL:** /auth/login

- ### Request

  - Body
    ```json
    {
      "identifier": "username" || "email",
      "password": "password"
    }
    ```

- ### Response
- 로그인 성공

  - HTTP 코드:200
  - Body

  ```json
  {
        "authMessage": "로그인에 성공했습니다.",
        "accessToken" : accessToken
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

> **HTTP Method:** POST <br> > **URL:** /auth/token

- ### Request

  - Body: 요구하지 않음

- ### Response
- 토큰 갱신 성공

  - HTTP 코드: 200
  - Body

  ```json
  { "accessToken" : accessToken}
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

> **HTTP Method:** POST <br> > **URL:** /auth/logout

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

> **HTTP Method:** POST <br> > **URL:** /auth/auth

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
