document.addEventListener('DOMContentLoaded', () => {

    // === 1. Роутинг (SPA Навигация) ===
    const headerLinks = document.querySelectorAll('.nav-link');
    const footerLinks = document.querySelectorAll('.nav-link-footer');
    const sections = document.querySelectorAll('.page-section');
    const btnExplore = document.getElementById('btn-explore');
    const navMenu = document.getElementById('nav-menu');
    const burgerBtn = document.getElementById('burger-btn');

    function navigateTo(targetId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });

        headerLinks.forEach(link => {
            link.classList.remove('active');
        });

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        document.querySelectorAll(`.nav-link[data-target="${targetId}"]`).forEach(link => {
            link.classList.add('active');
        });

        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Сброс всех reveal-анимаций перед новым запуском
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => el.classList.remove('active'));

        // Перезапуск анимаций с небольшой задержкой
        setTimeout(revealElements, 50);
        
        // Анимация навыков: запуск только на вкладке "Обо мне"
        if (targetId === 'about') {
            setTimeout(animateProgressBars, 100);
        } else {
            resetProgressBars();
        }
    }

    headerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.getAttribute('data-target'));
        });
    });

    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.getAttribute('data-target'));
        });
    });

    if (btnExplore) {
        btnExplore.addEventListener('click', () => navigateTo('portfolio'));
    }

    if (burgerBtn) {
        burgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // === 2. Фильтрация портфолио ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // === 3. Анимации при скролле (Reveal) ===
    function revealElements() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const parentSection = reveal.closest('.page-section');
            if (parentSection && !parentSection.classList.contains('active')) return;

            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    // === 4. Анимация полос навыков ===
    function animateProgressBars() {
        const progressFills = document.querySelectorAll('.progress-fill');
        progressFills.forEach(fill => {
            const targetWidth = fill.getAttribute('data-width');
            fill.style.width = targetWidth;
        });
    }

    function resetProgressBars() {
        const progressFills = document.querySelectorAll('.progress-fill');
        progressFills.forEach(fill => {
            fill.style.width = '0';
        });
    }

    window.addEventListener('scroll', revealElements);
    revealElements();

    // === 5. Форма обратной связи ===
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const agreement = document.getElementById('agreement').checked;

            if (!agreement) return;

            alert(`Спасибо! Сообщение успешно отправлено.`);
            contactForm.reset();
        });
    }
});