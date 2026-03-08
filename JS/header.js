const hamburger = document.getElementById('hamburger');
const navContainer = document.getElementById('navContainer');
let lastScrollY = 0;

    window.addEventListener('scroll', function () {
        if (window.innerWidth > 768) {
            const logoContainer = document.querySelector('.logo-container');
            const navigationContainer = document.querySelector('.navigation-container');
            const carets = document.querySelectorAll('.caret, .caret-right');

            if (window.scrollY > 50 && window.scrollY > lastScrollY) {
                // 스크롤을 아래로 내릴 때
                logoContainer.classList.add('hidden');
                navigationContainer.classList.add('scrolled');
            } else if (window.scrollY <= 50) {
                // 최상단에 도달할 때
                logoContainer.classList.remove('hidden');
                navigationContainer.classList.remove('scrolled');
            }

            lastScrollY = window.scrollY;
        }
    });

    const mobileNav = document.getElementById('mobileNav');
    const submenuHeaders = document.querySelectorAll('.mobile-nav .has-submenu');

    hamburger.addEventListener('click', function() {
        if (mobileNav.classList.contains('open')) {
            mobileNav.classList.add('closing');
            mobileNav.style.animation = 'fadeOutUp 0.3s ease-in-out';
            setTimeout(() => {
                mobileNav.classList.remove('open', 'closing');
                mobileNav.style.animation = '';
            }, 300);
        } else {
            mobileNav.classList.add('open');
            mobileNav.style.animation = 'fadeInDown 0.3s ease-in-out';
        }
        this.classList.toggle('open');
    });

    submenuHeaders.forEach(header => {
        header.addEventListener('click', (event) => {
            event.stopPropagation(); // 이벤트 전파 방지
            const submenu = header.querySelector('.submenu');
            submenu.classList.toggle('open');
            header.classList.toggle('open');
        });
    });