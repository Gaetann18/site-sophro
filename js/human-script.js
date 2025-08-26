// ===================================
// HUMAN-CENTERED WEBSITE JAVASCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Create floating elements inspired by human connection
    function createFloatingElements() {
        const container = document.getElementById('floatingElements');
        const elements = [
            { emoji: '💙', size: 15, speed: 12 },
            { emoji: '🌟', size: 12, speed: 15 },
            { emoji: '✨', size: 10, speed: 18 },
            { emoji: '🦋', size: 14, speed: 14 },
            { emoji: '🌸', size: 11, speed: 16 },
            { emoji: '💫', size: 13, speed: 13 },
            { emoji: '🕊️', size: 16, speed: 11 },
            { emoji: '🌙', size: 12, speed: 17 }
        ];
        
        elements.forEach((element, index) => {
            const floating = document.createElement('div');
            floating.className = 'floating-element';
            floating.textContent = element.emoji;
            
            // Random positioning
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = element.speed + Math.random() * 5;
            const delay = Math.random() * 3;
            
            floating.style.cssText = `
                font-size: ${element.size}px;
                left: ${left}%;
                top: ${top}%;
                animation: humanFloat ${duration}s ease-in-out infinite;
                animation-delay: ${delay}s;
                position: absolute;
                pointer-events: none;
                z-index: -1;
                user-select: none;
            `;
            
            container.appendChild(floating);
        });
        
        // Add some subtle background shapes
        for (let i = 0; i < 5; i++) {
            const shape = document.createElement('div');
            shape.className = 'floating-element';
            
            const size = Math.random() * 30 + 20;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = Math.random() * 15 + 20;
            const delay = Math.random() * 5;
            
            shape.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                top: ${top}%;
                background: linear-gradient(135deg, 
                    rgba(123, 167, 188, 0.1) 0%, 
                    rgba(168, 200, 225, 0.15) 100%
                );
                border-radius: 50%;
                animation: humanFloat ${duration}s ease-in-out infinite;
                animation-delay: ${delay}s;
                position: absolute;
                pointer-events: none;
                z-index: -1;
            `;
            
            container.appendChild(shape);
        }
    }
    
    // Initialize floating elements
    createFloatingElements();
    
    // Enhanced smooth scrolling with human touch
    function smoothScrollTo(targetElement, offset = 80) {
        const targetPosition = targetElement.offsetTop - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = Math.min(Math.abs(distance) * 0.8, 1200); // Adaptive duration
        let start = null;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Smooth easing function for human-like movement
            const easeInOutCubic = progress < 0.5 
                ? 4 * progress * progress * progress 
                : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
            
            window.scrollTo(0, startPosition + distance * easeInOutCubic);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    // Navigation with smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                smoothScrollTo(targetSection);
                
                // Close mobile menu with gentle animation
                if (navMenu.classList.contains('active')) {
                    navMenu.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Mobile menu toggle with human touch
    navToggle.addEventListener('click', function() {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            navMenu.style.transform = 'translateX(-100%)';
            setTimeout(() => {
                navMenu.classList.remove('active');
                navMenu.style.transform = '';
            }, 300);
        } else {
            navMenu.classList.add('active');
            navMenu.style.transform = 'translateX(0)';
        }
        
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                navMenu.style.transition = 'all 0.4s ease';
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
    
    // Navbar scroll effect with human responsiveness
    function handleNavbarScroll() {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Subtle parallax for navbar brand
        const brandIcon = document.querySelector('.brand-icon');
        if (brandIcon && scrolled < 500) {
            const translateY = scrolled * 0.1;
            brandIcon.style.transform = `translateY(${translateY}px) rotate(${scrolled * 0.1}deg)`;
        }
    }
    
    // Update active navigation link with smooth transitions
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 150;
        
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
    
    // Organic parallax effects
    function handleParallaxEffects() {
        if (window.innerWidth <= 768) return; // Disable on mobile for performance
        
        const scrolled = window.pageYOffset;
        
        // Hero background parallax
        const heroBackground = document.querySelector('.background-image');
        if (heroBackground && scrolled < window.innerHeight) {
            const speed = 0.5;
            const yPos = scrolled * speed;
            heroBackground.style.transform = `translate3d(0, ${yPos}px, 0) scale(1.02)`;
        }
        
        // Floating elements enhanced movement
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((el, index) => {
            const speed = 0.1 + (index * 0.05);
            const direction = index % 2 === 0 ? 1 : -1;
            const yPos = scrolled * speed * direction;
            const rotate = scrolled * 0.05 * direction;
            el.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotate}deg)`;
        });
    }
    
    // Intersection Observer for organic animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const organicObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered animation for human feel
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                    
                    // Add organic entrance animation
                    entry.target.style.animation = 'organicEntrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                    
                    // Special effects for cards
                    if (entry.target.classList.contains('text-block') || 
                        entry.target.classList.contains('audience-card') ||
                        entry.target.classList.contains('pricing-card')) {
                        
                        // Add floating animation after entrance
                        setTimeout(() => {
                            entry.target.style.animation += ', organicFloat 6s ease-in-out infinite';
                        }, 800);
                    }
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Elements to animate organically
    const animateElements = document.querySelectorAll(`
        .text-block,
        .audience-card,
        .program-section,
        .pricing-card,
        .contact-item,
        .contact-form-container,
        .value-item,
        .step-item
    `);
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px) scale(0.95) rotate(-2deg)';
        el.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        organicObserver.observe(el);
    });
    
    // Interactive hover effects with human personality
    const interactiveElements = document.querySelectorAll(`
        .text-block,
        .audience-card,
        .pricing-card,
        .program-section,
        .value-item,
        .contact-item
    `);
    
    interactiveElements.forEach(element => {
        let hoverTimeout;
        
        element.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            this.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            this.style.transform = 'translateY(-8px) scale(1.02) rotate(1deg)';
            this.style.boxShadow = '0 20px 60px rgba(123, 167, 188, 0.25)';
            
            // Add subtle glow effect
            this.style.border = '2px solid rgba(123, 167, 188, 0.3)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            this.style.boxShadow = '0 8px 35px rgba(107, 115, 160, 0.15)';
            this.style.border = '2px solid transparent';
        });
    });
    
    // Human-centered form interactions
    const form = document.querySelector('.contact-form');
    if (form) {
        const formFields = form.querySelectorAll('input, textarea');
        
        formFields.forEach(field => {
            // Organic focus animation
            field.addEventListener('focus', function() {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 0 0 4px rgba(123, 167, 188, 0.2)';
                this.parentElement.classList.add('focused');
            });
            
            field.addEventListener('blur', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '';
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Typing animation
            field.addEventListener('input', function() {
                this.style.borderColor = 'var(--human-primary)';
                setTimeout(() => {
                    this.style.borderColor = '';
                }, 200);
            });
        });
        
        // Form submission with human feedback
        form.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('.btn-human');
            const originalText = submitBtn.innerHTML;
            
            // Organic loading animation
            submitBtn.innerHTML = '<i class="fas fa-heart heartbeat"></i> Envoi avec amour...';
            submitBtn.style.background = 'var(--human-warm-gradient)';
            submitBtn.disabled = true;
            
            // Human-like response timing
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message reçu avec gratitude !';
                submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #66BB6A)';
                
                // Reset with gentle transition
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
    
    // Pricing cards with human selection
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selection from all cards
            pricingCards.forEach(c => {
                c.classList.remove('selected');
                c.style.transform = '';
            });
            
            // Add selection with organic animation
            this.classList.add('selected');
            this.style.transform = 'translateY(-10px) scale(1.03) rotate(1deg)';
            this.style.boxShadow = '0 25px 70px rgba(123, 167, 188, 0.4)';
            this.style.border = '3px solid var(--human-primary)';
            
            // Gentle scroll to contact
            setTimeout(() => {
                const contactSection = document.querySelector('#contact');
                smoothScrollTo(contactSection);
            }, 500);
        });
    });
    
    // Add ripple effect to buttons with human touch
    const buttons = document.querySelectorAll('.btn-human');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create organic ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 1.5;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: organicRipple 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                pointer-events: none;
                z-index: 10;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });
    
    // Breathing animation for important elements
    const breathingElements = document.querySelectorAll('.section-icon, .brand-icon i, .contact-icon i');
    breathingElements.forEach((element, index) => {
        element.style.animation = `breathe 4s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Initialize scroll position and effects
    handleNavbarScroll();
    updateActiveNavLink();
    handleParallaxEffects();
    
    console.log('💙 Site Sophrologie Humain chargé avec bienveillance ! 💙');
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes organicEntrance {
        0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9) rotate(-3deg);
        }
        50% {
            opacity: 0.8;
            transform: translateY(-5px) scale(1.02) rotate(1deg);
        }
        100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
        }
    }
    
    @keyframes organicFloat {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
        }
        25% {
            transform: translateY(-3px) rotate(0.5deg);
        }
        50% {
            transform: translateY(0) rotate(0deg);
        }
        75% {
            transform: translateY(-2px) rotate(-0.3deg);
        }
    }
    
    @keyframes organicRipple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(0.5);
            opacity: 0.5;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    @keyframes breathe {
        0%, 100% {
            transform: scale(1);
            opacity: 0.8;
        }
        50% {
            transform: scale(1.05);
            opacity: 1;
        }
    }
    
    /* Enhanced selection state */
    .pricing-card.selected::after {
        content: '💙 Choix du cœur';
        position: absolute;
        bottom: -15px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--human-primary);
        color: white;
        padding: 0.5rem 1.5rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
        box-shadow: 0 5px 20px rgba(123, 167, 188, 0.4);
        animation: gentleBounce 2s ease-in-out infinite;
    }
    
    @keyframes gentleBounce {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(-2px); }
    }
    
    /* Focus states for accessibility */
    .form-group.focused label {
        color: var(--human-primary);
        transform: translateY(-2px) scale(1.05);
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    /* Human touch micro-interactions */
    .nav-link:hover i {
        animation: gentleBounce 1s ease-in-out;
    }
    
    .value-item:hover .value-icon {
        animation: spin 2s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);