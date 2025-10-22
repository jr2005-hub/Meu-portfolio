// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    // Função para lidar com o toggle do menu
    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        
        // Change icon
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    };

    // Adiciona eventos de click e touch
    menuToggle.addEventListener('click', toggleMenu);
    menuToggle.addEventListener('touchend', (e) => {
        e.preventDefault();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking or touching a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const closeMenu = (e) => {
            if (e.type === 'touchend') {
                e.preventDefault();
            }
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            
            if (e.type === 'touchend') {
                const href = link.getAttribute('href');
                if (href) {
                    setTimeout(() => {
                        window.location.href = href;
                    }, 100);
                }
            }
        };

        link.addEventListener('click', closeMenu);
        link.addEventListener('touchend', closeMenu);
    });
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }
}

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');
const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

if (contactForm && submitButton) {
    // Previne duplo envio
    let isSubmitting = false;

    // Feedback visual ao tocar no botão
    submitButton.addEventListener('touchstart', () => {
        submitButton.style.transform = 'scale(0.98)';
    });

    submitButton.addEventListener('touchend', () => {
        submitButton.style.transform = 'scale(1)';
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return;
        isSubmitting = true;
        submitButton.disabled = true;

        // Get form values
        const formData = {
            name: contactForm.name.value,
            email: contactForm.email.value,
            subject: contactForm.subject?.value || '',
            message: contactForm.message.value
        };
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        showToast('Mensagem enviada com sucesso! Entrarei em contato em breve.');
        
        // Reset form
        contactForm.reset();
        
        // Reativa o botão
        setTimeout(() => {
            isSubmitting = false;
            submitButton.disabled = false;
        }, 2000);
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements on page load
document.addEventListener('DOMContentLoaded', () => {
    // Animate skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        fadeInObserver.observe(card);
    });

    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        fadeInObserver.observe(card);
    });

    // Animate stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        fadeInObserver.observe(card);
    });

    // Animate skill bars
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        skillBarObserver.observe(bar);
    });
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 14, 26, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 26, 0.9)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
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

// ============================================
// PROJECT CARD INTERACTIONS
// ============================================
const projectOverlayButtons = document.querySelectorAll('.project-overlay .btn');
projectOverlayButtons.forEach(button => {
    button.addEventListener('click', () => {
        showToast('Funcionalidade em desenvolvimento!');
    });
});

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});