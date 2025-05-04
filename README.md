📄 README.md

# HANOL(Node.js + MySQL + Railway)

## 📦 프로젝트 복제 & 실행 방법

1. 레포지토리 클론하기
```bash
git clone https://github.com/seo614/hanol_db_.git
cd hanol_db_
```

2. npm 설치
```bash
npm install
```

3. `.env` 파일 만들기
```bash
cp .env.example .env
```

4. `.env` 파일을 열어서 ** DB 정보** 입력하기

5. 실행하기
```bash
node src/index.js
```

✅ 성공하면 "✅ DB 연결 성공!" 이라고 뜹니다!


## 🔒 보안 주의사항

- `.env` 파일에는 비밀번호가 들어있으니 각자 가지고만 있으시면 감사하겠습니다.
- `.gitignore`에 이미 `.env`는 무시되도록 되어있습니다.
- 팀원분들은 `.env.example` 보고 각자 `.env` 만들어서 써주시면 감사하겠습니다.

// 📄 README_DB_SETUP.md

# 📦 프론트엔드에서 백엔드(DB) 연동 가이드

## 1️⃣ 환경 변수 설정

1. `.env.example` 파일을 참고하여 `.env` 파일을 생성합니다:

```bash
cp .env.example .env
```

2. `.env` 파일을 열고, 백엔드 API URL을 입력합니다.

```env
VITE_API_BASE_URL=http://localhost:3000
```


## 2️⃣ API 호출 예시

```javascript
import { fetchTables } from './api/db';

fetchTables().then((tables) => {
  console.log('📦 테이블 목록:', tables);
});
```


## 3️⃣ 백엔드 서버 실행

```bash
git clone https://github.com/HUFS-HANOL/backend.git
cd backend
npm install
npm run dev
```

✅ 실행 후 `http://localhost:3000`에서 API 호출이 가능합니다.


## 4️⃣ 프론트에서 연동 확인

프론트엔드에서 `fetchTables()` 함수를 호출하여 DB 테이블 목록을 확인할 수 있습니다.
