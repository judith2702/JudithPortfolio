/* ============================================================
   PORTFOLIO SCRIPT — Judith Soundarya Joseph
   - Hamburger mobile menu toggle
   - Active nav link on scroll (Intersection Observer)
   - Scroll-reveal animations (Intersection Observer)
   - Typing animation for hero subtitle
   - Navbar shrink on scroll
   - Scroll-to-top button
   - Contact form submission handling
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------------------
       1. HAMBURGER MENU
    ------------------------------------------------------- */
    const hamburger = document.getElementById('hamburger');
    const menuList  = document.getElementById('menu-list-text');

    if (hamburger && menuList) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('open');
            menuList.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
            // Prevent body scroll when menu is open
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when a nav link is clicked
        menuList.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                menuList.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }


    /* -------------------------------------------------------
       2. NAVBAR SHRINK ON SCROLL
    ------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });


    /* -------------------------------------------------------
       3. ACTIVE NAV LINK — Intersection Observer
    ------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(section => navObserver.observe(section));


    /* -------------------------------------------------------
       4. SCROLL REVEAL ANIMATIONS
    ------------------------------------------------------- */
    const revealEls = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target); // animate once
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));


    /* -------------------------------------------------------
       5. TYPING ANIMATION — Hero subtitle
    ------------------------------------------------------- */
    const typedEl = document.getElementById('typed-text');
    const phrases = [
        'Cloud Platform Engineer',
        'AWS & Terraform Expert',
        'DevOps Automation Pro',
        'Python Developer',
        'AI/ML Enthusiast',
    ];
    let phraseIndex = 0;
    let charIndex   = 0;
    let isDeleting  = false;
    const typeSpeed   = 80;
    const deleteSpeed = 45;
    const pauseTime   = 1800;

    function type() {
        if (!typedEl) return;
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedEl.textContent = currentPhrase.slice(0, charIndex - 1);
            charIndex--;
        } else {
            typedEl.textContent = currentPhrase.slice(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            delay = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 300;
        }

        setTimeout(type, delay);
    }
    setTimeout(type, 800); // slight delay before starting


    /* -------------------------------------------------------
       6. SCROLL TO TOP BUTTON
    ------------------------------------------------------- */
    const scrollTopBtn = document.getElementById('scroll-top-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    /* -------------------------------------------------------
       7. CONTACT FORM — Formspree AJAX submission
    ------------------------------------------------------- */
    const contactForm  = document.getElementById('contact-form');
    const sendBtnText  = document.getElementById('btn-send-text');
    const formSuccess  = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            sendBtnText.textContent = 'Sending…';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    contactForm.reset();
                    formSuccess.classList.add('show');
                    sendBtnText.textContent = 'Send Message';
                    setTimeout(() => formSuccess.classList.remove('show'), 5000);
                } else {
                    sendBtnText.textContent = 'Error — try again';
                    setTimeout(() => { sendBtnText.textContent = 'Send Message'; }, 3000);
                }
            } catch {
                sendBtnText.textContent = 'Network error';
                setTimeout(() => { sendBtnText.textContent = 'Send Message'; }, 3000);
            }
        });
    }

}); // end DOMContentLoaded
