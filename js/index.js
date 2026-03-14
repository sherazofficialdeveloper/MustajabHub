// ===== MAIN APPLICATION JAVASCRIPT =====
// This file contains all interactive functionality for the DigiPro homepage

(function() {
    'use strict';

    // ===== DOM ELEMENTS =====
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.md:hidden .fa-bars');
    const nav = document.querySelector('nav');
    const serviceSections = document.querySelectorAll('.service-showcase');
    const fadeElements = document.querySelectorAll('.fade-in-up');
    const testimonialContainer = document.querySelector('.marquee-inline');
    const dropdowns = document.querySelectorAll('.group');
    
    // ===== INITIALIZATION =====
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initScrollAnimations();
        initTestimonialMarquee();
        initDropdowns();
        initSmoothScroll();
        initImageLoading();
        setActiveNavLink();
        handleResize();
    });

    // ===== MOBILE MENU TOGGLE =====
    function initMobileMenu() {
        if (!mobileMenuBtn) return;
        
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu')) {
                const mobileNav = createMobileMenu();
                document.body.appendChild(mobileNav);
                
                // Animate in
                setTimeout(() => {
                    mobileNav.classList.add('active');
                }, 10);
                
                // Close button functionality
                const closeBtn = mobileNav.querySelector('.close-menu');
                closeBtn.addEventListener('click', () => {
                    mobileNav.classList.remove('active');
                    setTimeout(() => {
                        mobileNav.remove();
                    }, 300);
                });
                
                // Close on outside click
                mobileNav.addEventListener('click', function(e) {
                    if (e.target === mobileNav) {
                        mobileNav.classList.remove('active');
                        setTimeout(() => {
                            mobileNav.remove();
                        }, 300);
                    }
                });
            }
        });
    }
    
    function createMobileMenu() {
        const menu = document.createElement('div');
        menu.className = 'mobile-menu fixed inset-0 bg-white/95 backdrop-blur-md z-50 p-6 transform translate-x-full transition-transform duration-300 ease-in-out';
        menu.innerHTML = `
            <div class="flex justify-between items-center mb-8">
                <div class="text-2xl font-bold">
                    <span class="text-blue-600">Digi</span><span class="text-teal-500">Pro</span>
                </div>
                <button class="close-menu w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <nav class="flex flex-col space-y-4">
                <a href="index.html" class="nav-link text-lg py-2 border-b border-gray-100">Home</a>
                <div class="mobile-dropdown">
                    <button class="flex items-center justify-between w-full text-lg py-2 border-b border-gray-100">
                        Freelancing <i class="fas fa-chevron-down text-sm"></i>
                    </button>
                    <div class="mobile-dropdown-content hidden pl-4 mt-2 space-y-2">
                        <a href="#" class="block py-2 text-gray-600">Freelancing Skills</a>
                        <a href="#" class="block py-2 text-gray-600">Career & Work Tips</a>
                        <a href="#" class="block py-2 text-gray-600">Online Earning & Side Hustle</a>
                    </div>
                </div>
                <div class="mobile-dropdown">
                    <button class="flex items-center justify-between w-full text-lg py-2 border-b border-gray-100">
                        More Topics <i class="fas fa-chevron-down text-sm"></i>
                    </button>
                    <div class="mobile-dropdown-content hidden pl-4 mt-2 space-y-2">
                        <a href="#" class="block py-2 text-gray-600">Tech</a>
                        <a href="#" class="block py-2 text-gray-600">Learning</a>
                        <a href="#" class="block py-2 text-gray-600">Lifestyle</a>
                        <a href="#" class="block py-2 text-gray-600">Money & Business</a>
                        <a href="#" class="block py-2 text-gray-600">Health & Fitness</a>
                    </div>
                </div>
                <div class="mobile-dropdown">
                    <button class="flex items-center justify-between w-full text-lg py-2 border-b border-gray-100">
                        Services <i class="fas fa-chevron-down text-sm"></i>
                    </button>
                    <div class="mobile-dropdown-content hidden pl-4 mt-2 space-y-2">
                        <a href="wordpressDev.html" class="block py-2 text-gray-600">WordPress Development</a>
                        <a href="whatsappAuto.html" class="block py-2 text-gray-600">WhatsApp Automation</a>
                        <a href="ecommerceGrowth.html" class="block py-2 text-gray-600">E-commerce Growth</a>
                        <a href="seoService.html" class="block py-2 text-gray-600">Technical SEO</a>
                    </div>
                </div>
                <a href="#" class="nav-link text-lg py-2 border-b border-gray-100">About Us</a>
                <a href="contact.html" class="nav-link text-lg py-2 border-b border-gray-100">Contact</a>
            </nav>
        `;
        
        // Add dropdown toggles for mobile
        menu.querySelectorAll('.mobile-dropdown button').forEach(btn => {
            btn.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const icon = this.querySelector('i');
                content.classList.toggle('hidden');
                icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
            });
        });
        
        return menu;
    }

    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        // Use Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Optional: unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe service showcase sections
        serviceSections.forEach(section => {
            observer.observe(section);
        });
        
        // Observe any element with fade-in-up class
        fadeElements.forEach(element => {
            observer.observe(element);
        });
        
        // Also observe service cards for subtle animation
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
        
        // Observe portfolio cards
        document.querySelectorAll('.portfolio-card').forEach(card => {
            observer.observe(card);
        });
    }

    // ===== TESTIMONIAL MARQUEE =====
    function initTestimonialMarquee() {
        if (!testimonialContainer) return;
        
        // Clone the testimonials for seamless infinite scroll
        const cards = testimonialContainer.innerHTML;
        testimonialContainer.innerHTML = cards + cards; // Double the cards
        
        // Pause on hover (already in CSS, but we'll add touch support)
        testimonialContainer.addEventListener('touchstart', function() {
            this.style.animationPlayState = 'paused';
        });
        
        testimonialContainer.addEventListener('touchend', function() {
            this.style.animationPlayState = 'running';
        });
        
        // Adjust animation speed based on screen width
        function adjustMarqueeSpeed() {
            if (window.innerWidth < 640) {
                testimonialContainer.style.animationDuration = '20s';
            } else {
                testimonialContainer.style.animationDuration = '30s';
            }
        }
        
        adjustMarqueeSpeed();
        window.addEventListener('resize', adjustMarqueeSpeed);
    }

    // ===== DROPDOWN IMPROVEMENTS =====
    function initDropdowns() {
        dropdowns.forEach(dropdown => {
            const button = dropdown.querySelector('button');
            const menu = dropdown.querySelector('.absolute');
            
            if (!button || !menu) return;
            
            // Touch support for mobile
            button.addEventListener('touchstart', function(e) {
                e.preventDefault();
                const isVisible = menu.classList.contains('visible');
                
                // Hide all other dropdowns
                dropdowns.forEach(d => {
                    const m = d.querySelector('.absolute');
                    if (m && m !== menu) {
                        m.classList.remove('opacity-100', 'visible');
                        m.classList.add('opacity-0', 'invisible');
                    }
                });
                
                if (isVisible) {
                    menu.classList.remove('opacity-100', 'visible');
                    menu.classList.add('opacity-0', 'invisible');
                } else {
                    menu.classList.remove('opacity-0', 'invisible');
                    menu.classList.add('opacity-100', 'visible');
                }
            });
            
            // Close on click outside
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    menu.classList.remove('opacity-100', 'visible');
                    menu.classList.add('opacity-0', 'invisible');
                }
            });
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ===== IMAGE LOADING STATES =====
    function initImageLoading() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading class
            img.classList.add('image-loading');
            
            // Remove loading class when image loads
            img.addEventListener('load', function() {
                this.classList.remove('image-loading');
            });
            
            // Handle error
            img.addEventListener('error', function() {
                this.classList.remove('image-loading');
                this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="%23cccccc"%3E%3Cpath d="M4 4h16v16H4V4z"/%3E%3C/svg%3E';
            });
        });
    }

    // ===== ACTIVE NAVIGATION LINK =====
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // ===== HEADER SCROLL EFFECT =====
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        if (!header) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add background when scrolled
        if (scrollTop > 50) {
            header.classList.add('shadow-md', 'bg-white/95');
        } else {
            header.classList.remove('shadow-md', 'bg-white/95');
        }
        
        // Hide/show header on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // ===== RESPONSIVE HANDLING =====
    function handleResize() {
        let resizeTimer;
        
        window.addEventListener('resize', function() {
            document.body.classList.add('resize-animation-stopper');
            
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                document.body.classList.remove('resize-animation-stopper');
                
                // Adjust layout based on screen size
                if (window.innerWidth >= 768) {
                    // Remove any mobile menus if open
                    const mobileMenu = document.querySelector('.mobile-menu');
                    if (mobileMenu) {
                        mobileMenu.remove();
                    }
                }
            }, 250);
        });
    }

    // ===== LAZY LOADING FOR IMAGES =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== PERFORMANCE OPTIMIZATION =====
    // Debounce scroll events
    function debounce(func, wait = 100) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Optimize scroll event listeners
    const optimizedScroll = debounce(() => {
        // Any scroll-based calculations here
    }, 10);

    window.addEventListener('scroll', optimizedScroll);

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                setTimeout(() => mobileMenu.remove(), 300);
            }
            
            // Close any open dropdowns
            dropdowns.forEach(dropdown => {
                const menu = dropdown.querySelector('.absolute');
                if (menu && menu.classList.contains('visible')) {
                    menu.classList.remove('opacity-100', 'visible');
                    menu.classList.add('opacity-0', 'invisible');
                }
            });
        }
    });

    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.error('Page error:', e.message);
        // Could implement error tracking here
    });

    console.log('DigiPro JavaScript initialized successfully');
})();

// wordpress development
// Main JavaScript file for the website

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    // (Add functionality if needed in the future)
    const mobileMenuButton = document.querySelector('.lg\\:hidden');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            console.log('Mobile menu clicked - add your mobile menu functionality here');
            // You can expand this to toggle a mobile navigation menu
        });
    }
    
    // ===== TESTIMONIAL MARQUEE CONTROL =====
    // Optional: Pause animation when tab is not visible to save resources
    const marqueeTrack = document.querySelector('.marquee-track');
    
    if (marqueeTrack) {
        // Pause animation when page is hidden
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                marqueeTrack.style.animationPlayState = 'paused';
            } else {
                // Only resume if not hovering
                const container = document.querySelector('.marquee-container');
                if (container && !container.matches(':hover')) {
                    marqueeTrack.style.animationPlayState = 'running';
                }
            }
        });
    }
    
    // ===== DROPDOWN ACCESSIBILITY =====
    // Improve keyboard navigation for dropdowns
    const dropdownButtons = document.querySelectorAll('.group button');
    
    dropdownButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown') {
                const dropdown = this.closest('.group').querySelector('.absolute');
                if (dropdown) {
                    dropdown.classList.add('opacity-100', 'visible');
                    const firstLink = dropdown.querySelector('a');
                    if (firstLink) firstLink.focus();
                }
            }
        });
    });
    
    // Close dropdowns with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openDropdowns = document.querySelectorAll('.group .absolute.opacity-100');
            openDropdowns.forEach(dropdown => {
                dropdown.classList.remove('opacity-100', 'visible');
            });
        }
    });
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== "#") {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===== LOG CONFIRMATION =====
    console.log('Website JavaScript initialized - Testimonials marquee active');
});
    // whatsapp
    // Main JavaScript file for the website

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuButton = document.querySelector('.lg\\:hidden');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            console.log('Mobile menu clicked - add your mobile menu functionality here');
        });
    }
    
    // ===== TESTIMONIAL MARQUEE CONTROL =====
    const marqueeTrack = document.querySelector('.marquee-track');
    
    if (marqueeTrack) {
        // Pause animation when page is hidden
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                marqueeTrack.style.animationPlayState = 'paused';
            } else {
                const container = document.querySelector('.marquee-container');
                if (container && !container.matches(':hover')) {
                    marqueeTrack.style.animationPlayState = 'running';
                }
            }
        });
    }
    
    // ===== DROPDOWN ACCESSIBILITY =====
    const dropdownButtons = document.querySelectorAll('.group button');
    
    dropdownButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown') {
                const dropdown = this.closest('.group').querySelector('.absolute');
                if (dropdown) {
                    dropdown.classList.add('opacity-100', 'visible');
                    const firstLink = dropdown.querySelector('a');
                    if (firstLink) firstLink.focus();
                }
            }
        });
    });
    
    // Close dropdowns with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openDropdowns = document.querySelectorAll('.group .absolute.opacity-100');
            openDropdowns.forEach(dropdown => {
                dropdown.classList.remove('opacity-100', 'visible');
            });
        }
    });
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== "#") {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===== LOG CONFIRMATION =====
    console.log('Website JavaScript initialized - WhatsApp Automation page loaded');
});
//    ecommerce
// ===== MAIN APPLICATION JAVASCRIPT =====
(function() {
    'use strict';

    // ===== DOM ELEMENTS =====
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.md:hidden .fa-bars');
    const serviceSections = document.querySelectorAll('.service-showcase');
    const fadeElements = document.querySelectorAll('.fade-in-up');
    const testimonialContainer = document.querySelector('.marquee-inline');
    const dropdowns = document.querySelectorAll('.group');
    
    // ===== INITIALIZATION =====
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initScrollAnimations();
        initTestimonialMarquee();
        initDropdowns();
        initSmoothScroll();
        initImageLoading();
        setActiveNavLink();
        handleResize();
        initHeaderScroll();
    });

    // ===== MOBILE MENU TOGGLE =====
    function initMobileMenu() {
        if (!mobileMenuBtn) return;
        
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (!document.querySelector('.mobile-menu')) {
                const mobileNav = createMobileMenu();
                document.body.appendChild(mobileNav);
                
                setTimeout(() => {
                    mobileNav.classList.add('active');
                }, 10);
                
                const closeBtn = mobileNav.querySelector('.close-menu');
                closeBtn.addEventListener('click', () => {
                    mobileNav.classList.remove('active');
                    setTimeout(() => {
                        mobileNav.remove();
                    }, 300);
                });
                
                mobileNav.addEventListener('click', function(e) {
                    if (e.target === mobileNav) {
                        mobileNav.classList.remove('active');
                        setTimeout(() => {
                            mobileNav.remove();
                        }, 300);
                    }
                });
            }
        });
    }
    
    function createMobileMenu() {
        const menu = document.createElement('div');
        menu.className = 'mobile-menu fixed inset-0 bg-white/95 backdrop-blur-md z-50 p-6';
        menu.innerHTML = `
            <div class="flex justify-between items-center mb-8">
                <div class="text-2xl font-bold">
                    <span class="text-blue-600">Digi</span><span class="text-teal-500">Pro</span>
                </div>
                <button class="close-menu w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <nav class="flex flex-col space-y-4">
                <a href="index.html" class="nav-link text-lg py-2 border-b border-gray-100">Home</a>
                <div class="mobile-dropdown">
                    <button class="flex items-center justify-between w-full text-lg py-2 border-b border-gray-100">
                        Freelancing <i class="fas fa-chevron-down text-sm"></i>
                    </button>
                    <div class="mobile-dropdown-content hidden pl-4 mt-2 space-y-2">
                        <a href="#" class="block py-2 text-gray-600">Freelancing Skills</a>
                        <a href="#" class="block py-2 text-gray-600">Career & Work Tips</a>
                        <a href="#" class="block py-2 text-gray-600">Online Earning & Side Hustle</a>
                    </div>
                </div>
                <div class="mobile-dropdown">
                    <button class="flex items-center justify-between w-full text-lg py-2 border-b border-gray-100">
                        More Topics <i class="fas fa-chevron-down text-sm"></i>
                    </button>
                    <div class="mobile-dropdown-content hidden pl-4 mt-2 space-y-2">
                        <a href="#" class="block py-2 text-gray-600">Tech</a>
                        <a href="#" class="block py-2 text-gray-600">Learning</a>
                        <a href="#" class="block py-2 text-gray-600">Lifestyle</a>
                        <a href="#" class="block py-2 text-gray-600">Money & Business</a>
                        <a href="#" class="block py-2 text-gray-600">Health & Fitness</a>
                    </div>
                </div>
                <div class="mobile-dropdown">
                    <button class="flex items-center justify-between w-full text-lg py-2 border-b border-gray-100">
                        Services <i class="fas fa-chevron-down text-sm"></i>
                    </button>
                    <div class="mobile-dropdown-content hidden pl-4 mt-2 space-y-2">
                        <a href="wordpressDev.html" class="block py-2 text-gray-600">WordPress Development</a>
                        <a href="whatsappAuto.html" class="block py-2 text-gray-600">WhatsApp Automation</a>
                        <a href="ecommerceGrowth.html" class="block py-2 text-gray-600">E-commerce Growth</a>
                        <a href="seoService.html" class="block py-2 text-gray-600">Technical SEO</a>
                    </div>
                </div>
                <a href="#" class="nav-link text-lg py-2 border-b border-gray-100">About Us</a>
                <a href="contact.html" class="nav-link text-lg py-2 border-b border-gray-100">Contact</a>
            </nav>
        `;
        
        menu.querySelectorAll('.mobile-dropdown button').forEach(btn => {
            btn.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const icon = this.querySelector('i');
                content.classList.toggle('hidden');
                icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
            });
        });
        
        return menu;
    }

    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        serviceSections.forEach(section => {
            observer.observe(section);
        });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
        
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
        
        document.querySelectorAll('.portfolio-card').forEach(card => {
            observer.observe(card);
        });
    }

    // ===== TESTIMONIAL MARQUEE =====
    function initTestimonialMarquee() {
        if (!testimonialContainer) return;
        
        const cards = testimonialContainer.innerHTML;
        testimonialContainer.innerHTML = cards + cards;
        
        testimonialContainer.addEventListener('touchstart', function() {
            this.style.animationPlayState = 'paused';
        });
        
        testimonialContainer.addEventListener('touchend', function() {
            this.style.animationPlayState = 'running';
        });
        
        function adjustMarqueeSpeed() {
            if (window.innerWidth < 640) {
                testimonialContainer.style.animationDuration = '20s';
            } else {
                testimonialContainer.style.animationDuration = '30s';
            }
        }
        
        adjustMarqueeSpeed();
        window.addEventListener('resize', adjustMarqueeSpeed);
    }

    // ===== DROPDOWN IMPROVEMENTS =====
    function initDropdowns() {
        dropdowns.forEach(dropdown => {
            const button = dropdown.querySelector('button');
            const menu = dropdown.querySelector('.absolute');
            
            if (!button || !menu) return;
            
            button.addEventListener('touchstart', function(e) {
                e.preventDefault();
                const isVisible = menu.classList.contains('visible');
                
                dropdowns.forEach(d => {
                    const m = d.querySelector('.absolute');
                    if (m && m !== menu) {
                        m.classList.remove('opacity-100', 'visible');
                        m.classList.add('opacity-0', 'invisible');
                    }
                });
                
                if (isVisible) {
                    menu.classList.remove('opacity-100', 'visible');
                    menu.classList.add('opacity-0', 'invisible');
                } else {
                    menu.classList.remove('opacity-0', 'invisible');
                    menu.classList.add('opacity-100', 'visible');
                }
            });
            
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    menu.classList.remove('opacity-100', 'visible');
                    menu.classList.add('opacity-0', 'invisible');
                }
            });
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ===== IMAGE LOADING STATES =====
    function initImageLoading() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.classList.add('image-loading');
            
            img.addEventListener('load', function() {
                this.classList.remove('image-loading');
            });
            
            img.addEventListener('error', function() {
                this.classList.remove('image-loading');
                this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="%23cccccc"%3E%3Cpath d="M4 4h16v16H4V4z"/%3E%3C/svg%3E';
            });
        });
    }

    // ===== ACTIVE NAVIGATION LINK =====
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // ===== HEADER SCROLL EFFECT =====
    function initHeaderScroll() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            if (!header) return;
            
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                header.classList.add('shadow-md', 'bg-white/95');
            } else {
                header.classList.remove('shadow-md', 'bg-white/95');
            }
            
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // ===== RESPONSIVE HANDLING =====
    function handleResize() {
        let resizeTimer;
        
        window.addEventListener('resize', function() {
            document.body.classList.add('resize-animation-stopper');
            
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                document.body.classList.remove('resize-animation-stopper');
                
                if (window.innerWidth >= 768) {
                    const mobileMenu = document.querySelector('.mobile-menu');
                    if (mobileMenu) {
                        mobileMenu.remove();
                    }
                }
            }, 250);
        });
    }

    // ===== LAZY LOADING FOR IMAGES =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== DEBOUNCE FUNCTION =====
    function debounce(func, wait = 100) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    const optimizedScroll = debounce(() => {}, 10);
    window.addEventListener('scroll', optimizedScroll);

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                setTimeout(() => mobileMenu.remove(), 300);
            }
            
            dropdowns.forEach(dropdown => {
                const menu = dropdown.querySelector('.absolute');
                if (menu && menu.classList.contains('visible')) {
                    menu.classList.remove('opacity-100', 'visible');
                    menu.classList.add('opacity-0', 'invisible');
                }
            });
        }
    });

    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.error('Page error:', e.message);
    });

    console.log('DigiPro JavaScript initialized successfully');
})();

//    seo page
// ===== MAIN APPLICATION JAVASCRIPT =====
(function() {
    'use strict';

    // ===== DOM ELEMENTS =====
    const header = document.querySelector('header');
    const mobileMenuBtn = document.querySelector('.md:hidden .fa-bars');
    const serviceSections = document.querySelectorAll('.service-showcase');
    const fadeElements = document.querySelectorAll('.fade-in-up');
    const testimonialContainer = document.querySelector('.marquee-inline');
    const dropdowns = document.querySelectorAll('.group');
    
    // ===== INITIALIZATION =====
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initScrollAnimations();
        initTestimonialMarquee();
        initDropdowns();
        initSmoothScroll();
        initImageLoading();
        setActiveNavLink();
        handleResize();
        initHeaderScroll();
        initSEOSpecificFeatures(); // New SEO-specific function
        initSpeedMeters(); // New function for speed meter animations
        initStatCounters(); // New function for stat counters
    });

    // ===== MOBILE MENU TOGGLE =====
    function initMobileMenu() {
        if (!mobileMenuBtn) return;
        
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (!document.querySelector('.mobile-menu')) {
                const mobileNav = createMobileMenu();
                document.body.appendChild(mobileNav);
                
                setTimeout(() => {
                    mobileNav.classList.add('active');
                }, 10);
                
                const closeBtn = mobileNav.querySelector('.close-menu');
                closeBtn.addEventListener('click', () => {
                    mobileNav.classList.remove('active');
                    setTimeout(() => {
                        mobileNav.remove();
                    }, 300);
                });
                
                mobileNav.addEventListener('click', function(e) {
                    if (e.target === mobileNav) {
                        mobileNav.classList.remove('active');
                        setTimeout(() => {
                            mobileNav.remove();
                        }, 300);
                    }
                });
            }
        });
    }
    
    function createMobileMenu() {
        const menu = document.createElement('div');
        menu.className = 'mobile-menu fixed inset-0 bg-white/95 backdrop-blur-md z-50 p-6';
        menu.innerHTML = `
            <div class="flex justify-between items-center mb-8">
                <div class="text-2xl font-bold">
                    <span class="text-blue-600">Digi</span><span class="text-teal-500">Pro</span>
                </div>
                <button class="close-menu w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <nav class="flex flex-col space-y-4">
                <a href="index.html" class="nav-link text-lg py-2 border-b border-gray-100">Home</a>
                <div class="mobile-dropdown">
                    <button class="flex items-center justify-between w-full text-lg py-2 border-b border-gray-100">
                        Freelancing <i class="fas fa-chevron-down text-sm"></i>
                    </button>
                    <div class="mobile-dropdown-content hidden pl-4 mt-2 space-y-2">
                        <a href="#" class="block py-2 text-gray-600">Freelancing Skills</a>
                        <a href="#" class="block py-2 text-gray-600">Career & Work Tips</a>
                        <a href="#" class="block py-2 text-gray-600">Online Earning & Side Hustle</a>
                    </div>
                </div>
                <div class="mobile-dropdown">
                    <button class="flex items-center justify-between w-full text-lg py-2 border-b border-gray-100">
                        More Topics <i class="fas fa-chevron-down text-sm"></i>
                    </button>
                    <div class="mobile-dropdown-content hidden pl-4 mt-2 space-y-2">
                        <a href="#" class="block py-2 text-gray-600">Tech</a>
                        <a href="#" class="block py-2 text-gray-600">Learning</a>
                        <a href="#" class="block py-2 text-gray-600">Lifestyle</a>
                        <a href="#" class="block py-2 text-gray-600">Money & Business</a>
                        <a href="#" class="block py-2 text-gray-600">Health & Fitness</a>
                    </div>
                </div>
                <div class="mobile-dropdown">
                    <button class="flex items-center justify-between w-full text-lg py-2 border-b border-gray-100">
                        Services <i class="fas fa-chevron-down text-sm"></i>
                    </button>
                    <div class="mobile-dropdown-content hidden pl-4 mt-2 space-y-2">
                        <a href="wordpressDev.html" class="block py-2 text-gray-600">WordPress Development</a>
                        <a href="whatsappAuto.html" class="block py-2 text-gray-600">WhatsApp Automation</a>
                        <a href="ecommerceGrowth.html" class="block py-2 text-gray-600">E-commerce Growth</a>
                        <a href="seoService.html" class="block py-2 text-gray-600">Technical SEO</a>
                    </div>
                </div>
                <a href="#" class="nav-link text-lg py-2 border-b border-gray-100">About Us</a>
                <a href="contact.html" class="nav-link text-lg py-2 border-b border-gray-100">Contact</a>
            </nav>
        `;
        
        menu.querySelectorAll('.mobile-dropdown button').forEach(btn => {
            btn.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const icon = this.querySelector('i');
                content.classList.toggle('hidden');
                icon.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
            });
        });
        
        return menu;
    }

    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        serviceSections.forEach(section => {
            observer.observe(section);
        });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
        
        document.querySelectorAll('.service-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
        
        document.querySelectorAll('.portfolio-card').forEach(card => {
            observer.observe(card);
        });
        
        // Observe feature blocks
        document.querySelectorAll('.feature-block').forEach(block => {
            observer.observe(block);
        });
    }

    // ===== TESTIMONIAL MARQUEE =====
    function initTestimonialMarquee() {
        if (!testimonialContainer) return;
        
        const cards = testimonialContainer.innerHTML;
        testimonialContainer.innerHTML = cards + cards;
        
        testimonialContainer.addEventListener('touchstart', function() {
            this.style.animationPlayState = 'paused';
        });
        
        testimonialContainer.addEventListener('touchend', function() {
            this.style.animationPlayState = 'running';
        });
        
        function adjustMarqueeSpeed() {
            if (window.innerWidth < 640) {
                testimonialContainer.style.animationDuration = '20s';
            } else {
                testimonialContainer.style.animationDuration = '30s';
            }
        }
        
        adjustMarqueeSpeed();
        window.addEventListener('resize', adjustMarqueeSpeed);
    }

    // ===== DROPDOWN IMPROVEMENTS =====
    function initDropdowns() {
        dropdowns.forEach(dropdown => {
            const button = dropdown.querySelector('button');
            const menu = dropdown.querySelector('.absolute');
            
            if (!button || !menu) return;
            
            button.addEventListener('touchstart', function(e) {
                e.preventDefault();
                const isVisible = menu.classList.contains('visible');
                
                dropdowns.forEach(d => {
                    const m = d.querySelector('.absolute');
                    if (m && m !== menu) {
                        m.classList.remove('opacity-100', 'visible');
                        m.classList.add('opacity-0', 'invisible');
                    }
                });
                
                if (isVisible) {
                    menu.classList.remove('opacity-100', 'visible');
                    menu.classList.add('opacity-0', 'invisible');
                } else {
                    menu.classList.remove('opacity-0', 'invisible');
                    menu.classList.add('opacity-100', 'visible');
                }
            });
            
            document.addEventListener('click', function(e) {
                if (!dropdown.contains(e.target)) {
                    menu.classList.remove('opacity-100', 'visible');
                    menu.classList.add('opacity-0', 'invisible');
                }
            });
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ===== IMAGE LOADING STATES =====
    function initImageLoading() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.classList.add('image-loading');
            
            img.addEventListener('load', function() {
                this.classList.remove('image-loading');
            });
            
            img.addEventListener('error', function() {
                this.classList.remove('image-loading');
                this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="%23cccccc"%3E%3Cpath d="M4 4h16v16H4V4z"/%3E%3C/svg%3E';
            });
        });
    }

    // ===== ACTIVE NAVIGATION LINK =====
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // ===== HEADER SCROLL EFFECT =====
    function initHeaderScroll() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            if (!header) return;
            
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                header.classList.add('shadow-md', 'bg-white/95');
            } else {
                header.classList.remove('shadow-md', 'bg-white/95');
            }
            
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // ===== RESPONSIVE HANDLING =====
    function handleResize() {
        let resizeTimer;
        
        window.addEventListener('resize', function() {
            document.body.classList.add('resize-animation-stopper');
            
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                document.body.classList.remove('resize-animation-stopper');
                
                if (window.innerWidth >= 768) {
                    const mobileMenu = document.querySelector('.mobile-menu');
                    if (mobileMenu) {
                        mobileMenu.remove();
                    }
                }
            }, 250);
        });
    }

    // ===== LAZY LOADING FOR IMAGES =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== NEW: SEO-SPECIFIC FEATURES =====
    function initSEOSpecificFeatures() {
        // Add SEO-specific interactions
        const seoBlocks = document.querySelectorAll('.feature-block');
        
        seoBlocks.forEach((block, index) => {
            block.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
            });
            
            block.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Add click tracking for SEO buttons
        const seoButtons = document.querySelectorAll('a[href*="seo"], a[href*="performance"]');
        seoButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                console.log('SEO button clicked:', this.textContent);
                // You can add analytics tracking here
            });
        });
    }

    // ===== NEW: SPEED METER ANIMATIONS =====
    function initSpeedMeters() {
        const speedMeters = document.querySelectorAll('.speed-meter-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate the width
                    const targetWidth = entry.target.getAttribute('data-width') || '95';
                    entry.target.style.width = targetWidth + '%';
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        speedMeters.forEach(meter => {
            observer.observe(meter);
        });
    }

    // ===== NEW: STAT COUNTERS ANIMATION =====
    function initStatCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const targetValue = parseInt(element.getAttribute('data-target') || '100');
                    animateValue(element, 0, targetValue, 2000);
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + (element.getAttribute('data-suffix') || '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // ===== DEBOUNCE FUNCTION =====
    function debounce(func, wait = 100) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    const optimizedScroll = debounce(() => {}, 10);
    window.addEventListener('scroll', optimizedScroll);

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                setTimeout(() => mobileMenu.remove(), 300);
            }
            
            dropdowns.forEach(dropdown => {
                const menu = dropdown.querySelector('.absolute');
                if (menu && menu.classList.contains('visible')) {
                    menu.classList.remove('opacity-100', 'visible');
                    menu.classList.add('opacity-0', 'invisible');
                }
            });
        }
    });

    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.error('Page error:', e.message);
    });

    console.log('DigiPro JavaScript initialized successfully with SEO features');
})();