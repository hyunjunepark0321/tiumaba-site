const express = require('express');
const router = express.Router();
const db = require('../db');

// 모든 게시글 조회
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT id, title, author, created_at, likes, views, is_notice FROM notice_posts WHERE is_deleted = 0 ORDER BY is_notice DESC, created_at DESC'
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// 특정 게시글 조회 및 조회수 증가
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // 조회수 증가
        await db.query('UPDATE notice_posts SET views = views + 1 WHERE id = ?', [id]);

        // 게시글 데이터 반환
        const [rows] = await db.query('SELECT * FROM notice_posts WHERE id = ? AND is_deleted = 0', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});

// 게시글 수정
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, is_notice } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const [result] = await db.query(
            'UPDATE notice_posts SET title = ?, content = ?, is_notice = ? WHERE id = ? AND is_deleted = 0',
            [title, content, is_notice, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Post not found or already deleted' });
        }

        res.status(200).json({ message: 'Post updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update post' });
    }
});

// 게시글 삭제
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await db.query('UPDATE notice_posts SET is_deleted = 1 WHERE id = ?', [id]);
        res.status(200).json({ message: '게시글 삭제 성공' });
    } catch (err) {
        console.error('게시글 삭제 에러:', err);
        res.status(500).json({ error: '게시글 삭제 실패' });
    }
});

// 게시글 작성
router.post('/', async (req, res) => {
    const { title, content, author, is_notice } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO notice_posts (title, content, author, is_notice) VALUES (?, ?, ?, ?)',
            [title, content, author, is_notice]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// 관리자 비밀번호 검증
router.post('/validate-password', async (req, res) => {
    const { password } = req.body;

    // 서버에 저장된 비밀번호와 비교
    const adminPassword = '0321'; // 서버에 하드코딩된 비밀번호
    if (password === adminPassword) {
        return res.status(200).json({ valid: true });
    } else {
        return res.status(403).json({ valid: false, message: '비밀번호가 올바르지 않습니다.' });
    }
});

module.exports = router;