// Counter Animation for Statistics
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer to detect when counters are visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Start animation when element is in view
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.count-up');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                // Unobserve after animation has started
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 }); // Start when 25% of the element is visible

    // Observe the about-stats section
    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        observer.observe(aboutStats);
    }

    // Counter animation function
    function animateCounter(counterElement) {
        // Get target values from data attributes
        const start = parseInt(counterElement.getAttribute('data-count-start') || 0);
        const end = parseInt(counterElement.getAttribute('data-count-end') || 0);
        const suffix = counterElement.getAttribute('data-count-suffix') || '';
        const duration = 2000; // Animation duration in milliseconds
        
        // Calculate animation step
        const startTime = performance.now();
        
        // Animation function
        function updateCounter(timestamp) {
            // Calculate progress (0 to 1)
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Calculate current value with easing
            const easedProgress = easeOutQuart(progress);
            const value = Math.floor(start + (end - start) * easedProgress);
            
            // Update the element text
            counterElement.textContent = value + suffix;
            
            // Continue animation if not complete
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        // Easing function for a smoother animation
        function easeOutQuart(x) {
            return 1 - Math.pow(1 - x, 4);
        }
        
        // Start the animation
        requestAnimationFrame(updateCounter);
    }

    // Add hover effects and tooltips for stats
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        // Create a tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'stat-tooltip';
        
        // Set tooltip content based on the stat type
        const statText = item.querySelector('.stat-text').textContent;
        if (statText.includes('Revenue')) {
            tooltip.textContent = 'Increased annual revenue through multi-channel sales approach';
        } else if (statText.includes('Margin')) {
            tooltip.textContent = 'Improved gross margin through strategic pricing optimization';
        } else if (statText.includes('AOV')) {
            tooltip.textContent = 'Increased Average Order Value through product bundling strategies';
        }
        
        // Append tooltip
        item.appendChild(tooltip);
        
        // Show/hide tooltip on hover
        item.addEventListener('mouseenter', () => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(10px)';
        });
    });
});
