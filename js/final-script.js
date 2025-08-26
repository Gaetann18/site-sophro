// Final Script - Human-Centered Sophrologie Website
// Organic animations with smooth, natural movements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initOrganicAnimations();
    initFormHandling();
    initSmoothScrolling();
    initAnimatedDividers();
    
    console.log('✨ Site sophrologie initialisé avec succès');
});

// Navigation handling
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger lines
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    }
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(123, 167, 188, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    }, 100));
}

// Scroll animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '-50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Add staggered animation for cards
                if (entry.target.classList.contains('content-card') || 
                    entry.target.classList.contains('step-card') ||
                    entry.target.classList.contains('pricing-card')) {
                    
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .content-card, .step-card, .pricing-card').forEach(el => {
        observer.observe(el);
    });
}

// Organic animations inspired by nature
function initOrganicAnimations() {
    // Breathing effect for hero section
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.classList.add('breathe');
    }
    
    // Gentle sway for decorative elements
    document.querySelectorAll('.feather-icon, .section-title').forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.animation = 'gentle-sway 2s ease-in-out infinite';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.animation = '';
        });
    });
    
    // Floating particles effect for hero background
    createFloatingParticles();
    
    // Organic hover effects for cards
    document.querySelectorAll('.content-card, .step-card, .pricing-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(1deg)';
            this.style.transition = 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.transition = 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)';
        });
    });
}

// Create floating particles for organic feel
function createFloatingParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const particleCount = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(123, 167, 188, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 15}s infinite linear;
            pointer-events: none;
        `;
        
        heroSection.appendChild(particle);
    }
    
    // Add floating animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) translateX(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize animated dividers
function initAnimatedDividers() {
    const dividerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const line = entry.target.querySelector('.divider-line');
                const feather = entry.target.querySelector('.divider-feather');
                
                if (line && feather) {
                    // Reset animations
                    line.style.animation = 'none';
                    feather.style.animation = 'none';
                    
                    // Trigger animations
                    setTimeout(() => {
                        line.style.animation = 'drawLine 2s cubic-bezier(0.4, 0.0, 0.2, 1) forwards';
                        feather.style.animation = 'featherFloat 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1s forwards';
                    }, 100);
                }
                
                // Unobserve after animation
                dividerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.animated-divider').forEach(divider => {
        dividerObserver.observe(divider);
    });
}

// Form handling with organic feedback
function initFormHandling() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Add organic focus effects
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.style.transform = 'translateY(-2px)';
            this.parentNode.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.style.transform = '';
        });
        
        // Organic typing animation
        input.addEventListener('input', function() {
            this.style.animation = 'gentle-pulse 0.3s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
    
    // Form submission with organic feedback
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Organic loading animation
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.style.animation = 'breathe 1s ease-in-out infinite';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            submitBtn.textContent = 'Message envoyé !';
            submitBtn.style.animation = '';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #8BC34A)';
            
            // Create success particles
            createSuccessParticles(submitBtn);
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                form.reset();
            }, 3000);
        }, 2000);
    });
}

// Create success particles animation
function createSuccessParticles(element) {
    const rect = element.getBoundingClientRect();
    const particles = 12;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            width: 6px;
            height: 6px;
            background: #4CAF50;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / particles) * Math.PI * 2;
        const velocity = 100 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${vx}px, ${vy}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
        }).onfinish = () => particle.remove();
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Add organic highlight effect to target
                targetElement.style.animation = 'gentle-glow 2s ease-out';
                setTimeout(() => {
                    targetElement.style.animation = '';
                }, 2000);
            }
        });
    });
}

// Utility function for throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add gentle glow animation
const glowStyle = document.createElement('style');
glowStyle.textContent = `
    @keyframes gentle-glow {
        0% { box-shadow: 0 0 0 rgba(123, 167, 188, 0); }
        50% { box-shadow: 0 0 30px rgba(123, 167, 188, 0.3); }
        100% { box-shadow: 0 0 0 rgba(123, 167, 188, 0); }
    }
    
    @keyframes gentle-pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(glowStyle);

// Add organic mouse follow effect
document.addEventListener('mousemove', throttle((e) => {
    const cursor = document.querySelector('.organic-cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'organic-cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(123, 167, 188, 0.3), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease-out;
        `;
        document.body.appendChild(newCursor);
        
        newCursor.style.left = e.clientX - 10 + 'px';
        newCursor.style.top = e.clientY - 10 + 'px';
    } else {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    }
}, 50));

// Performance optimization: Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--ease-smooth', 'ease');
    document.documentElement.style.setProperty('--ease-bounce', 'ease-out');
    
    // Reduce particle count
    const particles = document.querySelectorAll('.floating-particle');
    particles.forEach((particle, index) => {
        if (index % 2 === 0) particle.remove();
    });
}

console.log('🌿 Animations organiques initialisées pour une expérience apaisante');