document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 0) { // 스크롤이 300px 이상일 때
            scrollToTopBtn.classList.add('show'); // 클래스 추가로 나타나게
        } else {
            scrollToTopBtn.classList.remove('show'); // 클래스 제거로 사라지게
        }
    });

    // 버튼 클릭 이벤트 리스너
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 스크롤 부드럽게 이동
        });
    });
});