document.addEventListener('DOMContentLoaded', function () {

    // ===== 1. LOGIKA KUSTOM KURSOR & SOROTAN LATAR =====
    const cursor = document.querySelector('.custom-cursor');
    const hoverableElements = document.querySelectorAll('a, .card');

    function moveCursor(e) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    }

    hoverableElements.forEach(el => {
        el.addEventListener('mouseover', () => cursor.classList.add('hover'));
        el.addEventListener('mouseout', () => cursor.classList.remove('hover'));
    });

    window.addEventListener('mousedown', () => cursor.classList.add('click'));
    window.addEventListener('mouseup', () => cursor.classList.remove('click'));
    window.addEventListener('mousemove', moveCursor);

    // ===== 2. LOGIKA EFEK GELOMBANG SAAT KLIK (RIPPLE) =====
    document.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        document.body.appendChild(ripple);
        ripple.style.left = `${e.clientX - ripple.clientWidth / 2}px`;
        ripple.style.top = `${e.clientY - ripple.clientHeight / 2}px`;
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    // ===== 3. LOGIKA ANIMASI SCROLL =====
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    cards.forEach(card => {
        observer.observe(card);
    });

    // ===== 4. LOGIKA SMOOTH SCROLL =====
    const navLinks = document.querySelectorAll('.section-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});