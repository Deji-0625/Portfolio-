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
        const revealPoint = 100; 
        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    revealOnScroll(); 
    window.addEventListener('scroll', revealOnScroll); 


    // --- 5. TRUE INFINITE LOOP CAROUSEL (Thumbnails Only) ---
    const tracks = document.querySelectorAll('.carousel-track');

    tracks.forEach(track => {
        const originalCards = Array.from(track.querySelectorAll('.carousel-card'));
        if (originalCards.length === 0) return;

        for (let i = 0; i < 14; i++) {
            originalCards.forEach(card => {
                const clone = card.cloneNode(true);
                track.appendChild(clone);
            });
        }

        const allCards = track.querySelectorAll('.carousel-card');

        const carouselObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    
                    // Step A: Remove active class from all cards
                    allCards.forEach(c => c.classList.remove('active'));
                    
                    // Step B: Light up the center card (Triggers CSS scale and text reveal, NO video loading)
                    entry.target.classList.add('active');
                }
            });
        }, {
            root: track,
            rootMargin: "0px -49% 0px -49%", 
            threshold: 0 
        });

        allCards.forEach(card => carouselObserver.observe(card));

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

    // --- 6. THE FUNNEL & THE LIGHTBOX ---

    // A. HOME PAGE FUNNEL
    const carouselCards = document.querySelectorAll('.carousel-card');
    
    carouselCards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('active')) {
                const isVideo = card.getAttribute('data-video-id');
                if (isVideo) {
                    window.location.href = 'visuals.html';
                } else {
                    window.location.href = 'designs.html';
                }
            }
        });
    });

    // B. INNER PAGE LIGHTBOX
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideoContainer = document.getElementById('lightbox-video-container');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const projectCards = document.querySelectorAll('.project-card');

    if (lightbox && projectCards.length > 0) {
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const titleEl = card.querySelector('h3, .project-title');
                const title = titleEl ? titleEl.innerText : '';
                if (lightboxCaption) lightboxCaption.innerText = title;

                const videoId = card.getAttribute('data-video-id');
                
                if (videoId) {
                    // Inject and Play Video
                    if(lightboxImg) lightboxImg.style.display = 'none';
                    if(lightboxVideoContainer) {
                        lightboxVideoContainer.style.display = 'block';
                        lightboxVideoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
                    }
                } else {
                    // Show Image
                    const img = card.querySelector('img');
                    if (img) {
                        if(lightboxVideoContainer) {
                            lightboxVideoContainer.innerHTML = ''; 
                            lightboxVideoContainer.style.display = 'none';
                        }
                        if(lightboxImg) {
                            lightboxImg.src = img.src;
                            lightboxImg.style.display = 'block';
                        }
                    }
                }

                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            });
        });

        // The Close Function
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
            setTimeout(() => { 
                if(lightboxVideoContainer) lightboxVideoContainer.innerHTML = ''; 
            }, 300);
        };

        if(lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
                closeLightbox();
            }
        });
    }
});
