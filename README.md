📄 README.md

# My Project (Node.js + MySQL + Railway)

## 📦 프로젝트 복제 & 실행 방법

1. 레포지토리 클론하기
```bash
git clone https://github.com/seo614/hanol_db.git
cd hanol_db
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
