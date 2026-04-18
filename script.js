// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('bg-luxury-dark', 'shadow-lg');
    } else {
        navbar.classList.remove('bg-luxury-dark', 'shadow-lg');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate-fade-in-up');
                entry.target.style.opacity = '1';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all reveal elements
const revealElements = document.querySelectorAll('.reveal-element');
revealElements.forEach(el => observer.observe(el));

// Hero animations using Motion (Framer Motion)
document.addEventListener('DOMContentLoaded', () => {
    // Check if Motion is loaded
    if (typeof Motion !== 'undefined') {
        // Hero title animation
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle) {
            Motion.animate(heroTitle, 
                { opacity: [0, 1], y: [50, 0] },
                { duration: 1, delay: 0.2, easing: [0.16, 1, 0.3, 1] }
            );
        }

        // Hero subtitle animation
        const heroSubtitle = document.getElementById('hero-subtitle');
        if (heroSubtitle) {
            Motion.animate(heroSubtitle,
                { opacity: [0, 1], y: [50, 0] },
                { duration: 1, delay: 0.4, easing: [0.16, 1, 0.3, 1] }
            );
        }

        // Hero buttons animation
        const heroButtons = document.getElementById('hero-buttons');
        if (heroButtons) {
            Motion.animate(heroButtons,
                { opacity: [0, 1], y: [50, 0] },
                { duration: 1, delay: 0.6, easing: [0.16, 1, 0.3, 1] }
            );
        }

        // Animate project cards on hover (projetos only — serviços uses .group on slides too)
        const projectCards = document.querySelectorAll('#projetos .project-scroll-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                Motion.animate(card,
                    { scale: 1.02 },
                    { duration: 0.3, easing: 'easeOut' }
                );
            });

            card.addEventListener('mouseleave', () => {
                Motion.animate(card,
                    { scale: 1 },
                    { duration: 0.3, easing: 'easeOut' }
                );
            });
        });

        // Number counter animation
        const counters = document.querySelectorAll('.text-4xl.font-bold.text-gold');
        const observerForCounters = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent;
                    const number = parseInt(text);
                    
                    if (!isNaN(number)) {
                        let current = 0;
                        const increment = number / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= number) {
                                target.textContent = text;
                                clearInterval(timer);
                            } else {
                                target.textContent = Math.floor(current) + (text.includes('+') ? '+' : '') + (text.includes('%') ? '%' : '');
                            }
                        }, 30);
                    }
                    observerForCounters.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observerForCounters.observe(counter));
    }
});

// Form submission handler
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message (you can customize this)
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        
        // Reset form
        contactForm.reset();
    });
}

// Add cursor effect for interactive elements
const interactiveElements = document.querySelectorAll('button, a, .hover-lift');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.style.cursor = 'pointer';
    });
    
    el.addEventListener('mouseleave', () => {
        document.body.style.cursor = 'default';
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #c9a961, #a88b4f);
        z-index: 9999;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// Add floating animation to certain elements
const floatingElements = document.querySelectorAll('.glass-effect');
floatingElements.forEach((el, index) => {
    if (typeof Motion !== 'undefined') {
        Motion.animate(el,
            { y: [0, -10, 0] },
            { 
                duration: 3,
                delay: index * 0.2,
                repeat: Infinity,
                easing: 'easeInOut'
            }
        );
    }
});

// Enhanced scroll animations for different sections
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.reveal-element');
    
    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
        
        if (isVisible && !element.classList.contains('animated')) {
            element.classList.add('animated');
            
            if (typeof Motion !== 'undefined') {
                // Determine animation type based on element position
                const animationType = index % 3;
                
                switch(animationType) {
                    case 0:
                        Motion.animate(element,
                            { opacity: [0, 1], x: [-50, 0] },
                            { duration: 0.8, delay: index * 0.05, easing: [0.16, 1, 0.3, 1] }
                        );
                        break;
                    case 1:
                        Motion.animate(element,
                            { opacity: [0, 1], y: [50, 0] },
                            { duration: 0.8, delay: index * 0.05, easing: [0.16, 1, 0.3, 1] }
                        );
                        break;
                    case 2:
                        Motion.animate(element,
                            { opacity: [0, 1], scale: [0.9, 1] },
                            { duration: 0.8, delay: index * 0.05, easing: [0.16, 1, 0.3, 1] }
                        );
                        break;
                }
            }
        }
    });
};

// Call animation function on scroll
let animationTicking = false;
window.addEventListener('scroll', () => {
    if (!animationTicking) {
        window.requestAnimationFrame(() => {
            animateOnScroll();
            animationTicking = false;
        });
        animationTicking = true;
    }
});

// Initial call to animate elements already in view
animateOnScroll();

/**
 * Motion-style scroll-linked effects (vanilla equivalent of useScroll + useTransform
 * from https://motion.dev/docs/react-scroll-animations )
 */
(function initMotionStyleScroll() {
    const clamp01 = (v) => Math.min(1, Math.max(0, v));

    /** Map t in [0,1] to [outA, outB] — like useTransform(scrollYProgress, [0,1], [...]) */
    const mix = (t, a, b) => a + (b - a) * clamp01(t);

    /** Hero: scroll position → filter blur (Transform scroll position to any value) */
    function updateHeroScrollLinked() {
        const hero = document.getElementById('inicio');
        const layer = document.getElementById('hero-bg-parallax');
        const img = document.getElementById('hero-bg-img');
        if (!hero || !layer || !img) return;

        const scrollY = window.scrollY;
        const denom = Math.max(hero.offsetHeight * 0.9, 1);
        const p = clamp01(scrollY / denom);
        const blurPx = mix(p, 0, 10);
        layer.style.filter = `blur(${blurPx}px)`;

        const offset = scrollY * 0.35;
        img.style.transform = `translateY(${offset}px) scale(1.05)`;
    }

    /**
     * Projetos: clip-path reveal — like useScroll({ target, offset: ['start end','center center'] })
     */
    function projectRevealProgress(rect) {
        const vh = window.innerHeight;
        const denom = vh / 2 + rect.height / 2;
        return clamp01((vh - rect.top) / denom);
    }

    function updateProjectImageReveal() {
        document.querySelectorAll('.project-clip-reveal').forEach((el) => {
            const rect = el.getBoundingClientRect();
            const p = projectRevealProgress(rect);
            const insetPct = mix(p, 50, 0);
            el.style.clipPath = `inset(0% ${insetPct}% 0% ${insetPct}%)`;
        });
    }

    /** Serviços: horizontal section — scrollYProgress → translateX */
    function updateServicosHorizontalScroll() {
        const root = document.getElementById('servicos-scroll-root');
        const track = document.getElementById('servicos-track');
        if (!root || !track) return;

        const rect = root.getBoundingClientRect();
        const travel = rect.height - window.innerHeight;
        if (travel <= 0) return;

        const p = clamp01(-rect.top / travel);
        const viewportW = track.parentElement?.clientWidth ?? window.innerWidth;
        const maxShift = Math.max(0, track.scrollWidth - viewportW + 32);
        const x = -p * maxShift;
        track.style.transform = `translate3d(${x}px, 0, 0)`;
    }

    let scrollTicking = false;
    function onScrollLinkedFrame() {
        updateHeroScrollLinked();
        updateProjectImageReveal();
        updateServicosHorizontalScroll();
        scrollTicking = false;
    }

    function requestScrollLinkedUpdate() {
        if (!scrollTicking) {
            scrollTicking = true;
            requestAnimationFrame(onScrollLinkedFrame);
        }
    }

    window.addEventListener('scroll', requestScrollLinkedUpdate, { passive: true });
    window.addEventListener('resize', requestScrollLinkedUpdate);
    window.addEventListener('load', requestScrollLinkedUpdate);

    const track = document.getElementById('servicos-track');
    if (track && typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(requestScrollLinkedUpdate);
        ro.observe(track);
    }

    document.addEventListener('DOMContentLoaded', requestScrollLinkedUpdate);
})();

console.log('🎨 Arboreto - Website carregado com sucesso!');
