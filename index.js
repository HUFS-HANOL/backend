*/

// 📄 src/index.js
require('dotenv').config();
const mysql = require('mysql2');

// .env에서 값 가져오기
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

connection.connect((err) => {
  if (err) {
    console.error('❌ DB 연결 실패:', err);
  } else {
    console.log('✅ DB 연결 성공!');
    // 테스트 쿼리 실행
    connection.query('SHOW TABLES;', (err, results) => {
      if (err) throw err;
      console.log('📦 테이블 목록:', results);
      connection.end();
    });
  }
});

/*
