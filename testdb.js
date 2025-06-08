const pool = require('./db');  // db.js 위치에 따라 경로 맞추기

async function testConnection() {
    let conn;
    try {
        conn = await pool.getConnection();
        console.log('✅ DB 연결 성공!');
    } catch (err) {
        console.error('❌ DB 연결 실패:', err.message);
    } finally {
        if (conn) conn.release();
    }
}

testConnection();
