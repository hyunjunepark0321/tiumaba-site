const postsTable = document.getElementById('posts-table');
const writeBtn = document.getElementById('write-btn');
const pagination = document.getElementById('pagination');
const postsPerPage = 10;
let currentPage = 1;

function fetchPosts() {
    fetch('/api/posts')
        .then(response => response.json())
        .then(posts => {
            displayPosts(posts);
            setupPagination(posts);
        });
}

function displayPosts(posts) {
    postsTable.innerHTML = `
        <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회</th>
        </tr>
    `;
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const paginatedPosts = posts.slice(start, end);

    paginatedPosts.forEach((post, index) => {
        const row = postsTable.insertRow();
        row.innerHTML = `
            <td>${start + index + 1}</td>
            <td><a href="post.html?id=${post.id}">${post.title}</a></td>
            <td>${post.author}</td>
            <td>${new Date(post.date).toLocaleDateString()}</td>
            <td>${post.views}</td>
        `;
    });
}

function setupPagination(posts) {
    pagination.innerHTML = '';
    const totalPages = Math.ceil(posts.length / postsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayPosts(posts);
        });
        pagination.appendChild(pageButton);
    }
}

writeBtn.addEventListener('click', () => {
    const password = prompt('비밀번호를 입력하세요:');
    if (password === 'admin123') {
        window.location.href = 'write.html';
    } else {
        alert('비밀번호가 틀렸습니다.');
    }
});

fetchPosts();