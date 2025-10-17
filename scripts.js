// ============================================
// CONFIGURATION & CONSTANTS
// ============================================

/**
 * Particle System Configuration
 * Contains all icon types used in the animated background particles
 */
const particlesConfig = {
    // Social Media Icons
    socialIcons: [
        'fab fa-whatsapp',
        'fab fa-facebook-f',
        'fab fa-instagram',
        'fab fa-twitter',
        'fab fa-linkedin-in',
        'fab fa-youtube',
        'fab fa-telegram-plane',
        'fab fa-tiktok',
        'fab fa-snapchat-ghost',
        'fab fa-discord'
    ],
    // Business/Tech Icons
    techIcons: [
        'fab fa-google',
        'fas fa-file-excel',
        'fas fa-file-word',
        'fas fa-file-powerpoint',
        'fas fa-chart-line',
        'fas fa-database',
        'fas fa-cloud',
        'fas fa-code',
        'fas fa-shopping-cart',
        'fas fa-comments'
    ],
    // Communication Icons
    commIcons: [
        'fas fa-envelope',
        'fas fa-phone',
        'fas fa-video',
        'fas fa-message',
        'fas fa-bell',
        'fas fa-at',
        'fas fa-hashtag',
        'fas fa-share-alt',
        'fas fa-paper-plane',
        'fas fa-comment-dots'
    ],
    // E-commerce Icons
    ecomIcons: [
        'fas fa-shopping-bag',
        'fas fa-credit-card',
        'fas fa-tag',
        'fas fa-percent',
        'fas fa-truck',
        'fas fa-box',
        'fas fa-store',
        'fas fa-barcode',
        'fas fa-receipt',
        'fas fa-coins'
    ]
};

// Combine all icons into a single array
const allIcons = [
    ...particlesConfig.socialIcons,
    ...particlesConfig.techIcons,
    ...particlesConfig.commIcons,
    ...particlesConfig.ecomIcons
];

// ============================================
// PARTICLE SYSTEM FUNCTIONS
// ============================================

/**
 * Creates enhanced animated particles in the background
 * Generates particles with random icons, positions, and animations
 */
function createEnhancedParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    particlesContainer.innerHTML = ''; // Clear existing particles

    // Determine particle count based on screen size
    const particleCount = window.innerWidth < 768 ? 15 : 25;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Set random starting position
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';

        // Set random animation timing without delay
        const duration = 15 + Math.random() * 10;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = '0s';

        // Create and add icon element
        const icon = document.createElement('i');
        icon.className = `particle-icon ${getRandomIcon()}`;
        particle.appendChild(icon);

        // Apply random gradient color to all particles
        const gradientColors = ['color-pink', 'color-purple', 'color-violet', 'color-magenta', 'color-fuchsia'];
        particle.classList.add(gradientColors[Math.floor(Math.random() * gradientColors.length)]);

        // Apply glow effect (20% chance)
        if (Math.random() > 0.8) {
            particle.classList.add('glow');
        }

        particlesContainer.appendChild(particle);

        // Initialize icon rotation immediately
        startIconRotation(particle, icon);
    }
}

/**
 * Selects a random icon from the available icon pool
 * @returns {string} - Random icon class name
 */
function getRandomIcon() {
    return allIcons[Math.floor(Math.random() * allIcons.length)];
}

/**
 * Handles icon rotation/switching for individual particles
 * @param {HTMLElement} particle - The particle element
 * @param {HTMLElement} iconElement - The icon element within the particle
 */
function startIconRotation(particle, iconElement) {
    const changeIcon = () => {
        const currentIcon = iconElement.className.replace('particle-icon ', '');
        let newIcon = getRandomIcon();

        // Ensure we get a different icon
        while (newIcon === currentIcon) {
            newIcon = getRandomIcon();
        }

        // Add transition effect
        particle.classList.add('transitioning');

        // Change icon after transition
        setTimeout(() => {
            iconElement.className = `particle-icon ${newIcon}`;
            particle.classList.remove('transitioning');
        }, 400);
    };

    // Schedule initial icon change
    setTimeout(changeIcon, Math.random() * 3000);

    // Set up recurring icon changes
    setInterval(changeIcon, 3000 + Math.random() * 3000);
}

// ============================================
// PARTICLE SYSTEM INITIALIZATION
// ============================================

// Initialize particles on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createEnhancedParticles);
} else {
    createEnhancedParticles();
}

// Handle window resize with debouncing
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createEnhancedParticles();
    }, 500);
});

// Accessibility: Reduce particles for users who prefer reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        if (index > 5) particle.remove();
    });
}

// ============================================
// HEADER SCROLL EFFECTS
// ============================================

/**
 * Adds/removes 'scrolled' class to header based on scroll position
 * Creates a sticky header effect with different styling when scrolled
 */
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// ANIMATED COUNTERS & STATISTICS
// ============================================

/**
 * Animates the conversion rate percentage counter
 * Counts up from 0 to target value
 */
let conversionRate = 0;
const conversionTarget = 37;
const conversionEl = document.getElementById('conversionRate');
if (conversionEl) {
    const animateConversion = () => {
        if (conversionRate < conversionTarget) {
            conversionRate++;
            conversionEl.textContent = conversionRate + '%';
            requestAnimationFrame(animateConversion);
        }
    };
    // Start conversion animation after 1 second
    setTimeout(animateConversion, 1000);
}

/**
 * Animates count-up effect for statistics
 * @param {HTMLElement} el - Element with data-count attribute
 */
const countElements = document.querySelectorAll('[data-count]');
const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count'));
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 20);
};

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

/**
 * Triggers animations when elements come into viewport
 * Used for count-up animations and other scroll-triggered effects
 */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.hasAttribute('data-count')) {
                animateCount(entry.target);
                observer.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

// Observe all elements with count animations
countElements.forEach(el => observer.observe(el));

// ============================================
// LANGUAGE TOGGLE FUNCTIONALITY
// ============================================

/**
 * Handles language switching between English and Arabic
 * Updates text direction, stores preference, and shows/hides language-specific content
 */
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('octobot_lang') || 'en';

/**
 * Applies language settings to the page
 * @param {string} lang - Language code ('en' or 'ar')
 */
const applyLanguage = (lang) => {
    // Set text direction and language
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('octobot_lang', lang);

    // Toggle visibility of language-specific form inputs
    document.querySelectorAll('.form-input').forEach(input => {
        if (input.classList.contains(lang)) {
            input.style.display = 'block';
        } else {
            input.style.display = 'none';
        }
    });
};

// Apply saved language preference
applyLanguage(currentLang);

// Handle language toggle button click
if (langToggle) {
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        applyLanguage(currentLang);
    });
}

// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;

// Get saved theme or default to light
let currentTheme = localStorage.getItem('octobot_theme') || 'light';

/**
 * Applies theme to the page
 * @param {string} theme - Theme name ('light' or 'dark')
 */
const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('octobot_theme', theme);
    
    // Update icon
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Update particles opacity
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.opacity = theme === 'dark' ? '0.6' : '0.3';
    });
    
    // Trigger event for other components that might need to update
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
};

// Apply saved theme on load
applyTheme(currentTheme);

// Handle theme toggle
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
    });
}

// Watch for system theme changes
if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Only apply system theme if user hasn't manually selected one
    if (!localStorage.getItem('octobot_theme')) {
        applyTheme(mediaQuery.matches ? 'dark' : 'light');
    }
    
    // Listen for changes
    mediaQuery.addEventListener('change', (e) => {
        // Only change if user hasn't manually selected a theme
        if (!localStorage.getItem('octobot_theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}




// ============================================
// ENHANCED SMOOTH PORTFOLIO CAROUSEL - UNIVERSAL
// ============================================

function initPortfolioCarousel() {
    const track = document.getElementById('portfolioTrack');
    const dots = document.querySelectorAll('.portfolio-dots .dot');
    const portfolioWrapper = document.querySelector('.portfolio-wrapper');

    if (!track || !portfolioWrapper) return;

    // State variables
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let currentPosition = 0;
    let autoScrollRAF = null;
    let isHovering = false;
    let velocity = 0;
    let rafId = null;
    let lastX = 0;
    let lastTime = Date.now();

    // Configuration
    const autoScrollSpeed = 0.5;
    const friction = 0.92;
    const snapThreshold = 0.1;

    // Calculate boundaries
    const getScrollBounds = () => {
        const trackWidth = track.scrollWidth;
        const containerWidth = portfolioWrapper.clientWidth;
        const maxScroll = Math.max(0, trackWidth - containerWidth);
        return { min: 0, max: maxScroll };
    };

    // Apply position with boundaries
    const setPosition = (position) => {
        const { min, max } = getScrollBounds();

        // Clamp position within bounds
        currentPosition = Math.max(-max, Math.min(0, position));

        // Always use the same transform regardless of direction
        track.style.transform = `translateX(${currentPosition}px)`;

        updateDots();
    };

    // Update dots based on scroll position
    const updateDots = () => {
        if (dots.length === 0) return;

        const { max } = getScrollBounds();
        if (max === 0) return;

        // Calculate scroll percentage (0 to 1)
        const scrollPercentage = Math.abs(currentPosition) / max;

        // Calculate active dot index
        const activeIndex = Math.round(scrollPercentage * (dots.length - 1));

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    };

    // Smooth momentum scrolling
    const momentumScroll = () => {
        if (!isDragging && Math.abs(velocity) > snapThreshold) {
            velocity *= friction;
            setPosition(currentPosition + velocity);
            rafId = requestAnimationFrame(momentumScroll);
        } else {
            velocity = 0;
        }
    };

    // Auto-scroll animation
    const autoScroll = () => {
        if (!isHovering && !isDragging) {
            const { min, max } = getScrollBounds();

            // Always scroll in the same direction (left)
            currentPosition -= autoScrollSpeed;

            // Loop back to start when reaching the end
            if (Math.abs(currentPosition) >= max) {
                currentPosition = 0;
            }

            setPosition(currentPosition);
        }

        autoScrollRAF = requestAnimationFrame(autoScroll);
    };

    // Start auto-scrolling
    const startAutoScroll = () => {
        if (!autoScrollRAF) {
            autoScrollRAF = requestAnimationFrame(autoScroll);
        }
    };

    // Stop auto-scrolling
    const stopAutoScroll = () => {
        if (autoScrollRAF) {
            cancelAnimationFrame(autoScrollRAF);
            autoScrollRAF = null;
        }
    };

    // Get X position from event
    const getXPosition = (e) => {
        return e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    };

    // Handle drag start
    const handleDragStart = (e) => {
        isDragging = true;
        startX = getXPosition(e);
        scrollLeft = currentPosition;
        lastX = startX;
        lastTime = Date.now();
        velocity = 0;

        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        stopAutoScroll();

        portfolioWrapper.style.cursor = 'grabbing';
        portfolioWrapper.classList.add('dragging');
        e.preventDefault();
    };

    // Handle drag move
    const handleDragMove = (e) => {
        if (!isDragging) return;

        e.preventDefault();
        const x = getXPosition(e);
        const now = Date.now();
        const dt = now - lastTime;

        // Calculate distance moved
        const dx = x - startX;

        // Apply position
        const newPosition = scrollLeft + dx;
        setPosition(newPosition);

        // Calculate velocity for momentum
        if (dt > 0) {
            velocity = (x - lastX) / dt * 16;
        }

        lastX = x;
        lastTime = now;
    };

    // Handle drag end
    const handleDragEnd = () => {
        if (!isDragging) return;

        isDragging = false;
        portfolioWrapper.style.cursor = 'grab';
        portfolioWrapper.classList.remove('dragging');

        // Apply momentum scrolling
        if (Math.abs(velocity) > snapThreshold) {
            rafId = requestAnimationFrame(momentumScroll);
        }

        // Resume auto-scroll after a delay
        setTimeout(() => {
            if (!isHovering && !isDragging) {
                startAutoScroll();
            }
        }, 2000);
    };

    // Mouse events
    track.addEventListener('mousedown', handleDragStart);
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);

    // Touch events
    track.addEventListener('touchstart', handleDragStart, { passive: false });
    track.addEventListener('touchmove', handleDragMove, { passive: false });
    track.addEventListener('touchend', handleDragEnd);
    track.addEventListener('touchcancel', handleDragEnd);

    // Hover control for auto-scroll
    portfolioWrapper.addEventListener('mouseenter', () => {
        isHovering = true;
        stopAutoScroll();
        portfolioWrapper.style.cursor = 'grab';
    });

    portfolioWrapper.addEventListener('mouseleave', () => {
        isHovering = false;
        if (!isDragging) {
            startAutoScroll();
            portfolioWrapper.style.cursor = 'default';
        }
        if (isDragging) {
            handleDragEnd();
        }
    });

    // Dot navigation - smooth scroll to position
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoScroll();

            const { max } = getScrollBounds();
            const targetPosition = -(max * (index / (dots.length - 1)));

            // Animate to target position
            const animateToPosition = () => {
                const distance = targetPosition - currentPosition;
                const step = distance * 0.1;

                if (Math.abs(distance) > 0.5) {
                    setPosition(currentPosition + step);
                    requestAnimationFrame(animateToPosition);
                } else {
                    setPosition(targetPosition);
                    setTimeout(() => {
                        if (!isHovering) {
                            startAutoScroll();
                        }
                    }, 2000);
                }
            };

            animateToPosition();
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!e.target.closest('.portfolio-wrapper')) return;

        const scrollAmount = 50;
        let newPosition = currentPosition;

        if (e.key === 'ArrowLeft') {
            newPosition = currentPosition + scrollAmount;
        } else if (e.key === 'ArrowRight') {
            newPosition = currentPosition - scrollAmount;
        } else {
            return;
        }

        stopAutoScroll();
        setPosition(newPosition);

        setTimeout(() => {
            if (!isHovering) {
                startAutoScroll();
            }
        }, 2000);
    });

    // Mouse wheel support
    portfolioWrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        stopAutoScroll();

        const scrollAmount = e.deltaY * 0.5;
        const newPosition = currentPosition - scrollAmount;
        setPosition(newPosition);

        clearTimeout(portfolioWrapper.wheelTimeout);
        portfolioWrapper.wheelTimeout = setTimeout(() => {
            if (!isHovering && !isDragging) {
                startAutoScroll();
            }
        }, 1000);
    }, { passive: false });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Ensure position is within bounds after resize
            setPosition(currentPosition);
        }, 250);
    });

    // Initialize
    portfolioWrapper.style.cursor = 'grab';
    setPosition(0);
    updateDots();

    // Start auto-scrolling after a short delay
    setTimeout(() => {
        startAutoScroll();
    }, 1500);

    // Return cleanup function
    return () => {
        stopAutoScroll();
        if (rafId) cancelAnimationFrame(rafId);
    };
}

// Initialize carousel
let carouselCleanup = null;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        carouselCleanup = initPortfolioCarousel();
    });
} else {
    carouselCleanup = initPortfolioCarousel();
}

// Reinitialize on language change if needed
document.addEventListener('languageChanged', () => {
    if (carouselCleanup) {
        carouselCleanup();
    }
    carouselCleanup = initPortfolioCarousel();
});
// ============================================
// PORTFOLIO MODAL FUNCTIONALITY - FIXED
// ============================================

function initPortfolioModal() {
    const portfolioModal = document.getElementById('portfolioModal');
    const modalContent = document.getElementById('portfolioModalContent');
    const modalBackdrop = portfolioModal?.querySelector('.modal-backdrop');
    const modalClose = portfolioModal?.querySelector('.modal-close');

    if (!portfolioModal) {
        console.error('Portfolio modal not found in DOM');
        return;
    }

    // Portfolio detail content
    const portfolioDetails = {
        'legendswear': {
            title: 'LegendsWear Success Story',
            titleAr: 'قصة نجاح LegendsWear',
            content: `
                <div class="portfolio-detail">
                    <h3><span class="en">The Challenge</span><span class="ar">التحدي</span></h3>
                    <p><span class="en">LegendsWear needed to handle hundreds of daily inquiries while maintaining personalized service.</span><span class="ar">احتاجت LegendsWear للتعامل مع مئات الاستفسارات اليومية مع الحفاظ على الخدمة الشخصية.</span></p>
                    
                    <h3><span class="en">Our Solution</span><span class="ar">حلنا</span></h3>
                    <p><span class="en">We implemented an AI assistant that understands fashion preferences and guides customers to perfect purchases.</span><span class="ar">قمنا بتطبيق مساعد ذكي يفهم تفضيلات الموضة ويوجه العملاء للشراء المثالي.</span></p>
                    
                    <h3><span class="en">Results</span><span class="ar">النتائج</span></h3>
                    <ul>
                        <li><span class="en">45% increase in sales</span><span class="ar">زيادة 45% في المبيعات</span></li>
                        <li><span class="en">2-second average response time</span><span class="ar">متوسط وقت الاستجابة 2 ثانية</span></li>
                        <li><span class="en">24/7 customer support</span><span class="ar">دعم العملاء على مدار الساعة</span></li>
                    </ul>
                </div>
            `
        },
        'hiralearning': {
            title: 'Hira Learning Success Story',
            titleAr: 'قصة نجاح Hira Learning',
            content: `
                <div class="portfolio-detail">
                    <h3><span class="en">The Challenge</span><span class="ar">التحدي</span></h3>
                    <p><span class="en">Hira Learning needed to provide instant support to thousands of students.</span><span class="ar">احتاجت Hira Learning لتقديم دعم فوري لآلاف الطلاب.</span></p>
                    
                    <h3><span class="en">Results</span><span class="ar">النتائج</span></h3>
                    <ul>
                        <li><span class="en">44% increase in enrollments</span><span class="ar">زيادة 44% في التسجيلات</span></li>
                        <li><span class="en">92% student satisfaction</span><span class="ar">92% رضا الطلاب</span></li>
                    </ul>
                </div>
            `
        },
        'egyptgamers': {
            title: 'Egypt Gamers Success Story',
            titleAr: 'قصة نجاح Egypt Gamers',
            content: `
                <div class="portfolio-detail">
                    <h3><span class="en">Results</span><span class="ar">النتائج</span></h3>
                    <ul>
                        <li><span class="en">31% revenue growth</span><span class="ar">نمو الإيرادات 31%</span></li>
                        <li><span class="en">24/7 gaming support</span><span class="ar">دعم الألعاب على مدار الساعة</span></li>
                    </ul>
                </div>
            `
        },
        'beautycorner': {
            title: 'Beauty Corner Success Story',
            titleAr: 'قصة نجاح Beauty Corner',
            content: `
                <div class="portfolio-detail">
                    <h3><span class="en">Results</span><span class="ar">النتائج</span></h3>
                    <ul>
                        <li><span class="en">67% increase in conversion</span><span class="ar">زيادة 67% في التحويل</span></li>
                        <li><span class="en">5k+ consultations delivered</span><span class="ar">أكثر من 5000 استشارة</span></li>
                    </ul>
                </div>
            `
        },
        'techhub': {
            title: 'Tech Hub Success Story',
            titleAr: 'قصة نجاح Tech Hub',
            content: `
                <div class="portfolio-detail">
                    <h3><span class="en">Results</span><span class="ar">النتائج</span></h3>
                    <ul>
                        <li><span class="en">85% reduction in response time</span><span class="ar">تقليل 85% في وقت الاستجابة</span></li>
                        <li><span class="en">10k+ issues resolved</span><span class="ar">حل أكثر من 10 آلاف مشكلة</span></li>
                    </ul>
                </div>
            `
        },
        'fitnessclub': {
            title: 'Fitness Club Success Story',
            titleAr: 'قصة نجاح Fitness Club',
            content: `
                <div class="portfolio-detail">
                    <h3><span class="en">Results</span><span class="ar">النتائج</span></h3>
                    <ul>
                        <li><span class="en">52% increase in retention</span><span class="ar">زيادة 52% في الاحتفاظ</span></li>
                        <li><span class="en">3k+ active members</span><span class="ar">أكثر من 3000 عضو نشط</span></li>
                    </ul>
                </div>
            `
        },
        // Default for any missing case studies
        'default': {
            title: 'Success Story',
            titleAr: 'قصة نجاح',
            content: `
                <div class="portfolio-detail">
                    <p><span class="en">Case study details coming soon...</span><span class="ar">تفاصيل دراسة الحالة قريباً...</span></p>
                </div>
            `
        }
    };

    // Use event delegation for dynamically added buttons
    document.addEventListener('click', function (e) {
        // Check if clicked element is a details button or its child
        const detailsBtn = e.target.closest('.details-btn');

        if (detailsBtn) {
            e.preventDefault();
            e.stopPropagation();

            const clientKey = detailsBtn.dataset.client;
            console.log('Opening modal for client:', clientKey);

            const details = portfolioDetails[clientKey] || portfolioDetails['default'];

            if (modalContent) {
                modalContent.innerHTML = `
                    <h2 class="gradient-text">
                        <span class="en">${details.title}</span>
                        <span class="ar">${details.titleAr}</span>
                    </h2>
                    ${details.content}
                `;
            }

            // Show modal
            portfolioModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    // Close modal handlers
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            portfolioModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', () => {
            portfolioModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && portfolioModal?.classList.contains('active')) {
            portfolioModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Call the initialization function when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolioModal);
} else {
    initPortfolioModal();
}
// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================

/**
 * Mobile menu toggle and overlay handling
 * Controls the slide-in mobile navigation menu
 */
const menuToggle = document.querySelector('.menu-toggle');

// Only set up mobile menu if elements exist
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        // Since there's no mobile menu in the HTML, just toggle nav visibility
        const nav = document.querySelector('.nav-list');
        if (nav) {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        }
    });
}

// ============================================
// CHAT DEMO FUNCTIONALITY
// ============================================

/**
 * Automated chat demonstration
 * Shows example conversations to demonstrate chatbot capabilities
 */
const chatDemo = document.querySelector('.chat-demo');
if (chatDemo) {
    const demoMessages = [
        { type: 'user', text: { en: 'What are your working hours?', ar: 'ما هي ساعات العمل؟' } },
        { type: 'bot', text: { en: "I'm available 24/7! How can I help you today?", ar: 'أنا متاح 24/7! كيف يمكنني مساعدتك اليوم؟' } },
        { type: 'user', text: { en: 'Can I track my order?', ar: 'هل يمكنني تتبع طلبي؟' } },
        { type: 'bot', text: { en: 'Of course! Please provide your order number.', ar: 'بالطبع! يرجى تقديم رقم الطلب.' } }
    ];

    let messageIndex = 2; // Start after initial messages

    /**
     * Creates a chat message element
     * @param {Object} message - Message object with type and text
     * @returns {HTMLElement} - Chat message element
     */
    function createChatMessage(message) {
        const div = document.createElement('div');
        div.className = 'chat-message';
        const avatarContent = message.type === 'user'
            ? '👤'
            : '<img src="https://octobot.sirv.com/robot1.png" alt="OctoBot" class="avatar-img" />';
        const avatarClass = message.type === 'bot' ? 'chat-avatar bot-avatar' : 'chat-avatar';

        div.innerHTML = `
            <div class="${avatarClass}">${avatarContent}</div>
            <div class="chat-bubble ${message.type === 'bot' ? 'bot' : ''}">
                <span class="en">${message.text.en}</span>
                <span class="ar">${message.text.ar}</span>
            </div>
        `;
        return div;
    }

    /**
     * Creates typing indicator element for bot messages
     * @returns {HTMLElement} - Typing indicator element
     */
    function createTypingIndicator() {
        const div = document.createElement('div');
        div.className = 'chat-message';
        div.innerHTML = `
            <div class="chat-avatar bot-avatar">
                <img src="https://octobot.sirv.com/robot1.png" alt="OctoBot" class="avatar-img" />
            </div>
            <div class="chat-bubble bot typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        return div;
    }

    // Auto-play chat messages
    setInterval(() => {
        if (messageIndex < demoMessages.length) {
            const message = demoMessages[messageIndex];
            const messageEl = createChatMessage(message);

            // Add typing indicator for bot messages
            if (message.type === 'bot') {
                const typingEl = createTypingIndicator();
                chatDemo.insertBefore(typingEl, chatDemo.querySelector('.stats-preview'));

                setTimeout(() => {
                    typingEl.remove();
                    chatDemo.insertBefore(messageEl, chatDemo.querySelector('.stats-preview'));
                }, 1500);
            } else {
                chatDemo.insertBefore(messageEl, chatDemo.querySelector('.stats-preview'));
            }

            messageIndex++;
        } else {
            // Reset demo when finished
            const messages = chatDemo.querySelectorAll('.chat-message');
            messages.forEach((msg, index) => {
                if (index > 1) msg.remove();
            });
            messageIndex = 2;
        }
    }, 4000);
}

// ============================================
// SMOOTH SCROLLING
// ============================================

/**
 * Implements smooth scrolling for anchor links
 * Accounts for fixed header height
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = 80;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================

/**
 * Implements lazy loading for images using Intersection Observer
 * Images load only when they come into viewport
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

/**
 * Reduces animation duration for users who prefer reduced motion
 * Improves accessibility and performance on low-end devices
 */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01s');
}

// ============================================
// MODERN PRICING FUNCTIONALITY
// ============================================

/**
 * Initialize pricing functionality after DOM is loaded
 */
function initPricingSystem() {
    // Get elements
    const pricingTabs = document.querySelectorAll('.tab-btn');
    const durationPills = document.querySelectorAll('.duration-pill');

    // Handle service tab switching (Facebook/WhatsApp)
    if (pricingTabs.length > 0) {
        pricingTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const service = this.dataset.service;

                // Update active tab
                pricingTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');

                // Hide all pricing contents
                document.querySelectorAll('.pricing-content').forEach(content => {
                    content.classList.remove('active');
                });

                // Show selected content
                const targetContent = document.getElementById(`${service}-plans`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }

    // Handle duration switching
    if (durationPills.length > 0) {
        durationPills.forEach(pill => {
            pill.addEventListener('click', function () {
                const duration = this.dataset.duration;

                // Update active pill
                durationPills.forEach(p => p.classList.remove('active'));
                this.classList.add('active');

                // Update all prices
                updatePrices(duration);
            });
        });
    }

    // Initialize with default duration
    updatePrices('1month');
}

/**
 * Updates displayed prices based on selected duration with discounts
 * @param {string} duration - Selected duration key
 */
function updatePrices(duration) {
    const priceElements = document.querySelectorAll('.price-amount');

    priceElements.forEach(priceEl => {
        // Get base monthly price from the amount element
        const amountEl = priceEl.querySelector('.amount');
        if (!amountEl) return;

        // Extract base price (remove commas)
        let basePrice = parseInt(amountEl.textContent.replace(/,/g, ''));

        // Store original monthly price if not already stored
        if (!priceEl.dataset.monthlyPrice) {
            priceEl.dataset.monthlyPrice = basePrice;
        } else {
            basePrice = parseInt(priceEl.dataset.monthlyPrice);
        }

        // Calculate price based on duration
        let finalPrice = basePrice;
        let periodText = '/شهر';

        switch (duration) {
            case '1month':
                finalPrice = basePrice;
                periodText = '/شهر';
                break;
            case '3months':
                finalPrice = basePrice * 3;
                periodText = '/3 أشهر';
                break;
            case '6months':
                // 10% discount
                finalPrice = Math.round(basePrice * 6 * 0.9);
                periodText = '/6 أشهر';
                break;
            case '1year':
                // 10% discount
                finalPrice = Math.round(basePrice * 12 * 0.9);
                periodText = '/سنة';
                break;
        }

        // Update price display
        amountEl.textContent = finalPrice.toLocaleString('en-US');

        // Update period text
        const periodAr = priceEl.querySelector('.period.ar');
        if (periodAr) {
            periodAr.textContent = periodText;
        }

        // Add visual feedback for discounted prices
        if (duration === '6months' || duration === '1year') {
            priceEl.classList.add('discounted');
        } else {
            priceEl.classList.remove('discounted');
        }
    });
}

/**
 * Formats price with thousand separators
 * @param {string|number} price - Price value
 * @returns {string} - Formatted price
 */
function formatPrice(price) {
    return parseInt(price).toLocaleString('en-US');
}

// Initialize pricing when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPricingSystem);
} else {
    initPricingSystem();
}

// ============================================
// PRICING PLAN MODALS
// ============================================

// Plan details data
const planDetails = {
    // Facebook Plans
    'facebook-sales': {
        icon: 'fab fa-facebook-messenger',
        titleEn: 'Smart Sales Messenger',
        titleAr: 'ماسنجر مبيعات ذكي',
        features: [
            {
                icon: 'fas fa-robot',
                titleEn: 'AI-Powered Conversations',
                titleAr: 'محادثات بالذكاء الاصطناعي',
                descEn: 'Advanced AI understands product details and customer needs to provide instant, accurate responses',
                descAr: 'ذكاء اصطناعي متقدم يفهم تفاصيل المنتج واحتياجات العميل لتقديم ردود فورية ودقيقة'
            },
            {
                icon: 'fas fa-chart-line',
                titleEn: 'Automatic Deal Closing',
                titleAr: 'إقفال الصفقات التلقائي',
                descEn: 'Smart algorithms guide customers through the sales funnel to complete purchases',
                descAr: 'خوارزميات ذكية توجه العملاء عبر مسار المبيعات لإتمام عمليات الشراء'
            },
            {
                icon: 'fas fa-bell',
                titleEn: 'Real-Time Admin Alerts',
                titleAr: 'تنبيهات فورية للإدارة',
                descEn: 'Instant WhatsApp notifications to admin for every lead and sale',
                descAr: 'إشعارات واتساب فورية للإدارة مع كل عميل محتمل وعملية بيع'
            },
            {
                icon: 'fas fa-clock',
                titleEn: '24/7 Availability',
                titleAr: 'متاح على مدار الساعة',
                descEn: 'Never miss a customer inquiry, even outside business hours',
                descAr: 'لا تفوت أي استفسار من العملاء، حتى خارج ساعات العمل'
            }
        ]
    },

    'facebook-comments': {
        icon: 'fas fa-comments',
        titleEn: 'Smart Comment Management',
        titleAr: 'إدارة التعليقات الذكية',
        features: [
            {
                icon: 'fas fa-reply-all',
                titleEn: 'Automated Responses',
                titleAr: 'ردود تلقائية',
                descEn: 'Intelligent auto-reply to comments based on content and context',
                descAr: 'رد تلقائي ذكي على التعليقات بناءً على المحتوى والسياق'
            },
            {
                icon: 'fas fa-eye-slash',
                titleEn: 'Negative Comment Control',
                titleAr: 'التحكم في التعليقات السلبية',
                descEn: 'Hide negative comments from public view while keeping them visible to the commenter',
                descAr: 'إخفاء التعليقات السلبية عن العامة مع إبقائها مرئية لصاحب التعليق'
            },
            {
                icon: 'fas fa-filter',
                titleEn: 'Smart Filtering',
                titleAr: 'تصفية ذكية',
                descEn: 'Automatically categorize and prioritize comments for better management',
                descAr: 'تصنيف وترتيب التعليقات تلقائيًا لإدارة أفضل'
            }
        ]
    },

    'facebook-analysis': {
        icon: 'fas fa-chart-line',
        titleEn: 'Customer Analysis & Retargeting',
        titleAr: 'تحليل عملاء وإعادة استهداف',
        features: [
            {
                icon: 'fas fa-user-chart',
                titleEn: 'Comprehensive Customer Analysis',
                titleAr: 'تحليل شامل للعملاء',
                descEn: 'Deep analysis of all customer interactions to understand interests and behavior',
                descAr: 'تحليل عميق لجميع تفاعلات العملاء لفهم الاهتمامات والسلوك'
            },
            {
                icon: 'fas fa-bullseye',
                titleEn: 'Smart Retargeting',
                titleAr: 'إعادة استهداف ذكية',
                descEn: 'Personalized follow-up messages based on individual customer analysis',
                descAr: 'رسائل متابعة مخصصة بناءً على تحليل كل عميل على حدة'
            },
            {
                icon: 'fas fa-magic',
                titleEn: 'Dynamic Messaging',
                titleAr: 'رسائل ديناميكية',
                descEn: 'Each message is uniquely crafted, not templated, focusing on customer goals',
                descAr: 'كل رسالة مصممة بشكل فريد، وليست قوالب جاهزة، مع التركيز على أهداف العميل'
            },
            {
                icon: 'fas fa-percentage',
                titleEn: 'Increased Conversion',
                titleAr: 'زيادة معدل التحويل',
                descEn: 'Up to 40% increase in sales through intelligent retargeting',
                descAr: 'زيادة المبيعات تصل إلى 40% من خلال إعادة الاستهداف الذكي'
            }
        ]
    },

    // WhatsApp Plans
    'whatsapp-sales': {
        icon: 'fab fa-whatsapp',
        titleEn: 'Smart WhatsApp Sales Agent',
        titleAr: 'موظف مبيعات واتساب ذكي',
        features: [
            {
                icon: 'fas fa-brain',
                titleEn: 'Product Intelligence',
                titleAr: 'ذكاء المنتج',
                descEn: 'Complete understanding of your products or services for accurate responses',
                descAr: 'فهم كامل لمنتجاتك أو خدماتك لتقديم ردود دقيقة'
            },
            {
                icon: 'fas fa-handshake',
                titleEn: 'Deal Closing Expertise',
                titleAr: 'خبرة في إقفال الصفقات',
                descEn: 'Professionally guides conversations to successful sales conclusions',
                descAr: 'يوجه المحادثات بشكل احترافي لإتمام البيع بنجاح'
            },
            {
                icon: 'fas fa-sync',
                titleEn: 'Admin Integration',
                titleAr: 'تكامل مع الإدارة',
                descEn: 'Seamless communication with management through WhatsApp groups or personal numbers',
                descAr: 'تواصل سلس مع الإدارة عبر مجموعات واتساب أو الأرقام الشخصية'
            }
        ]
    },

    'whatsapp-confirmation': {
        icon: 'fas fa-truck',
        titleEn: 'Pre-Shipping Order Confirmation',
        titleAr: 'تأكيد الأوردرات قبل الشحن',
        features: [
            {
                icon: 'fas fa-phone-alt',
                titleEn: 'Automated Customer Contact',
                titleAr: 'تواصل تلقائي مع العملاء',
                descEn: 'Systematically contacts all customers before shipping to confirm orders',
                descAr: 'يتواصل بشكل منتظم مع جميع العملاء قبل الشحن لتأكيد الطلبات'
            },
            {
                icon: 'fas fa-undo',
                titleEn: 'Return Reduction',
                titleAr: 'تقليل المرتجعات',
                descEn: 'Significantly reduces return rates by confirming orders before dispatch',
                descAr: 'يقلل معدلات المرتجع بشكل كبير من خلال تأكيد الطلبات قبل الإرسال'
            },
            {
                icon: 'fas fa-sync-alt',
                titleEn: 'Real-Time Updates',
                titleAr: 'تحديثات لحظية',
                descEn: 'Instant order status updates - confirmed, cancelled, or modified',
                descAr: 'تحديثات فورية لحالة الطلب - مؤكد، ملغي، أو معدل'
            },
            {
                icon: 'fas fa-save',
                titleEn: 'Cost Savings',
                titleAr: 'توفير التكاليف',
                descEn: 'Save on shipping costs by eliminating unnecessary deliveries',
                descAr: 'توفير في تكاليف الشحن بإلغاء التوصيلات غير الضرورية'
            }
        ]
    },

    'whatsapp-analysis': {
        icon: 'fas fa-chart-bar',
        titleEn: 'WhatsApp Customer Analysis',
        titleAr: 'تحليل عملاء واتساب',
        features: [
            {
                icon: 'fas fa-microscope',
                titleEn: 'Deep Customer Insights',
                titleAr: 'رؤى عميقة للعملاء',
                descEn: 'Analyze all customer chats to understand preferences and behavior',
                descAr: 'تحليل جميع محادثات العملاء لفهم التفضيلات والسلوك'
            },
            {
                icon: 'fas fa-envelope-open-text',
                titleEn: 'Personalized Follow-ups',
                titleAr: 'متابعات مخصصة',
                descEn: 'Custom messages for each customer based on their chat history',
                descAr: 'رسائل مخصصة لكل عميل بناءً على تاريخ محادثاته'
            },
            {
                icon: 'fas fa-chart-line',
                titleEn: 'Performance Tracking',
                titleAr: 'تتبع الأداء',
                descEn: 'Monitor and improve customer engagement strategies',
                descAr: 'مراقبة وتحسين استراتيجيات التفاعل مع العملاء'
            }
        ]
    },

    // Instagram Plans
    'instagram-sales': {
        icon: 'fab fa-instagram',
        titleEn: 'Instagram Sales Assistant',
        titleAr: 'مساعد مبيعات انستجرام',
        features: [
            {
                icon: 'fas fa-camera-retro',
                titleEn: 'Visual Commerce Expert',
                titleAr: 'خبير التجارة البصرية',
                descEn: 'Optimized for Instagram\'s visual-first platform',
                descAr: 'محسّن لمنصة انستجرام البصرية'
            },
            {
                icon: 'fas fa-hashtag',
                titleEn: 'Hashtag Integration',
                titleAr: 'تكامل الهاشتاقات',
                descEn: 'Works seamlessly with Instagram shopping features',
                descAr: 'يعمل بسلاسة مع ميزات التسوق في انستجرام'
            },
            {
                icon: 'fas fa-paper-plane',
                titleEn: 'DM Management',
                titleAr: 'إدارة الرسائل المباشرة',
                descEn: 'Handle Instagram DMs professionally and promptly',
                descAr: 'التعامل مع رسائل انستجرام المباشرة بشكل احترافي وسريع'
            }
        ]
    },

    'instagram-comments': {
        icon: 'fas fa-comments',
        titleEn: 'Instagram Comment Management',
        titleAr: 'إدارة تعليقات انستجرام',
        features: [
            {
                icon: 'fas fa-heart',
                titleEn: 'Engagement Optimization',
                titleAr: 'تحسين التفاعل',
                descEn: 'Increase post engagement through smart comment responses',
                descAr: 'زيادة تفاعل المنشورات من خلال ردود التعليقات الذكية'
            },
            {
                icon: 'fas fa-shield-alt',
                titleEn: 'Brand Protection',
                titleAr: 'حماية العلامة التجارية',
                descEn: 'Protect your brand image by managing negative comments',
                descAr: 'حماية صورة علامتك التجارية بإدارة التعليقات السلبية'
            },
            {
                icon: 'fas fa-tachometer-alt',
                titleEn: 'Quick Response',
                titleAr: 'استجابة سريعة',
                descEn: 'Instant replies to maintain high engagement rates',
                descAr: 'ردود فورية للحفاظ على معدلات تفاعل عالية'
            }
        ]
    },

    // Telegram Plans
    'telegram-sales': {
        icon: 'fab fa-telegram-plane',
        titleEn: 'Telegram Sales Bot',
        titleAr: 'بوت مبيعات تيليجرام',
        features: [
            {
                icon: 'fas fa-lock',
                titleEn: 'Secure Transactions',
                titleAr: 'معاملات آمنة',
                descEn: 'Leverage Telegram\'s security for safe customer interactions',
                descAr: 'الاستفادة من أمان تيليجرام للتفاعلات الآمنة مع العملاء'
            },
            {
                icon: 'fas fa-users',
                titleEn: 'Group Management',
                titleAr: 'إدارة المجموعات',
                descEn: 'Handle both private chats and group interactions',
                descAr: 'التعامل مع المحادثات الخاصة والتفاعلات الجماعية'
            },
            {
                icon: 'fas fa-bolt',
                titleEn: 'Lightning Fast',
                titleAr: 'سرعة فائقة',
                descEn: 'Instant responses using Telegram\'s fast infrastructure',
                descAr: 'ردود فورية باستخدام البنية التحتية السريعة لتيليجرام'
            }
        ]
    },

    'telegram-custom': {
        icon: 'fas fa-tasks',
        titleEn: 'Custom Telegram Solutions',
        titleAr: 'حلول تيليجرام المخصصة',
        features: [
            {
                icon: 'fas fa-cog',
                titleEn: 'Tailored Features',
                titleAr: 'ميزات مخصصة',
                descEn: 'Custom bot features designed for your specific needs',
                descAr: 'ميزات بوت مخصصة مصممة لاحتياجاتك الخاصة'
            },
            {
                icon: 'fas fa-puzzle-piece',
                titleEn: 'Flexible Integration',
                titleAr: 'تكامل مرن',
                descEn: 'Integrate with your existing systems and workflows',
                descAr: 'التكامل مع أنظمتك وسير العمل الحالي'
            },
            {
                icon: 'fas fa-expand-arrows-alt',
                titleEn: 'Scalable Solutions',
                titleAr: 'حلول قابلة للتوسع',
                descEn: 'Grow your bot capabilities as your business expands',
                descAr: 'توسيع قدرات البوت مع نمو أعمالك'
            }
        ]
    },

    // Website Plan
    'website-bot': {
        icon: 'fas fa-globe',
        titleEn: 'Website Assistant Bot',
        titleAr: 'مساعد الموقع الإلكتروني',
        features: [
            {
                icon: 'fas fa-mouse-pointer',
                titleEn: 'Visitor Engagement',
                titleAr: 'تفاعل الزوار',
                descEn: 'Keep visitors engaged and reduce bounce rates',
                descAr: 'الحفاظ على تفاعل الزوار وتقليل معدلات الارتداد'
            },
            {
                icon: 'fas fa-search',
                titleEn: 'Product Navigation',
                titleAr: 'التنقل بين المنتجات',
                descEn: 'Help customers find products quickly without complex browsing',
                descAr: 'مساعدة العملاء في العثور على المنتجات بسرعة دون تصفح معقد'
            },
            {
                icon: 'fas fa-link',
                titleEn: 'Smart Recommendations',
                titleAr: 'توصيات ذكية',
                descEn: 'Send direct product links based on customer preferences',
                descAr: 'إرسال روابط منتجات مباشرة بناءً على تفضيلات العميل'
            },
            {
                icon: 'fas fa-headset',
                titleEn: '24/7 Support',
                titleAr: 'دعم على مدار الساعة',
                descEn: 'Provide round-the-clock customer service on your website',
                descAr: 'توفير خدمة عملاء على مدار الساعة على موقعك'
            }
        ]
    },

    // Custom Plans
    'ad-detection': {
        icon: 'fas fa-ad',
        titleEn: 'Ad Detection & Response',
        titleAr: 'استشعار والرد على الإعلانات',
        features: [
            {
                icon: 'fas fa-radar',
                titleEn: 'Ad Monitoring',
                titleAr: 'مراقبة الإعلانات',
                descEn: 'Automatically detect when your products are mentioned in ads',
                descAr: 'اكتشاف تلقائي عند ذكر منتجاتك في الإعلانات'
            },
            {
                icon: 'fas fa-reply',
                titleEn: 'Instant Response',
                titleAr: 'رد فوري',
                descEn: 'Reply immediately to potential customers on ad posts',
                descAr: 'الرد فورًا على العملاء المحتملين على منشورات الإعلانات'
            },
            {
                icon: 'fas fa-crosshairs',
                titleEn: 'Targeted Interaction',
                titleAr: 'تفاعل مستهدف',
                descEn: 'Focus on ads related to your specific products',
                descAr: 'التركيز على الإعلانات المتعلقة بمنتجاتك المحددة'
            }
        ]
    },

    'voice-image-analysis': {
        icon: 'fas fa-microphone',
        titleEn: 'Voice & Image Analysis',
        titleAr: 'تحليل الصوت والصور',
        features: [
            {
                icon: 'fas fa-microphone-alt',
                titleEn: 'Voice Message Understanding',
                titleAr: 'فهم الرسائل الصوتية',
                descEn: 'Process and respond to voice messages across all platforms',
                descAr: 'معالجة والرد على الرسائل الصوتية عبر جميع المنصات'
            },
            {
                icon: 'fas fa-image',
                titleEn: 'Image Recognition',
                titleAr: 'التعرف على الصور',
                descEn: 'Analyze product images and customer-shared photos',
                descAr: 'تحليل صور المنتجات والصور المشاركة من العملاء'
            },
            {
                icon: 'fas fa-brain',
                titleEn: 'AI-Powered Analysis',
                titleAr: 'تحليل بالذكاء الاصطناعي',
                descEn: 'Advanced AI to understand multimedia content',
                descAr: 'ذكاء اصطناعي متقدم لفهم المحتوى متعدد الوسائط'
            }
        ]
    }
};

// Initialize modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('planModal');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalBackdrop = modal?.querySelector('.modal-backdrop');
    const modalClose = modal?.querySelector('.modal-close');

    if (!modal) return;

    // Handle info button clicks
    document.querySelectorAll('.info-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const planKey = btn.dataset.plan;
            const planData = planDetails[planKey];

            if (planData) {
                // Update modal icon
                modalIcon.innerHTML = `<i class="${planData.icon}"></i>`;

                // Update modal title
                modalTitle.innerHTML = `
                    <span class="en">${planData.titleEn}</span>
                    <span class="ar">${planData.titleAr}</span>
                `;

                // Generate features HTML
                let featuresHTML = '<ul class="modal-features">';
                planData.features.forEach(feature => {
                    featuresHTML += `
                        <li>
                            <i class="${feature.icon}"></i>
                            <div class="feature-content">
                                <h4>
                                    <span class="en">${feature.titleEn}</span>
                                    <span class="ar">${feature.titleAr}</span>
                                </h4>
                                <p>
                                    <span class="en">${feature.descEn}</span>
                                    <span class="ar">${feature.descAr}</span>
                                </p>
                            </div>
                        </li>
                    `;
                });
                featuresHTML += '</ul>';

                modalBody.innerHTML = featuresHTML;

                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal handlers
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
});

// ============================================
// TESTIMONIAL VOICE PLAYER
// ============================================

/**
 * Initialize voice testimonial players
 */
function initVoicePlayers() {
    const playButtons = document.querySelectorAll('.play-btn');

    playButtons.forEach(button => {
        const audioId = button.dataset.audio;
        const audio = document.getElementById(audioId);
        if (!audio) return;

        const voicePlayer = button.closest('.voice-player');
        const progressFill = voicePlayer?.querySelector('.progress-fill');
        const progressTrack = voicePlayer?.querySelector('.progress-track');
        const timeDisplay = voicePlayer?.querySelector('.audio-time');

        // Play/Pause functionality
        button.addEventListener('click', () => {
            const voiceBadge = button.closest('.testimonial-card')?.querySelector('.voice-badge');

            if (audio.paused) {
                // Pause all other audio
                document.querySelectorAll('audio').forEach(a => {
                    if (a !== audio) {
                        a.pause();
                        document.querySelector(`[data-audio="${a.id}"]`)?.classList.remove('playing');
                        // Remove playing class from all voice badges
                        document.querySelectorAll('.voice-badge').forEach(badge => {
                            badge.classList.remove('playing');
                        });
                    }
                });

                audio.play().catch(err => console.log('Audio play error:', err));
                button.classList.add('playing');
                if (voiceBadge) voiceBadge.classList.add('playing');
            } else {
                audio.pause();
                button.classList.remove('playing');
                if (voiceBadge) voiceBadge.classList.remove('playing');
            }
        });

        // Reset when ended
        audio.addEventListener('ended', () => {
            button.classList.remove('playing');
            if (progressFill) progressFill.style.width = '0%';
            if (timeDisplay) timeDisplay.textContent = '0:00';
            const voiceBadge = button.closest('.testimonial-card')?.querySelector('.voice-badge');
            if (voiceBadge) voiceBadge.classList.remove('playing');
        });

        // Update progress
        audio.addEventListener('timeupdate', () => {
            if (progressFill && audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                progressFill.style.width = progress + '%';
            }

            // Update time display
            if (timeDisplay) {
                const minutes = Math.floor(audio.currentTime / 60);
                const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
                timeDisplay.textContent = `${minutes}:${seconds}`;
            }
        });

        // Click on progress bar to seek
        if (progressTrack) {
            progressTrack.addEventListener('click', (e) => {
                const rect = progressTrack.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = clickX / rect.width;
                audio.currentTime = percentage * audio.duration;
            });
        }

        // Set initial duration when metadata loads
        audio.addEventListener('loadedmetadata', () => {
            if (timeDisplay && audio.duration) {
                const minutes = Math.floor(audio.duration / 60);
                const seconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
                timeDisplay.textContent = `${minutes}:${seconds}`;
            }
        });
    });
}

// Initialize voice players when DOM is ready with safety check
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Small delay to ensure DOM is fully ready
        setTimeout(initVoicePlayers, 100);
    });
} else {
    setTimeout(initVoicePlayers, 100);
}

// ============================================
// GLOBAL CTA BUTTON FUNCTIONALITY
// ============================================

/**
 * Handle all primary CTA buttons
 */
document.addEventListener('DOMContentLoaded', () => {
    // Handle all primary buttons that aren't inside forms or specific sections
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (!btn.closest('form') && !btn.closest('.pricing') && !btn.closest('.modal')) {
            btn.addEventListener('click', (e) => {
                // Check if button has specific action
                if (!btn.getAttribute('onclick') && !btn.hasAttribute('data-action')) {
                    e.preventDefault();
                    // Scroll to contact section
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        }
    });
});

// ============================================
// ENTERPRISE TRANSFORM
// ============================================

// Typing Animation Content - Full Industry Transformations
const industryContent = {
    logistics: {
        en: "📦 Imagine never hearing 'Where's my order?' again! Our AI tracks every package in real-time, predicts delivery times with 99% accuracy, and sends proactive WhatsApp updates. 🚚 When customers want to reschedule? Done in seconds! Returns dropping by 73% because we notify customers 1 hour before arrival. 📱 Voice messages for elderly customers? Absolutely! Daily reports, branch load balancing, and instant problem resolution - all automated. Your logistics nightmares? Consider them history! 🎯",
        ar: "📦 تخيل أنك لن تسمع 'فين الأوردر؟' مرة أخرى! ذكاؤنا الاصطناعي يتابع كل طرد لحظياً، يتوقع أوقات التسليم بدقة 99%، ويرسل تحديثات واتساب استباقية. 🚚 العملاء يريدون تأجيل؟ تم في ثواني! المرتجعات انخفضت 73% لأننا نبلغ العملاء قبل الوصول بساعة. 📱 رسائل صوتية لكبار السن؟ بالتأكيد! تقارير يومية، توازن أحمال الفروع، وحل فوري للمشاكل - كله أوتوماتيك. كوابيس اللوجستيات؟ اعتبرها من الماضي! 🎯"
    },
    inventory: {
        en: "🏭 Your inventory just got a genius upgrade! AI monitors stock 24/7, predicts shortages 2 weeks ahead, and auto-orders from suppliers. 📊 No more stockouts during peak seasons! Real-time dashboards show exactly what's moving where. Smart alerts prevent overstock, reduce waste by 67%, and optimize warehouse space. 💡 Integration with ALL your systems means one source of truth. Transform your inventory from a headache to a competitive advantage! 🚀",
        ar: "🏭 مخزونك حصل على ترقية عبقرية! الذكاء الاصطناعي يراقب المخزون 24/7، يتوقع النقص قبل أسبوعين، ويطلب من الموردين تلقائياً. 📊 لا مزيد من نفاد المخزون في المواسم! لوحات معلومات فورية توضح بالضبط ما يتحرك وأين. تنبيهات ذكية تمنع التكدس، تقلل الهدر 67%، وتحسن مساحة المستودع. 💡 التكامل مع كل أنظمتك يعني مصدر واحد للحقيقة. حول مخزونك من صداع لميزة تنافسية! 🚀"
    },
    hospitality: {
        en: "🏨 Welcome to the future of hospitality! Guests book rooms through natural conversations, get instant confirmations, and receive personalized recommendations. 🛎️ Check-in takes 30 seconds via WhatsApp! Room service? Ordered through chat. Complaints? Resolved before they escalate. 🌟 Our AI knows room availability, pricing, special requests - everything! Occupancy rates up 42%, guest satisfaction soaring. Your hotel, now truly smart! ✨",
        ar: "🏨 مرحباً في مستقبل الضيافة! النزلاء يحجزون الغرف عبر محادثات طبيعية، يحصلون على تأكيدات فورية، وتوصيات شخصية. 🛎️ تسجيل الدخول في 30 ثانية عبر واتساب! خدمة الغرف؟ تُطلب عبر الدردشة. الشكاوى؟ تُحل قبل تصاعدها. 🌟 ذكاؤنا الاصطناعي يعرف توفر الغرف، الأسعار، الطلبات الخاصة - كل شيء! معدلات الإشغال زادت 42%، رضا النزلاء يحلق. فندقك، الآن ذكي حقاً! ✨"
    },
    healthcare: {
        en: "🏥 Healthcare that never sleeps! Patients book appointments via chat, receive medication reminders, and get instant answers to health queries. 👨‍⚕️ Lab results? Delivered with explanations. Follow-ups? Automated. Emergency protocols? Triggered instantly. 💊 Reduce no-shows by 81%, improve patient satisfaction, and let doctors focus on healing. Your clinic becomes a beacon of modern healthcare! 🌟",
        ar: "🏥 رعاية صحية لا تنام أبداً! المرضى يحجزون المواعيد عبر الدردشة، يتلقون تذكيرات الأدوية، ويحصلون على إجابات فورية للاستفسارات الصحية. 👨‍⚕️ نتائج المختبر؟ تُسلم مع الشرح. المتابعات؟ أوتوماتيكية. بروتوكولات الطوارئ؟ تُفعل فوراً. 💊 قلل الغياب 81%، حسن رضا المرضى، ودع الأطباء يركزون على الشفاء. عيادتك تصبح منارة للرعاية الصحية الحديثة! 🌟"
    },
    banking: {
        en: "🏦 Banking reimagined! Customers check balances, transfer money, and apply for loans - all through conversation. 💳 Fraud detection? Real-time. Document verification? Instant. Customer queries? Resolved in seconds, not hours. 📈 Reduce operational costs by 68% while improving security and compliance. Your bank becomes the customer's favorite - accessible, fast, and incredibly smart! 💎",
        ar: "🏦 البنوك بشكل جديد! العملاء يتحققون من الأرصدة، يحولون الأموال، ويتقدمون للقروض - كله عبر المحادثة. 💳 كشف الاحتيال؟ فوري. التحقق من المستندات؟ لحظي. استفسارات العملاء؟ تُحل في ثواني، ليس ساعات. 📈 قلل التكاليف التشغيلية 68% مع تحسين الأمن والامتثال. بنكك يصبح المفضل للعملاء - سهل الوصول، سريع، وذكي بشكل لا يصدق! 💎"
    },
    service: {
        en: "🎯 Customer service that reads minds! AI handles 94% of queries instantly, escalates complex issues intelligently, and learns from every interaction. 📞 No more hold times, no more frustrated customers. Multi-language support, sentiment analysis, and proactive problem-solving. 🌟 Your team focuses on high-value tasks while AI handles the routine. Result? 5-star reviews flooding in! 🏆",
        ar: "🎯 خدمة عملاء تقرأ الأفكار! الذكاء الاصطناعي يتعامل مع 94% من الاستفسارات فوراً، يصعّد المشاكل المعقدة بذكاء، ويتعلم من كل تفاعل. 📞 لا مزيد من أوقات الانتظار، لا مزيد من العملاء المحبطين. دعم متعدد اللغات، تحليل المشاعر، وحل استباقي للمشاكل. 🌟 فريقك يركز على المهام عالية القيمة بينما الذكاء الاصطناعي يتولى الروتين. النتيجة؟ تقييمات 5 نجوم تتدفق! 🏆"
    }
};

// Dynamic insights content
const helixInsights = {
    logistics: {
        en: "AI predicts delivery times with 99% accuracy and reduces returns by 73%",
        ar: "الذكاء الاصطناعي يتوقع أوقات التسليم بدقة 99% ويقلل المرتجعات بنسبة 73%"
    },
    inventory: {
        en: "Smart monitoring prevents stockouts and reduces waste by 67%",
        ar: "المراقبة الذكية تمنع نفاد المخزون وتقلل الهدر بنسبة 67%"
    },
    hospitality: {
        en: "30-second check-ins and 42% higher occupancy rates",
        ar: "تسجيل دخول في 30 ثانية ومعدلات إشغال أعلى بنسبة 42%"
    },
    healthcare: {
        en: "Automated appointments reduce no-shows by 81%",
        ar: "المواعيد الآلية تقلل الغياب بنسبة 81%"
    },
    banking: {
        en: "Real-time fraud detection saves 68% in operational costs",
        ar: "كشف الاحتيال الفوري يوفر 68% من التكاليف التشغيلية"
    },
    service: {
        en: "94% of queries resolved instantly with 5-star satisfaction",
        ar: "94% من الاستفسارات تُحل فورياً مع رضا 5 نجوم"
    }
};

// Feature-specific content
const featureContent = {
    logistics: {
        tracking: {
            title: { en: "Real-time Tracking", ar: "تتبع فوري" },
            icon: "fas fa-satellite-dish",
            content: {
                en: "🛰️ Track every package in real-time with GPS precision. Customers receive automatic updates at every stage. Predict delivery times with 99% accuracy using AI algorithms. Live map tracking, estimated arrival times, and instant notifications for any delays.",
                ar: "🛰️ تتبع كل طرد في الوقت الفعلي بدقة GPS. يتلقى العملاء تحديثات تلقائية في كل مرحلة. توقع أوقات التسليم بدقة 99% باستخدام خوارزميات الذكاء الاصطناعي. تتبع الخريطة المباشر، أوقات الوصول المقدرة، وإشعارات فورية لأي تأخير."
            }
        },
        delivery: {
            title: { en: "Smart Delivery", ar: "توصيل ذكي" },
            icon: "fas fa-clock",
            content: {
                en: "⏰ Optimize delivery routes automatically. Send proactive notifications 1 hour before arrival. Handle rescheduling requests instantly through chat. AI learns delivery patterns to suggest optimal time slots for each area.",
                ar: "⏰ تحسين مسارات التوصيل تلقائياً. إرسال إشعارات استباقية قبل الوصول بساعة. معالجة طلبات إعادة الجدولة فوراً عبر الدردشة. الذكاء الاصطناعي يتعلم أنماط التوصيل لاقتراح أفضل الأوقات لكل منطقة."
            }
        },
        returns: {
            title: { en: "Returns Management", ar: "إدارة المرتجعات" },
            icon: "fas fa-undo",
            content: {
                en: "↩️ Reduce returns by 73% with pre-delivery confirmations. Automate return processes with instant pickup scheduling. Track return reasons for business insights. Handle exchanges smoothly without customer frustration.",
                ar: "↩️ تقليل المرتجعات بنسبة 73% مع تأكيدات ما قبل التسليم. أتمتة عمليات الإرجاع مع جدولة الاستلام الفوري. تتبع أسباب الإرجاع للحصول على رؤى تجارية. التعامل مع التبديلات بسلاسة دون إحباط العملاء."
            }
        },
        full: {
            title: { en: "Complete Logistics Transformation", ar: "التحول اللوجستي الكامل" },
            icon: "fas fa-shipping-fast",
            content: industryContent.logistics
        }
    },
    inventory: {
        monitoring: {
            title: { en: "24/7 Monitoring", ar: "مراقبة على مدار الساعة" },
            icon: "fas fa-eye",
            content: {
                en: "👁️ AI monitors stock levels 24/7 across all warehouses. Real-time alerts for low stock, expired items, or unusual movements. Visual dashboards show inventory health at a glance. Automatic reports to management with actionable insights.",
                ar: "👁️ الذكاء الاصطناعي يراقب مستويات المخزون 24/7 عبر جميع المستودعات. تنبيهات فورية للمخزون المنخفض، المنتجات المنتهية، أو الحركات غير العادية. لوحات معلومات بصرية تظهر صحة المخزون بنظرة واحدة. تقارير تلقائية للإدارة مع رؤى قابلة للتنفيذ."
            }
        },
        predictions: {
            title: { en: "Smart Predictions", ar: "توقعات ذكية" },
            icon: "fas fa-brain",
            content: {
                en: "🧠 Predict stock shortages 2 weeks in advance using AI. Analyze seasonal trends, sales patterns, and market conditions. Auto-generate purchase orders before stockouts occur. Machine learning improves predictions over time.",
                ar: "🧠 توقع نقص المخزون قبل أسبوعين باستخدام الذكاء الاصطناعي. تحليل الاتجاهات الموسمية، أنماط المبيعات، وظروف السوق. توليد أوامر الشراء تلقائياً قبل حدوث نفاد المخزون. التعلم الآلي يحسن التوقعات بمرور الوقت."
            }
        },
        optimization: {
            title: { en: "Space Optimization", ar: "تحسين المساحة" },
            icon: "fas fa-chart-bar",
            content: {
                en: "📊 Optimize warehouse space utilization by 40%. AI suggests best storage locations for each product. Reduce picking time with smart organization. Minimize waste by 67% through intelligent rotation and placement.",
                ar: "📊 تحسين استخدام مساحة المستودع بنسبة 40%. الذكاء الاصطناعي يقترح أفضل مواقع التخزين لكل منتج. تقليل وقت الالتقاط مع التنظيم الذكي. تقليل الهدر بنسبة 67% من خلال التدوير والوضع الذكي."
            }
        },
        full: {
            title: { en: "Complete Inventory Revolution", ar: "ثورة المخزون الكاملة" },
            icon: "fas fa-warehouse",
            content: industryContent.inventory
        }
    },
    hospitality: {
        booking: {
            title: { en: "Smart Booking", ar: "حجز ذكي" },
            icon: "fas fa-bed",
            content: {
                en: "🛏️ Guests book rooms through natural conversation. AI understands preferences, dates, and special requests. Instant availability checking and dynamic pricing. Personalized recommendations based on guest history.",
                ar: "🛏️ النزلاء يحجزون الغرف عبر المحادثة الطبيعية. الذكاء الاصطناعي يفهم التفضيلات، التواريخ، والطلبات الخاصة. فحص التوفر الفوري والتسعير الديناميكي. توصيات مخصصة بناءً على تاريخ النزيل."
            }
        },
        checkin: {
            title: { en: "Mobile Check-in", ar: "تسجيل دخول بالجوال" },
            icon: "fas fa-mobile-alt",
            content: {
                en: "📱 Complete check-in in 30 seconds via WhatsApp. No queues, no paperwork, no hassle. Digital room keys sent to phone. Pre-arrival customization of room preferences.",
                ar: "📱 إكمال تسجيل الدخول في 30 ثانية عبر واتساب. لا طوابير، لا أوراق، لا متاعب. مفاتيح الغرف الرقمية ترسل للهاتف. تخصيص تفضيلات الغرفة قبل الوصول."
            }
        },
        concierge: {
            title: { en: "AI Concierge", ar: "خدمة الكونسيرج الذكية" },
            icon: "fas fa-concierge-bell",
            content: {
                en: "🛎️ 24/7 AI concierge handles all guest requests. Room service, spa bookings, local recommendations - all via chat. Multi-language support for international guests. Instant response to complaints before they escalate.",
                ar: "🛎️ كونسيرج الذكاء الاصطناعي 24/7 يتعامل مع جميع طلبات النزلاء. خدمة الغرف، حجوزات السبا، التوصيات المحلية - كل شيء عبر الدردشة. دعم متعدد اللغات للنزلاء الدوليين. استجابة فورية للشكاوى قبل تصاعدها."
            }
        },
        full: {
            title: { en: "Complete Hospitality Transformation", ar: "تحول الضيافة الكامل" },
            icon: "fas fa-hotel",
            content: industryContent.hospitality
        }
    },
    healthcare: {
        appointments: {
            title: { en: "Smart Appointments", ar: "مواعيد ذكية" },
            icon: "fas fa-calendar-check",
            content: {
                en: "📅 Patients book appointments through natural chat. AI understands symptoms and suggests appropriate specialists. Automatic reminders reduce no-shows by 81%. Smart scheduling optimizes doctor availability and reduces wait times.",
                ar: "📅 يحجز المرضى المواعيد عبر الدردشة الطبيعية. الذكاء الاصطناعي يفهم الأعراض ويقترح المختصين المناسبين. التذكيرات التلقائية تقلل الغياب بنسبة 81%. الجدولة الذكية تحسن توفر الأطباء وتقلل أوقات الانتظار."
            }
        },
        reminders: {
            title: { en: "Medication Reminders", ar: "تذكير الأدوية" },
            icon: "fas fa-pills",
            content: {
                en: "💊 Personalized medication schedules for each patient. Multi-channel reminders via WhatsApp, SMS, or calls. Track adherence and alert doctors of issues. Refill reminders and pharmacy integration for seamless care.",
                ar: "💊 جداول أدوية مخصصة لكل مريض. تذكيرات متعددة القنوات عبر واتساب، رسائل نصية، أو مكالمات. تتبع الالتزام وتنبيه الأطباء للمشاكل. تذكيرات إعادة التعبئة وتكامل الصيدلية للرعاية السلسة."
            }
        },
        emergency: {
            title: { en: "Emergency Protocols", ar: "بروتوكولات الطوارئ" },
            icon: "fas fa-ambulance",
            content: {
                en: "🚑 Instant emergency response activation. AI triages symptoms and determines urgency levels. Automated alerts to medical staff with patient history. GPS tracking for ambulance dispatch and real-time updates to family.",
                ar: "🚑 تفعيل فوري لاستجابة الطوارئ. الذكاء الاصطناعي يصنف الأعراض ويحدد مستويات الإلحاح. تنبيهات آلية للطاقم الطبي مع تاريخ المريض. تتبع GPS لإرسال سيارة الإسعاف وتحديثات فورية للعائلة."
            }
        },
        full: {
            title: { en: "Complete Healthcare Revolution", ar: "ثورة الرعاية الصحية الكاملة" },
            icon: "fas fa-hospital",
            content: industryContent.healthcare
        }
    },
    banking: {
        security: {
            title: { en: "Fraud Protection", ar: "حماية من الاحتيال" },
            icon: "fas fa-shield-alt",
            content: {
                en: "🛡️ Real-time fraud detection using AI pattern recognition. Instant alerts for suspicious activities. Biometric verification for high-value transactions. Machine learning adapts to new fraud patterns automatically.",
                ar: "🛡️ كشف الاحتيال الفوري باستخدام التعرف على الأنماط بالذكاء الاصطناعي. تنبيهات فورية للأنشطة المشبوهة. التحقق البيومتري للمعاملات عالية القيمة. التعلم الآلي يتكيف مع أنماط الاحتيال الجديدة تلقائياً."
            }
        },
        transactions: {
            title: { en: "Smart Transactions", ar: "معاملات ذكية" },
            icon: "fas fa-exchange-alt",
            content: {
                en: "💸 Complete banking transactions through natural conversation. Transfer money, pay bills, check balances - all via chat. Multi-currency support with real-time exchange rates. Transaction history and insights at your fingertips.",
                ar: "💸 إكمال المعاملات المصرفية عبر المحادثة الطبيعية. تحويل الأموال، دفع الفواتير، فحص الأرصدة - كل شيء عبر الدردشة. دعم متعدد العملات مع أسعار الصرف الفورية. تاريخ المعاملات والرؤى في متناول يدك."
            }
        },
        verification: {
            title: { en: "Instant Verification", ar: "تحقق فوري" },
            icon: "fas fa-check-circle",
            content: {
                en: "✅ Document verification in seconds using AI. KYC processes completed via chat. Instant loan eligibility checks. Digital onboarding for new customers in minutes, not days.",
                ar: "✅ التحقق من المستندات في ثوانٍ باستخدام الذكاء الاصطناعي. عمليات اعرف عميلك تكتمل عبر الدردشة. فحوصات الأهلية للقروض الفورية. الإلحاق الرقمي للعملاء الجدد في دقائق، وليس أيام."
            }
        },
        full: {
            title: { en: "Complete Banking Revolution", ar: "ثورة البنوك الكاملة" },
            icon: "fas fa-university",
            content: industryContent.banking
        }
    },
    service: {
        "ai-response": {
            title: { en: "AI Response System", ar: "نظام الرد الذكي" },
            icon: "fas fa-robot",
            content: {
                en: "🤖 AI handles 94% of customer queries instantly. Natural language understanding in multiple dialects. Learns from each interaction to improve responses. Seamlessly escalates complex issues to human agents.",
                ar: "🤖 الذكاء الاصطناعي يتعامل مع 94% من استفسارات العملاء فوراً. فهم اللغة الطبيعية بلهجات متعددة. يتعلم من كل تفاعل لتحسين الردود. يصعّد المشكلات المعقدة بسلاسة للوكلاء البشريين."
            }
        },
        multilingual: {
            title: { en: "Multi-language Support", ar: "دعم متعدد اللغات" },
            icon: "fas fa-language",
            content: {
                en: "🌐 Support customers in their preferred language. Real-time translation with cultural context. Arabic dialects, English variants, and more. Maintains brand voice across all languages.",
                ar: "🌐 دعم العملاء بلغتهم المفضلة. ترجمة فورية مع السياق الثقافي. اللهجات العربية، المتغيرات الإنجليزية، وأكثر. يحافظ على صوت العلامة التجارية عبر جميع اللغات."
            }
        },
        analytics: {
            title: { en: "Performance Analytics", ar: "تحليلات الأداء" },
            icon: "fas fa-chart-line",
            content: {
                en: "📊 Real-time dashboards show customer satisfaction metrics. Sentiment analysis identifies issues before they escalate. Track resolution times, common queries, and agent performance. AI-powered insights for continuous improvement.",
                ar: "📊 لوحات معلومات فورية تظهر مقاييس رضا العملاء. تحليل المشاعر يحدد المشكلات قبل تصاعدها. تتبع أوقات الحل، الاستفسارات الشائعة، وأداء الوكلاء. رؤى مدعومة بالذكاء الاصطناعي للتحسين المستمر."
            }
        },
        full: {
            title: { en: "Complete Service Revolution", ar: "ثورة الخدمة الكاملة" },
            icon: "fas fa-headset",
            content: industryContent.service
        }
    }
};


// ============================================
// ENTERPRISE TRANSFORM - ORBITAL INTERACTION
// ============================================

function initOrbitalTransform() {
    const industryModal = document.getElementById('industryModal');
    const modalIcon = document.getElementById('modalIndustryIcon');
    const modalTitle = document.getElementById('modalIndustryTitle');
    const modalBody = document.getElementById('modalIndustryBody');
    const modalBackdrop = industryModal?.querySelector('.modal-backdrop');
    const modalClose = industryModal?.querySelector('.modal-close');

    if (!industryModal) return;

    // Handle all orbital icon clicks
    document.querySelectorAll('.orbital-icon').forEach(icon => {
        icon.addEventListener('click', function (e) {
            e.stopPropagation();

            const industry = this.dataset.industry;
            const feature = this.dataset.feature;
            const lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';

            if (industry && feature && featureContent[industry]?.[feature]) {
                const content = featureContent[industry][feature];

                // Update modal class for styling
                industryModal.classList.toggle('feature-modal', feature !== 'full');

                // Update modal icon
                if (modalIcon && content.icon) {
                    modalIcon.innerHTML = `<i class="${content.icon}"></i>`;
                }

                // Update modal title
                if (modalTitle && content.title) {
                    modalTitle.innerHTML = `
                        <span class="en">${content.title.en}</span>
                        <span class="ar">${content.title.ar}</span>
                    `;
                }

                // Update modal body section in initOrbitalTransform function
                if (modalBody) {
                    const textContent = typeof content.content === 'string'
                        ? content.content
                        : content.content[lang];

                    // Apply typing effect to ALL modals
                    modalBody.innerHTML = `
        <div class="typing-container">
            <div class="typing-text"></div>
            <span class="typing-cursor">|</span>
        </div>
    `;

                    // Show modal
                    industryModal.classList.add('active');
                    document.body.style.overflow = 'hidden';

                    // Start typing effect with different speeds
                    const typingSpeed = feature === 'full' ? 15 : 25; // Faster for shorter content
                    setTimeout(() => {
                        typeModalText(modalBody.querySelector('.typing-container'), textContent, typingSpeed);
                    }, 300);
                }
            }
        });
    });

    // Modal close handlers
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            industryModal.classList.remove('active');
            industryModal.classList.remove('feature-modal');
            document.body.style.overflow = '';
        });
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', () => {
            industryModal.classList.remove('active');
            industryModal.classList.remove('feature-modal');
            document.body.style.overflow = '';
        });
    }

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && industryModal?.classList.contains('active')) {
            industryModal.classList.remove('active');
            industryModal.classList.remove('feature-modal');
            document.body.style.overflow = '';
        }
    });

    // Update insights on hover
    const helixCards = document.querySelectorAll('.helix-card');
    helixCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const industry = this.dataset.industry;
            const insightText = document.getElementById('insightText');

            if (insightText && helixInsights[industry]) {
                const lang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
                insightText.innerHTML = `<span class="${lang}">${helixInsights[industry][lang]}</span>`;
            }
        });
    });
}
// Improved typing animation with cursor hiding at the end
function typeModalText(container, text, speed = 50) {
    const textElement = container.querySelector('.typing-text');
    const cursor = container.querySelector('.typing-cursor');
    
    if (!textElement || !text) return;
    
    // Clear existing text and set direction
    textElement.textContent = '';
    textElement.innerHTML = '';
    
    // Check if text contains Arabic characters
    const containsArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
    
    if (containsArabic) {
        textElement.style.direction = 'rtl';
        textElement.style.textAlign = 'right';
    } else {
        textElement.style.direction = 'ltr';
        textElement.style.textAlign = 'left';
    }
    
    // Show cursor
    if (cursor) cursor.style.opacity = '1';
    
    // Create array of characters or words to type
    let segments;
    if (containsArabic) {
        // For Arabic, split by words for better rendering
        segments = text.split(' ').map(word => word + ' ');
    } else {
        // For Latin scripts, split by characters
        segments = [...text];
    }
    
    let index = 0;
    let visibleText = '';
    
    function type() {
        if (index < segments.length) {
            visibleText += segments[index];
            textElement.textContent = visibleText;
            index++;
            
            // Auto scroll if content overflows
            const modalBody = container.closest('.modal-body');
            if (modalBody && modalBody.scrollHeight > modalBody.clientHeight) {
                modalBody.scrollTop = modalBody.scrollHeight;
            }
            
            // Determine typing speed with natural pauses
            let typingSpeed = speed;
            const currentSegment = segments[index-1];
            
            // Add longer pauses after punctuation
            if (/[.!?،؟]$/.test(currentSegment.trim())) {
                typingSpeed = speed * 3; // Longer pause after sentence endings
            } 
            // Add medium pauses after commas and similar punctuation
            else if (/[,;:،]$/.test(currentSegment.trim())) {
                typingSpeed = speed * 2; // Medium pause after commas
            }
            
            // For Arabic, keep consistent word-based timing regardless of word length
            if (containsArabic) {
                // Base speed for words, don't make it too fast for long words
                typingSpeed = speed + 10;
            }
            
            setTimeout(type, typingSpeed);
        } else {
            // Typing complete - hide cursor after a brief delay
            if (cursor) {
                // Show a few blinks first, then hide
                cursor.style.animation = 'cursorBlink 1s 3'; // Blink 3 times
                
                // Hide the cursor after the animation completes
                setTimeout(() => {
                    cursor.style.opacity = '0';
                    cursor.style.animation = 'none';
                }, 3000); // 3 seconds (3 blinks at 1s each)
            }
        }
    }
    
    // Start typing with a small delay
    setTimeout(type, 300);  // Longer initial delay
}

// Add this code to your JS file to fix the modal display
document.addEventListener('DOMContentLoaded', function() {
    // Fix industry modal display
    const industryModal = document.getElementById('industryModal');
    if (industryModal) {
        // Override the existing style using style attribute
        industryModal.setAttribute('style', 'display: none !important');
        
        // Add class-based handler for .active class
        const originalSetAttribute = industryModal.setAttribute;
        industryModal.setAttribute = function(name, value) {
            originalSetAttribute.call(this, name, value);
            
            if (name === 'class' && value.includes('active')) {
                this.style.setProperty('display', 'flex', 'important');
            } else if (name === 'class' && !value.includes('active')) {
                this.style.setProperty('display', 'none', 'important');
            }
        };
        
        // Handle classList.add/remove for .active
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (industryModal.classList.contains('active')) {
                        industryModal.style.setProperty('display', 'flex', 'important');
                    } else {
                        industryModal.style.setProperty('display', 'none', 'important');
                    }
                }
            });
        });
        
        observer.observe(industryModal, { attributes: true });
    }
});


// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initOrbitalTransform();
});

// Also initialize after dynamic content loads
if (typeof initializeAllSystems !== 'undefined') {
    const originalInit = initializeAllSystems;
    window.initializeAllSystems = function () {
        originalInit();
        initOrbitalTransform();
    };
}

// ============================================
// ENTERPRISE TRANSFORM - PARALLAX EFFECT
// ============================================

function initFloatingPoolParallax() {
    const floatingCards = document.querySelectorAll('.floating-card');
    const poolContainer = document.querySelector('.floating-pool-container');
    const enterpriseSection = document.querySelector('.enterprise-transform');
    
    if (!floatingCards.length || !poolContainer) return;
    
    // Enhanced parallax variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollProgress = 0;
    
    // Pool boundaries for constraint
    const poolBounds = poolContainer.getBoundingClientRect();
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
        // Enhanced animation loop with depth layers
    function animateParallax() {
        targetX += (mouseX - targetX) * 0.08;
        targetY += (mouseY - targetY) * 0.08;
        
        floatingCards.forEach((card, index) => {
            const row = Math.floor(index / 4);
            const col = index % 4;
            const speed = 0.5 + (row * 0.3) + (col * 0.1); // Depth based on position
            
            // Base parallax from mouse
            const mouseXOffset = targetX * 40 * speed;
            const mouseYOffset = targetY * 30 * speed;
            
            // Scroll-based parallax
            const scrollOffset = scrollProgress * 100 * (row + 1) * 0.5;
            
            // Combined transformations
            const x = mouseXOffset + Math.sin(Date.now() * 0.001 + index) * 5;
            const y = mouseYOffset - scrollOffset + Math.cos(Date.now() * 0.001 + index) * 3;
            const z = speed * 50;
            const rotateX = targetY * 3 * speed;
            const rotateY = targetX * 3 * speed;
            
            card.style.transform = `
                translate3d(${x}px, ${y}px, ${z}px)
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                scale(${0.9 + scrollProgress * 0.1})
            `;
            
            // Opacity based on scroll
            card.style.opacity = 0.9 + (0.1 * (1 - Math.abs(scrollProgress - 0.5) * 2));
        });
        
        requestAnimationFrame(animateParallax);
    }
    
    animateParallax();
    
    // Scroll-based parallax
       // Enhanced scroll-based parallax
    function handleScrollParallax() {
        if (!enterpriseSection) return;
        
        const scrollY = window.scrollY;
        const sectionTop = enterpriseSection.offsetTop;
        const sectionHeight = enterpriseSection.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Calculate section visibility
        const sectionVisibleStart = sectionTop - windowHeight;
        const sectionVisibleEnd = sectionTop + sectionHeight;
        
        if (scrollY >= sectionVisibleStart && scrollY <= sectionVisibleEnd) {
            // Normalized scroll progress (0 to 1)
            scrollProgress = (scrollY - sectionVisibleStart) / (sectionVisibleEnd - sectionVisibleStart);
            scrollProgress = Math.max(0, Math.min(1, scrollProgress));
        }
    }
    
    // Throttled scroll handler
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(() => {
                handleScrollParallax();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    }, { passive: true });
        
    // Initial setup
    handleScrollParallax();
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initFloatingPoolParallax();
    initOrbitalTransform(); // Keep existing orbital functionality
});

// Reinitialize on resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        initFloatingPoolParallax();
    }, 250);
});

// Enhanced Parallax & Interactive Floating for Enterprise Cards
function initEnhancedEnterpriseFloating() {
    const floatingCards = document.querySelectorAll('.floating-card');
    const poolContainer = document.querySelector('.floating-pool-container');
    
    if (!floatingCards.length || !poolContainer) return;
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - centerX) / centerX; // -1 to 1
        mouseY = (e.clientY - centerY) / centerY; // -1 to 1
    });
    
    // Handle parallax effect with depth
    function animateCards() {
        floatingCards.forEach(card => {
            // Get card's position data
            const zIndex = parseFloat(card.style.getPropertyValue('--z-index') || 1);
            
            // Calculate depth factor (cards with higher z-index move more)
            const depthFactor = zIndex * 0.15;
            
            // Calculate parallax offset based on mouse position and depth
            const xOffset = mouseX * 40 * depthFactor;
            const yOffset = mouseY * 30 * depthFactor;
            const rotateX = mouseY * -3 * depthFactor;
            const rotateY = mouseX * 3 * depthFactor;
            
            // Apply transform - add to the current animation
            const currentTransform = getComputedStyle(card).transform;
            
            // Only apply if not in mobile view
            if (window.innerWidth > 768) {
                card.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px)) 
                                      rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
        
        requestAnimationFrame(animateCards);
    }
    
    // Initialize parallax animation
    if (window.innerWidth > 768) {
        requestAnimationFrame(animateCards);
    }
    
    // Update on window resize
    window.addEventListener('resize', () => {
        centerX = window.innerWidth / 2;
        centerY = window.innerHeight / 2;
    });
    
    // Fix modal display issue
    const industryModal = document.getElementById('industryModal');
    if (industryModal) {
        // Override the !important display property
        industryModal.style.setProperty('display', 'none', 'important');
        
        // Fix the display when active
        const modalObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (industryModal.classList.contains('active')) {
                        industryModal.style.setProperty('display', 'flex', 'important');
                    } else {
                        industryModal.style.setProperty('display', 'none', 'important');
                    }
                }
            });
        });
        
        modalObserver.observe(industryModal, { attributes: true });
    }
}

// ============================================
// END OF ENTERPRISE TRANSFORM
// ============================================