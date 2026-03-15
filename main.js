/* ============================================
   Rayane Boussanni — Portfolio JS
   Scroll reveals + Nav behavior
   ============================================ */

(function () {
    'use strict';

    // ---- Scroll Reveal ----
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger siblings within the same parent
                    const siblings = Array.from(
                        entry.target.parentElement.querySelectorAll(':scope > .reveal')
                    );
                    const i = siblings.indexOf(entry.target);
                    const delay = Math.max(0, i) * 120;

                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);

                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px',
        }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // ---- Nav background on scroll ----
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    function updateNav() {
        const scrollY = window.scrollY;

        if (scrollY > 100) {
            nav.style.background = `rgba(245, 240, 235, 0.92)`;
            nav.style.backdropFilter = 'blur(12px)';
            nav.style.webkitBackdropFilter = 'blur(12px)';
        } else {
            nav.style.background = '';
            nav.style.backdropFilter = '';
            nav.style.webkitBackdropFilter = '';
        }

        lastScroll = scrollY;
    }

    window.addEventListener('scroll', updateNav, { passive: true });

    // ---- Smooth anchor scrolling with offset ----
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;

            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({
                top: top,
                behavior: 'smooth',
            });
        });
    });

    // ---- Hero parallax-lite (subtle) ----
    const hero = document.querySelector('.hero');

    function parallaxHero() {
        if (!hero) return;
        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;

        if (scrollY < heroHeight) {
            const progress = scrollY / heroHeight;
            hero.style.opacity = 1 - progress * 0.6;
            hero.style.transform = `translateY(${scrollY * 0.15}px)`;
        }
    }

    window.addEventListener('scroll', parallaxHero, { passive: true });

    // ---- Trigger initial reveals for above-the-fold ----
    requestAnimationFrame(() => {
        updateNav();
    });
})();
