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

// --- 5. True Infinite Loop "Circle Ball" Carousel ---
document.addEventListener("DOMContentLoaded", function() {
    const tracks = document.querySelectorAll('.carousel-track');

    tracks.forEach(track => {
        const originalCards = Array.from(track.querySelectorAll('.carousel-card'));
        if (originalCards.length === 0) return;

        // 1. Build the Massive Track (Clone 14 times)
        // This gives you massive runway in both directions
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
            // Calculate exactly how many pixels wide ONE group of your projects is
            const cardWidth = originalCards[0].offsetWidth;
            const gapStyle = window.getComputedStyle(track).gap;
            const gap = parseFloat(gapStyle) || 0;
            oneSetWidth = (cardWidth + gap) * originalCards.length;

            // Start the user exactly in the middle of the massive track (Set 7)
            // This means you can immediately swipe left OR right!
            track.scrollLeft = oneSetWidth * 7;
        }, 100);

        // Listen to your swiping
        track.addEventListener('scroll', () => {
            if (oneSetWidth === 0) return; // Guard until math is done

            // If you swipe too close to the left edge...
            if (track.scrollLeft <= oneSetWidth * 2) {
                // Invisibly teleport scroll position forward by 5 sets
                track.scrollLeft += (oneSetWidth * 5);
            } 
            // If you swipe too close to the right edge...
            else if (track.scrollLeft >= oneSetWidth * 11) {
                // Invisibly teleport scroll position backward by 5 sets
                track.scrollLeft -= (oneSetWidth * 5);
            }
        });
    });
});

// --- 6. Video Logo "Play Once On Reveal" Engine ---
document.addEventListener("DOMContentLoaded", function() {
    const desktopVid = document.getElementById('vid-desktop');
    const mobileVid = document.getElementById('vid-mobile');

    let desktopPlayed = false;
    let mobilePlayed = false;

    const checkLogoVisibility = () => {
        // Check Desktop Header Logo
        if (desktopVid && !desktopPlayed) {
            const desktopLogo = document.getElementById('desktop-header-logo');
            if (desktopLogo && window.getComputedStyle(desktopLogo).opacity > 0) {
                desktopVid.play().catch(e => console.log("Video autoplay prevented:", e));
                desktopPlayed = true; // Locks it so it never plays again
            }
        }
        
        // Check Mobile Header Logo
        if (mobileVid && !mobilePlayed) {
            const mobileLogo = document.getElementById('mobile-stacked-logo');
            if (mobileLogo && window.getComputedStyle(mobileLogo).opacity > 0) {
                mobileVid.play().catch(e => console.log("Video autoplay prevented:", e));
                mobilePlayed = true; // Locks it so it never plays again
            }
        }
    };

    // Check immediately (for inner pages where the nav is already visible)
    setTimeout(checkLogoVisibility, 100);
    
    // Check continuously on scroll (for the homepage where it fades in)
    window.addEventListener('scroll', checkLogoVisibility);
});
