// generateToken.js
require('dotenv').config(); // 👈 꼭 필요!
const jwt = require('jsonwebtoken');

const token = jwt.sign(
    { id: 1, name: '테스트유저' },
    process.env.ACCESS_SECRETKEY, // 👈 'hufshanol'이 들어감
    { expiresIn: '1h' }
);

console.log('✅ 생성된 JWT 토큰:\n');
console.log(token);
