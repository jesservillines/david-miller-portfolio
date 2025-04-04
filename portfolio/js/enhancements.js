// Enhanced Design Elements for David Miller's Portfolio
// =================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initScrollAnimations();
    
    // Add hero section parallax effect
    initParallaxEffect();
    
    // Initialize enhanced modal animations
    enhanceModalAnimations();
});

// 1. SCROLL ANIMATIONS
// =================================================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Initial check for elements in viewport
    checkElementsInViewport();
    
    // Check again when scrolling
    window.addEventListener('scroll', function() {
        checkElementsInViewport();
    });
    
    function checkElementsInViewport() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const offset = 100; // Start animation earlier
            
            // If element is in viewport
            if (elementPosition.top < window.innerHeight - offset) {
                // Add a delay based on the element's position in the DOM
                // This creates a nice staggered animation effect
                const siblings = Array.from(element.parentNode.children);
                const index = siblings.indexOf(element);
                const delay = index * 0.1; // 100ms delay between siblings
                
                element.style.animationDelay = `${delay}s`;
                element.classList.add('animated');
            }
        });
    }
}

// 2. PARALLAX EFFECT
// =================================================================
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            const parallaxOffset = scrollPosition * 0.4;
            heroSection.style.backgroundPositionY = `-${parallaxOffset}px`;
        }
    });
}

// 3. ENHANCED MODAL ANIMATIONS
// =================================================================
function enhanceModalAnimations() {
    const projectBtns = document.querySelectorAll('.project-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');
    
    projectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const modal = document.getElementById(`${projectId}Modal`);
            
            if (modal) {
                document.body.classList.add('no-scroll');
                modal.style.display = 'flex';
                
                // Delay to allow display change to take effect before adding active class
                setTimeout(() => {
                    modal.classList.add('active');
                }, 10);
            }
        });
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            
            modal.classList.remove('active');
            
            // Wait for animation to complete before hiding
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }, 400);
        });
    });
    
    // Close modal if clicking outside the content
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                modal.classList.remove('active');
                
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.classList.remove('no-scroll');
                }, 400);
            }
        });
    });
}

// 4. SKILL BAR ANIMATION
// =================================================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-level');
    
    skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-level');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = percentage;
        }, 200);
    });
}

// Trigger skill bar animation when skills section is visible
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(skillsSection);
}

// 5. ENHANCED TIMELINE ANIMATIONS
// =================================================================
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    item.style.transition = 'all 0.5s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 150); // Staggered animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(item);
});
