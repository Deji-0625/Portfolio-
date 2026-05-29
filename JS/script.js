document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Events for Header and Logo
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    });

    // 2. Mobile Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // 3. Dropdown Menu functionality
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const navDropdown = document.querySelector('.nav-dropdown');

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!navDropdown.contains(e.target)) {
                navDropdown.classList.remove('active');
            }
        });
    }

    // 4. THE REVEAL ANIMATION (Crucial for images showing up!)
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Triggers when element is 100px from the bottom

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    // Run once on load to reveal elements already visible at the top
    revealOnScroll();

    // Run every time the user scrolls
    window.addEventListener('scroll', revealOnScroll);

// 5. FULLSCREEN LIGHTBOX FUNCTIONALITY
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const projectCards = document.querySelectorAll('.project-card');

    if (lightbox && projectCards.length > 0) {
        // When any project card is clicked
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const img = card.querySelector('.project-media img');
                const title = card.querySelector('.project-title').innerText;
                
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxCaption.innerText = title;
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Locks background scrolling
                }
            });
        });

        // Close lightbox when clicking the X
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto'; // Unlocks scrolling
        });

        // Close lightbox when clicking the dark background outside the image
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});
