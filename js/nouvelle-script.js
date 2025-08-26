// Nouvelle version - Script pour site sophrologie
// Animation des éléments orbitaux + navigation + scroll effects

document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des composants
    initNavigation();
    initScrollAnimations();
    initOrbitAnimation();
    initFormHandling();
    initSmoothScrolling();
    initJoyfulAnimations();
    
    console.log('🌸✨ Site sophrologie joyeux initialisé ! 🦋🌈');
});

// === Navigation Mobile ===
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    
    // Toggle menu mobile
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animation des barres du hamburger
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    }
    
    // Fermer le menu au clic sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Reset hamburger
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        });
    });
    
    // Effet de la navbar au scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(123, 167, 188, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    }, 100));
}

// === Animation des éléments orbitaux au scroll ===
function initOrbitAnimation() {
    const zenElements = document.querySelector('.zen-elements');
    const elements = document.querySelectorAll('.element');
    
    if (!zenElements || !elements.length) return;
    
    let scrollSpeed = 1;
    let currentRotation = 0;
    
    window.addEventListener('scroll', throttle(() => {
        const scrollY = window.pageYOffset;
        const heroHeight = document.querySelector('.hero-section')?.offsetHeight || 0;
        
        // Calculer la vitesse basée sur le scroll dans la section hero
        if (scrollY < heroHeight) {
            const scrollProgress = scrollY / heroHeight;
            scrollSpeed = 1 + (scrollProgress * 3); // Accélération progressive
            
            // Rotation basée sur le scroll
            currentRotation += scrollSpeed;
            zenElements.style.transform = `rotate(${currentRotation}deg)`;
            
            // Animation individuelle des éléments avec symboles
            elements.forEach((element, index) => {
                const delay = index * 0.5;
                const scale = 1 + Math.sin(currentRotation * 0.02 + delay) * 0.1;
                const elementRotation = -currentRotation; // Counter-rotation pour garder les éléments droits
                
                element.style.transform = `rotate(${elementRotation}deg) scale(${scale})`;
                
                // Appliquer la contre-rotation aux symboles à l'intérieur
                const symbol = element.querySelector('.sophro-symbol');
                if (symbol) {
                    symbol.style.setProperty('--counter-rotation', `${elementRotation}deg`);
                }
            });
        }
    }, 16)); // 60fps
    
    // Animation continue quand pas de scroll
    let animationId;
    let lastScrollTime = Date.now();
    
    function continuousAnimation() {
        const now = Date.now();
        
        // Si pas de scroll récent, continuer l'animation douce
        if (now - lastScrollTime > 100) {
            currentRotation += 0.5;
            zenElements.style.transform = `rotate(${currentRotation}deg)`;
            
            elements.forEach((element, index) => {
                const delay = index * 0.5;
                const scale = 1 + Math.sin(currentRotation * 0.02 + delay) * 0.1;
                const elementRotation = -currentRotation;
                
                element.style.transform = `rotate(${elementRotation}deg) scale(${scale})`;
                
                // Appliquer la contre-rotation aux symboles à l'intérieur
                const symbol = element.querySelector('.sophro-symbol');
                if (symbol) {
                    symbol.style.setProperty('--counter-rotation', `${elementRotation}deg`);
                }
            });
        }
        
        animationId = requestAnimationFrame(continuousAnimation);
    }
    
    continuousAnimation();
    
    // Mettre à jour le temps du dernier scroll
    window.addEventListener('scroll', () => {
        lastScrollTime = Date.now();
    });
}

// === Animations au scroll avec Intersection Observer ===
function initScrollAnimations() {
    // Options pour l'observer
    const observerOptions = {
        root: null,
        rootMargin: '-50px 0px',
        threshold: 0.1
    };
    
    // Créer l'observer principal
    const mainObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animation en cascade pour les grilles
                if (entry.target.classList.contains('who-grid') ||
                    entry.target.classList.contains('benefits-grid') ||
                    entry.target.classList.contains('pricing-forest')) {
                    
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '1';
                            child.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const elementsToAnimate = document.querySelectorAll(
        '.sophro-content, .who-grid, .accomp-content, .pricing-forest, .contact-container'
    );
    
    elementsToAnimate.forEach(element => {
        // Préparation de l'animation - contenu visible par défaut
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0.0, 0.2, 1)';
        
        mainObserver.observe(element);
    });
    
    // Observer spécial pour les cartes individuelles
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, { threshold: 0.2 });
    
    // Préparer et observer les cartes - visibles par défaut
    const cards = document.querySelectorAll('.who-card, .benefit-card, .pricing-card');
    cards.forEach((card, index) => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) ${index * 0.1}s`;
        
        cardObserver.observe(card);
    });
    
    // Animation des sections avec parallax léger
    window.addEventListener('scroll', throttle(() => {
        const scrollY = window.pageYOffset;
        
        // Parallax pour les backgrounds
        const forestBg = document.querySelector('.forest-background');
        const contactBg = document.querySelector('.contact-background');
        
        if (forestBg) {
            forestBg.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
        
        if (contactBg) {
            contactBg.style.transform = `translateY(${scrollY * 0.2}px)`;
        }
        
        // Animation du scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            const opacity = Math.max(0, 1 - (scrollY / 300));
            scrollIndicator.style.opacity = opacity;
            scrollIndicator.style.transform = `translateX(-50%) translateY(${scrollY * 0.5}px)`;
        }
    }, 16));
}

// === Gestion du formulaire ===
function initFormHandling() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    // Effets au focus des champs
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transform = 'translateY(-2px) scale(1.01)';
            this.style.boxShadow = '0 8px 25px rgba(123, 167, 188, 0.2)';
        });
        
        input.addEventListener('blur', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
        
        // Animation de saisie
        input.addEventListener('input', function() {
            this.style.animation = 'inputPulse 0.3s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
    
    // Soumission du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Animation de soumission
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.style.animation = 'buttonPulse 1s infinite';
        submitBtn.disabled = true;
        
        // Créer des particules de succès
        createSubmitParticles(submitBtn);
        
        // Simuler l'envoi (remplacer par vraie soumission)
        setTimeout(() => {
            submitBtn.textContent = 'Message envoyé !';
            submitBtn.style.animation = '';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #8BC34A)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                form.reset();
            }, 3000);
        }, 2000);
    });
}

// === Particules de succès ===
function createSubmitParticles(button) {
    const rect = button.getBoundingClientRect();
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            width: 8px;
            height: 8px;
            background: linear-gradient(135deg, var(--primary-blue), var(--secondary-blue));
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = 80 + Math.random() * 80;
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
            duration: 1200,
            easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
        }).onfinish = () => particle.remove();
    }
}

// === Navigation fluide ===
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                // Smooth scroll avec easing personnalisé
                smoothScrollTo(offsetTop, 1000);
                
                // Effet de highlight sur la cible
                targetElement.style.animation = 'targetHighlight 2s ease-out';
                setTimeout(() => {
                    targetElement.style.animation = '';
                }, 2000);
            }
        });
    });
}

// Fonction de scroll fluide personnalisée
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function (ease-in-out-cubic)
        const ease = progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// === Utilitaire throttle ===
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

// === Ajout des animations CSS via JS ===
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes animate-in {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes inputPulse {
        0% { transform: translateY(-2px) scale(1.01); }
        50% { transform: translateY(-3px) scale(1.02); }
        100% { transform: translateY(-2px) scale(1.01); }
    }
    
    @keyframes buttonPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes targetHighlight {
        0% { box-shadow: 0 0 0 rgba(123, 167, 188, 0); }
        50% { box-shadow: 0 0 30px rgba(123, 167, 188, 0.4); }
        100% { box-shadow: 0 0 0 rgba(123, 167, 188, 0); }
    }
    
    /* Curseur personnalisé pour l'effet premium */
    body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(123, 167, 188, 0.4), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
`;

document.head.appendChild(additionalStyles);

// === Curseur personnalisé ===
document.addEventListener('mousemove', throttle((e) => {
    const cursor = document.body;
    cursor.style.setProperty('--cursor-x', e.clientX - 10 + 'px');
    cursor.style.setProperty('--cursor-y', e.clientY - 10 + 'px');
}, 16));

// === Gestion des performances ===
// Réduire les animations sur les appareils moins puissants
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--transition-base', 'all 0.2s ease');
    
    // Désactiver certaines animations coûteuses
    const heavyAnimations = document.querySelectorAll('.zen-elements');
    heavyAnimations.forEach(element => {
        element.style.animationDuration = '30s'; // Ralentir l'animation
    });
}

// === Gestion de la visibilité de la page ===
document.addEventListener('visibilitychange', function() {
    const zenElements = document.querySelector('.zen-elements');
    if (document.hidden) {
        // Pause des animations quand la page n'est pas visible
        if (zenElements) {
            zenElements.style.animationPlayState = 'paused';
        }
    } else {
        // Reprise des animations
        if (zenElements) {
            zenElements.style.animationPlayState = 'running';
        }
    }
});

// === Animations Joyeuses ===
function initJoyfulAnimations() {
    // Animation des cartes au survol
    const whoCards = document.querySelectorAll('.who-card');
    whoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animation = 'none';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.animation = 'cardBounce 4s ease-in-out infinite';
        });
    });
    
    // Animation des titres au clic
    const titles = document.querySelectorAll('.section-title');
    titles.forEach(title => {
        title.addEventListener('click', () => {
            title.style.animation = 'none';
            setTimeout(() => {
                title.style.animation = 'titleDance 3s ease-in-out infinite alternate';
            }, 100);
            createTitleSparkles(title);
        });
    });
    
    // Animation joyeuse des icônes au clic
    const icons = document.querySelectorAll('.who-icon, .benefit-icon, .pricing-icon');
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            icon.style.transform = 'scale(1.5) rotate(360deg)';
            setTimeout(() => {
                icon.style.transform = '';
            }, 600);
            createIconBurst(icon);
        });
    });
}


// === Étincelles pour les titres ===
function createTitleSparkles(title) {
    const rect = title.getBoundingClientRect();
    const sparkles = ['✨', '🌟', '💫'];
    
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.cssText = `
            position: fixed;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            font-size: 1.2rem;
            pointer-events: none;
            z-index: 1000;
            animation: sparkleBurst 1.5s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }
}

// === Explosion d'icônes ===
function createIconBurst(icon) {
    const rect = icon.getBoundingClientRect();
    const burstEmojis = ['💥', '✨', '🎉', '🌟'];
    
    for (let i = 0; i < 6; i++) {
        const burst = document.createElement('div');
        burst.textContent = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
        burst.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width/2}px;
            top: ${rect.top + rect.height/2}px;
            font-size: 1.3rem;
            pointer-events: none;
            z-index: 1000;
            animation: iconBurstAnim 1s ease-out forwards;
        `;
        
        const angle = (i / 6) * Math.PI * 2;
        const distance = 50;
        burst.style.setProperty('--end-x', Math.cos(angle) * distance + 'px');
        burst.style.setProperty('--end-y', Math.sin(angle) * distance + 'px');
        
        document.body.appendChild(burst);
        
        setTimeout(() => {
            burst.remove();
        }, 1000);
    }
}

// Ajouter les nouvelles animations CSS
const joyfulStyles = document.createElement('style');
joyfulStyles.textContent = `
    @keyframes sparkleBurst {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(1.2);
            opacity: 1;
        }
        100% {
            transform: scale(2) translateY(-30px);
            opacity: 0;
        }
    }
    
    @keyframes iconBurstAnim {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--end-x), var(--end-y)) scale(0);
            opacity: 0;
        }
    }
`;

document.head.appendChild(joyfulStyles);

console.log('🎉✨ Animations avancées et joyeuses initialisées ! 🌈🦋');