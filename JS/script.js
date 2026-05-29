document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Scroll Events for Header and Logo ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Hamburger Menu ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // --- 3. Dropdown Menu Functionality ---
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const navDropdown = document.querySelector('.nav-dropdown');

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside of it
        document.addEventListener('click', (e) => {
            if (!navDropdown.contains(e.target)) {
                navDropdown.classList.remove('active');
            }
        });
    }

    // --- 4. THE REVEAL ANIMATION (Fade in as you scroll) ---
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

    revealOnScroll(); // Run once on load
    window.addEventListener('scroll', revealOnScroll); // Run on scroll


    // --- 5. TRUE INFINITE LOOP CAROUSEL (Fixes the loop & darkness!) ---
    const tracks = document.querySelectorAll('.carousel-track');

    tracks.forEach(track => {
        const originalCards = Array.from(track.querySelectorAll('.carousel-card'));
        if (originalCards.length === 0) return;

        // 1. Build the Massive Track (Clone 14 times)
        for (let i = 0; i < 14; i++) {
            originalCards.forEach(card => {
                const clone = card.cloneNode(true);
                track.appendChild(clone);
            });
        }

        const allCards = track.querySelectorAll('.carousel-card');

        // 2. Center Detection (Lights up the middle card)
        const carouselObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    allCards.forEach(c => c.classList.remove('active'));
                    entry.target.classList.add('active'); // Restores 100% brightness
                }
            });
        }, {
            root: track,
            rootMargin: "0px -49% 0px -49%", 
            threshold: 0 
        });

        allCards.forEach(card => carouselObserver.observe(card));

        // 3. The Seamless Teleportation Engine
        let oneSetWidth = 0;
        
        setTimeout(() => {
            const cardWidth = originalCards[0].offsetWidth;
            const gapStyle = window.getComputedStyle(track).gap;
            const gap = parseFloat(gapStyle) || 0;
            oneSetWidth = (cardWidth + gap) * originalCards.length;

            track.scrollLeft = oneSetWidth * 7;
        }, 100);

        track.addEventListener('scroll', () => {
            if (oneSetWidth === 0) return; 

            if (track.scrollLeft <= oneSetWidth * 2) {
                track.scrollLeft += (oneSetWidth * 5);
            } 
            else if (track.scrollLeft >= oneSetWidth * 11) {
                track.scrollLeft -= (oneSetWidth * 5);
            }
        });
    });

    // --- 6. FULLSCREEN LIGHTBOX FUNCTIONALITY (For Designs Page) ---
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
