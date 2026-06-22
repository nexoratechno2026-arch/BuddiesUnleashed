// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('translate-x-full');
        mobileMenu.classList.toggle('translate-x-0');
    });
}

if (closeMenu && mobileMenu) {
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
    });
}

if (mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.classList.remove('translate-x-0');
        });
    });
}

// Sticky Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('bg-dark/95', 'py-2');
        nav.classList.remove('bg-dark/80', 'py-4');
    } else {
        nav.classList.remove('bg-dark/95', 'py-2');
        nav.classList.add('bg-dark/80', 'py-4');
    }
});

// Membership Form WhatsApp Redirect
const membershipForm = document.getElementById('membershipForm');

if (membershipForm) {
    membershipForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const bike = document.getElementById('bike').value;
        
        const message = `Hello Buddies Unleashed Advclan! I want to join the squad.%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Bike:* ${bike}%0A%0AReady to ride with Freedom & Wisdom!`;
        
        // Primary WhatsApp lead: Suriya (+91 88844 33628)
        const whatsappUrl = `https://wa.me/918884433628?text=${message}`;
        
        window.open(whatsappUrl, '_blank');
        
        alert('Application submitted! Redirecting to WhatsApp...');
        membershipForm.reset();
    });
}

// Smooth Scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Statistics Counter Up Animation
const statsSection = document.getElementById('stats');
const counterElements = document.querySelectorAll('[data-target]');
let countersAnimated = false;

const startCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const speed = 100; // time in ms
    let current = 0;
    
    const step = () => {
        const increment = Math.ceil(target / speed);
        current += increment;
        
        if (current >= target) {
            el.textContent = target;
        } else {
            el.textContent = current;
            requestAnimationFrame(step);
        }
    };
    
    requestAnimationFrame(step);
};

const initCountersObserver = () => {
    if (!statsSection || counterElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                counterElements.forEach(el => startCounter(el));
                observer.unobserve(statsSection);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(statsSection);
};

// Premium Gallery & Lightbox Implementation
const galleryGrid = document.getElementById('galleryGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const lightbox = document.getElementById('lightbox');
const lightboxMedia = document.getElementById('lightboxMedia');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

const INITIAL_VISIBLE_COUNT = typeof GALLERY_ASSETS !== 'undefined' ? 8 : 8;
let currentVisibleCount = INITIAL_VISIBLE_COUNT;
let activeLightboxIndex = 0;

const renderGallery = () => {
    if (!galleryGrid || typeof GALLERY_ASSETS === 'undefined') return;
    
    galleryGrid.innerHTML = '';
    const itemsToRender = GALLERY_ASSETS.slice(0, currentVisibleCount);
    
    itemsToRender.forEach((asset, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'overflow-hidden rounded-xl h-80 relative group cursor-pointer border border-white/5 shadow-lg';
        itemDiv.setAttribute('data-aos', 'zoom-in');
        itemDiv.setAttribute('data-index', index);
        
        let mediaHtml = '';
        const assetPath = asset.path ? `./${asset.path}/${asset.name}` : `./assets/bikers/${asset.name}`;
        const assetUrl = encodeURI(assetPath);
        if (asset.type === 'video') {
            mediaHtml = `
                <video src="${assetUrl}" muted class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"></video>
                <div class="absolute inset-0 bg-primary/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl shadow-glow animate-pulse">
                        <i class="fas fa-play ml-1"></i>
                    </div>
                </div>
                <div class="absolute bottom-4 left-4 bg-primary text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/15">
                    <i class="fas fa-video"></i> Video Log
                </div>
            `;
        } else {
            mediaHtml = `
                <img src="${assetUrl}" alt="${asset.label || 'Clan Memory'}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy">
                <div class="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl shadow-glow">
                        <i class="fas fa-expand"></i>
                    </div>
                </div>
            `;
        }
        
        itemDiv.innerHTML = mediaHtml;
        
        // Open Lightbox on Click
        itemDiv.addEventListener('click', () => {
            openLightbox(index);
        });
        
        galleryGrid.appendChild(itemDiv);
    });
    
    // Refresh AOS for dynamically created items
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
    
    // Show/Hide Load More Button
    if (loadMoreBtn) {
        loadMoreBtn.style.display = 'inline-block';
        if (currentVisibleCount >= GALLERY_ASSETS.length) {
            loadMoreBtn.textContent = 'SHOW LESS LOGS';
        } else {
            loadMoreBtn.textContent = 'EXPLORE ALL LOGS';
        }
    }
};

const openLightbox = (index) => {
    if (typeof GALLERY_ASSETS === 'undefined') return;
    
    activeLightboxIndex = index;
    const asset = GALLERY_ASSETS[index];
    const assetPath = asset.path ? `./${asset.path}/${asset.name}` : `./assets/bikers/${asset.name}`;
    const assetUrl = encodeURI(assetPath);
    
    lightboxMedia.innerHTML = '';
    lightboxCaption.textContent = `Asset ${index + 1} of ${GALLERY_ASSETS.length}`;
    
    if (asset.type === 'video') {
        const video = document.createElement('video');
        video.src = assetUrl;
        video.controls = true;
        video.autoplay = true;
        video.className = 'max-h-[80vh] max-w-full rounded-lg shadow-2xl';
        lightboxMedia.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = assetUrl;
        img.alt = asset.label ? asset.label : 'Bikers Gallery Image';
        img.className = 'max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl';
        lightboxMedia.appendChild(img);
    }
    
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Lock background scroll
};

const closeLightbox = () => {
    lightbox.classList.add('hidden');
    lightboxMedia.innerHTML = ''; // Stop video playback if any
    document.body.style.overflow = '';
};

const navigateLightbox = (direction) => {
    if (typeof GALLERY_ASSETS === 'undefined') return;
    
    let newIndex = activeLightboxIndex + direction;
    if (newIndex >= GALLERY_ASSETS.length) newIndex = 0;
    if (newIndex < 0) newIndex = GALLERY_ASSETS.length - 1;
    
    openLightbox(newIndex);
};

// Gallery Events
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        if (currentVisibleCount >= GALLERY_ASSETS.length) {
            currentVisibleCount = INITIAL_VISIBLE_COUNT;
            // Scroll back to gallery top
            const gallerySection = document.getElementById('gallery');
            if (gallerySection) gallerySection.scrollIntoView({ behavior: 'smooth' });
        } else {
            currentVisibleCount = GALLERY_ASSETS.length; // Load all
        }
        renderGallery();
    });
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));

// Keyboard Navigation for Lightbox
window.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigateLightbox(1);
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
});

// Click outside to close lightbox
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Initial Call
document.addEventListener('DOMContentLoaded', () => {
    initCountersObserver();
    renderGallery();
});

// --- Upcoming Event Logic (API) ---
// Hardcoded to display the posters directly from index.html
// Polling and fetching from /api/event have been removed.

// Visited Places Modal Logic
const ridesCompletedBox = document.getElementById('ridesCompletedBox');
const visitedPlacesModal = document.getElementById('visitedPlacesModal');
const visitedPlacesClose = document.getElementById('visitedPlacesClose');
const visitedPlacesGrid = document.getElementById('visitedPlacesGrid');

const visitedPlaces = [
    { name: "Balmuri Falls", file: "Balmuri Falls.jpeg" },
    { name: "Coorg", file: "Coorge.jpeg" },
    { name: "DD Hills", file: "DD Hills .jpeg" },
    { name: "Gangadeeshwara Betta", file: "Gangadeeshwara Betta.jpeg" },
    { name: "Mavathur Dam", file: "Mavathur Dam.jpeg" },
    { name: "Muthurayaswamy Betta", file: "Muthurayaswamy Betta.jpeg" },
    { name: "Nelligudde Kere", file: "Nelligudde Kere 2.jpeg" },
    { name: "Pondicherry", file: "Pondicherry Ride.jpeg" },
    { name: "Kailasagiri", file: "Sai Premia Ride.jpeg" },
    { name: "Samse", file: "Samse.jpeg" },
    { name: "Vathalmalai", file: "Vathalmalai.jpeg" },
    { name: "WMD 2025", file: "WMD 2025.jpeg" },
    { name: "Kothur Lake", file: "kothur lake .jpeg" },
    { name: "Ayyur Forest", file: "Ayyur Forest.jpeg" },
    { name: "Mallapa Hills", file: "Mallapa Hills .jpeg" }
];

const renderVisitedPlaces = () => {
    if (!visitedPlacesGrid) return;
    visitedPlacesGrid.innerHTML = '';
    
    visitedPlaces.forEach(place => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'bg-white/5 rounded-xl overflow-hidden border border-white/10 shadow-lg group';
        
        const imgPath = encodeURI(`./Visited Place/${place.file}`);
        
        itemDiv.innerHTML = `
            <div class="h-48 overflow-hidden">
                <img src="${imgPath}" alt="${place.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
            </div>
            <div class="p-4 text-center">
                <h3 class="font-header text-white text-2xl tracking-wide">${place.name}</h3>
            </div>
        `;
        visitedPlacesGrid.appendChild(itemDiv);
    });
};

if (ridesCompletedBox && visitedPlacesModal) {
    ridesCompletedBox.addEventListener('click', () => {
        renderVisitedPlaces();
        visitedPlacesModal.classList.remove('hidden');
        visitedPlacesModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    });
}

if (visitedPlacesClose && visitedPlacesModal) {
    visitedPlacesClose.addEventListener('click', () => {
        visitedPlacesModal.classList.add('hidden');
        visitedPlacesModal.classList.remove('flex');
        document.body.style.overflow = '';
    });
}

if (visitedPlacesModal) {
    visitedPlacesModal.addEventListener('click', (e) => {
        if (e.target === visitedPlacesModal) {
            visitedPlacesModal.classList.add('hidden');
            visitedPlacesModal.classList.remove('flex');
            document.body.style.overflow = '';
        }
    });
}

