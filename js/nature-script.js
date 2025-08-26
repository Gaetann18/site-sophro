// ===================================
// NATURE WEBSITE JAVASCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Create floating particles
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random positioning and size
            const size = Math.random() * 10 + 5;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = Math.random() * 10 + 8;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                top: ${top}%;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Initialize particles
    createParticles();
    
    // Smooth scrolling for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Throttle function for performance
    function throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
    
    // Scroll event listeners
    window.addEventListener('scroll', throttle(() => {
        handleNavbarScroll();
        updateActiveNavLink();
        handleParallaxEffects();
    }, 16));
    
    // Parallax effects for hero elements
    function handleParallaxEffects() {
        if (window.innerWidth <= 768) return; // Disable on mobile
        
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.tree-leaves, .birds, .nature-illustration');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // Add staggered animation for cards
                if (entry.target.classList.contains('story-card') || 
                    entry.target.classList.contains('service-card') ||
                    entry.target.classList.contains('pricing-card')) {
                    const cards = entry.target.parentElement.querySelectorAll('.story-card, .service-card, .pricing-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll(`
        .story-card,
        .nature-card,
        .service-card,
        .pricing-card,
        .info-card,
        .contact-form-container,
        .benefit-tag,
        .audience-card
    `);
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.9)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        scrollObserver.observe(el);
    });
    
    // Typing effect for hero title
    function typewriterEffect() {
        const titleWords = document.querySelectorAll('.title-word');
        
        titleWords.forEach((word, index) => {
            setTimeout(() => {
                word.style.opacity = '1';
                word.style.transform = 'translateY(0)';
                
                // Add letter-by-letter effect
                const text = word.textContent;
                word.textContent = '';
                word.style.opacity = '1';
                
                [...text].forEach((letter, letterIndex) => {
                    setTimeout(() => {
                        word.textContent += letter;
                    }, letterIndex * 50);
                });
            }, index * 800);
        });
    }
    
    // Initialize typewriter if on hero section
    if (document.querySelector('.hero-nature')) {
        setTimeout(typewriterEffect, 500);
    }
    
    // Interactive hover effects for cards
    const interactiveCards = document.querySelectorAll(`
        .story-card,
        .service-card,
        .pricing-card,
        .info-card,
        .audience-card
    `);
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 25px 70px rgba(47, 79, 47, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 40px rgba(47, 79, 47, 0.15)';
        });
    });
    
    // Pricing card selection
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            pricingCards.forEach(c => c.classList.remove('selected'));
            // Add selected class to clicked card
            this.classList.add('selected');
            
            // Smooth scroll to contact form
            document.querySelector('#contact').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Form enhancements
    const contactForm = document.querySelector('.contact-form-nature');
    if (contactForm) {
        const formFields = contactForm.querySelectorAll('input, select, textarea');
        
        // Add floating label effect
        formFields.forEach(field => {
            field.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            field.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check if field has value on load
            if (field.value) {
                field.parentElement.classList.add('focused');
            }
        });
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;
            
            // Reset after form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1000);
        });
    }
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-nature');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Animate benefit tags on hover
    const benefitTags = document.querySelectorAll('.benefit-tag');
    benefitTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });
    
    // Parallax for background elements
    function createBackgroundParallax() {
        const parallaxBgs = document.querySelectorAll('.forest-background, .contact-background');
        
        window.addEventListener('scroll', throttle(() => {
            if (window.innerWidth <= 768) return;
            
            const scrolled = window.pageYOffset;
            
            parallaxBgs.forEach((bg, index) => {
                const speed = 0.2 + (index * 0.1);
                const yPos = -(scrolled * speed);
                bg.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        }, 16));
    }
    
    createBackgroundParallax();
    
    // Initialize scroll position
    handleNavbarScroll();
    updateActiveNavLink();
    
    // Lazy load images if any
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    console.log('🌿 Nature Sophrologie Website Loaded Successfully! 🌿');
});

// CSS animations keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .pricing-card.selected {
        border-color: var(--nature-accent) !important;
        box-shadow: 0 25px 70px rgba(244, 164, 96, 0.4) !important;
        transform: translateY(-10px) scale(1.02) !important;
    }
    
    .pricing-card.selected::after {
        content: '✨ Sélectionné';
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--nature-accent);
        color: white;
        padding: 0.5rem 1.5rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        box-shadow: 0 5px 15px rgba(244, 164, 96, 0.4);
    }
    
    .form-field.focused label {
        color: var(--nature-primary);
        font-weight: 600;
        transform: translateY(-2px);
    }
    
    .nav-link:hover i {
        transform: scale(1.2);
        transition: transform 0.3s ease;
    }
    
    .hero-features .feature-item:hover i {
        animation: leafSway 1s ease-in-out;
    }
    
    /* Additional hover effects */
    .story-icon:hover,
    .info-icon:hover {
        animation: leafSway 1s ease-in-out;
        transform: scale(1.1);
    }
    
    .service-icon:hover {
        transform: scale(1.1) rotate(5deg);
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);