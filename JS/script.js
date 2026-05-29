// --- 1. Scroll State Logic ---
window.addEventListener('scroll', () => {
    const body = document.body;
    if (window.scrollY > 50) {
        body.classList.add('scrolled');
        
        // NEW: Simply play the videos when the user scrolls down!
        const dVid = document.getElementById('vid-desktop');
        const mVid = document.getElementById('vid-mobile');
        if (dVid) dVid.play().catch(e => {});
        if (mVid) mVid.play().catch(e => {});
        
    } else {
        body.classList.remove('scrolled');
    }
});

// --- 2. Scroll Reveal Animations ---
const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { 
        if (entry.isIntersecting) entry.target.classList.add('active'); 
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// --- 3. Mobile Hamburger Menu ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// --- 4. Dropdown Logic (Click for All Devices) ---
const dropdownToggle = document.querySelector('.dropdown-toggle');
const navDropdown = document.querySelector('.nav-dropdown');

if (dropdownToggle && navDropdown) {
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault(); 
        navDropdown.classList.toggle('active');
    });
}

// --- 5. True Infinite Loop "Circle Ball" Carousel ---
document.addEventListener("DOMContentLoaded", function() {
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

        // 2. Center Detection (Scales the middle card up)
        const carouselObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    allCards.forEach(c => c.classList.remove('active'));
                    entry.target.classList.add('active');
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
        
        // Wait 100ms for the browser to render the rigid CSS widths
        setTimeout(() => {
            const cardWidth = originalCards[0].offsetWidth;
            const gapStyle = window.getComputedStyle(track).gap;
            const gap = parseFloat(gapStyle) || 0;
            oneSetWidth = (cardWidth + gap) * originalCards.length;

            track.scrollLeft = oneSetWidth * 7;
        }, 100);

        // Listen to your swiping
        track.addEventListener('scroll', () => {
            if (oneSetWidth === 0) return; // Guard until math is done

            if (track.scrollLeft <= oneSetWidth * 2) {
                track.scrollLeft += (oneSetWidth * 5);
            } 
            else if (track.scrollLeft >= oneSetWidth * 11) {
                track.scrollLeft -= (oneSetWidth * 5);
            }
        });
    });
});
