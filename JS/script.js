// --- 1. Scroll State Logic ---
window.addEventListener('scroll', () => {
    const body = document.body;
    if (window.scrollY > 50) {
        body.classList.add('scrolled');
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

// --- 5. Multi-Carousel "Camera Focus" & Infinite Loop ---
document.addEventListener("DOMContentLoaded", function() {
    // Find EVERY carousel track on the page
    const tracks = document.querySelectorAll('.carousel-track');

    if (tracks.length === 0) return;

    // Loop through each track independently
    tracks.forEach(track => {
        let cards = track.querySelectorAll('.carousel-card');

        // 1. INFINITE LOOP GENERATOR (For this specific track)
        const originalCards = Array.from(cards);
        originalCards.forEach(card => {
            let clone = card.cloneNode(true);
            track.appendChild(clone);
        });
        originalCards.forEach(card => {
            let clone = card.cloneNode(true);
            track.appendChild(clone); // Triples the cards for a smooth loop
        });

        // Re-select all cards inside this track now that we've multiplied them
        cards = track.querySelectorAll('.carousel-card');

        // 2. PERFECT CENTER DETECTION (For this specific track)
        const carouselObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    cards.forEach(c => c.classList.remove('active'));
                    entry.target.classList.add('active');
                }
            });
        }, {
            root: track,
            rootMargin: "0px -49% 0px -49%", // Creates a laser-thin trigger line in the exact center
            threshold: 0 
        });

        cards.forEach(card => carouselObserver.observe(card));
    });
});
