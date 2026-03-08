const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '3.37.34.156',       // AWS MySQL 서버 호스트
    user: 'admin',           // MySQL 사용자 이름
    password: '150215',      // MySQL 비밀번호
    database: 'notice_db',   // MySQL 데이터베이스 이름
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();