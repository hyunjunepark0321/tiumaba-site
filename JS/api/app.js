const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const postsRoutes = require('./routes/posts'); // API 라우터

const app = express();
const HTTP_PORT = 3000; // Node.js 서버는 HTTP로 작동

// Middleware
app.use(cors({
    origin: ['https://tiumesdm.com', 'http://127.0.0.1:5500', 'http://localhost:5500', 'http://221.154.147.14:5500'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(bodyParser.json());
app.use('/api/posts', postsRoutes); // API 라우팅

// HTTP 서버 시작 (HTTPS는 Nginx에서 처리)
app.listen(HTTP_PORT, () => {
    console.log(`HTTP Server running at http://127.0.0.1:${HTTP_PORT}`);
});
