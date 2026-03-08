document.getElementById('writeForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;
    const date = new Date().toISOString().split('T')[0];
    const views = 0;

    // 게시글 데이터 저장
    const postData = { title, author, content, date, views };
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.unshift(postData);
    localStorage.setItem('posts', JSON.stringify(posts));

    alert('글이 저장되었습니다.');
    window.location.href = 'notice.html';
});

$(document).ready(function () {
    const table = $('#noticeTable').DataTable({
        pageLength: 10,
    });

    // 게시글 데이터 로드
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach((post, index) => {
        table.row.add([
            index + 1,
            `<a href="#">${post.title}</a>`,
            post.author,
            post.date,
            post.views
        ]).draw();
    });
});