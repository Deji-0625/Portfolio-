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

// --- 5. Cinematic Project Carousel "Camera Focus" ---
document.addEventListener("DOMContentLoaded", function() {
    const track = document.getElementById('project-track');
    const cards = document.querySelectorAll('.carousel-card');

    if (!track || cards.length === 0) return; // Safety check if the carousel isn't on the current page

    // This watches the track and calculates which card is in the center
    const carouselObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active from all cards
                cards.forEach(c => c.classList.remove('active'));
                // Add active to the centered card
                entry.target.classList.add('active');
            }
        });
    }, {
        root: track,
        threshold: 0.6 // The card must be 60% inside the middle of the container to trigger
    });

    cards.forEach(card => carouselObserver.observe(card));
});
