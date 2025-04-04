// Advanced Visual Storytelling Elements
// =================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all visual storytelling components
    initSimpleTimeline();
    initMetricsCards();
    initRelationshipDiagram();
});

// 1. SIMPLE TIMELINE
// =================================================================
function initSimpleTimeline() {
    const timelineNodes = document.querySelectorAll('.timeline-node');
    const prevBtn = document.getElementById('timelinePrev');
    const nextBtn = document.getElementById('timelineNext');
    const timelineContainer = document.querySelector('.timeline-container');
    const infoCard = document.querySelector('.info-card');
    
    if (!timelineContainer || timelineNodes.length === 0) return;
    
    // Ensure 2025 node is active by default
    const node2025 = document.getElementById('node-2025');
    
    // Timeline data with years
    const nodeYears = ['2017', '2019', '2021', '2023', '2025'];
    let currentNodeIndex = 4; // Default to 2025 (last position)
    
    // Add touch swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    timelineContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    timelineContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance required for a swipe
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - go to next (newer) item
            if (currentNodeIndex < nodeYears.length - 1) {
                currentNodeIndex++;
                activateNode(nodeYears[currentNodeIndex]);
            }
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - go to previous (older) item
            if (currentNodeIndex > 0) {
                currentNodeIndex--;
                activateNode(nodeYears[currentNodeIndex]);
            }
        }
    }
    
    // For keyboard navigation
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') {
            if (currentNodeIndex > 0) {
                currentNodeIndex--;
                activateNode(nodeYears[currentNodeIndex]);
            }
        } else if (e.key === 'ArrowRight') {
            if (currentNodeIndex < nodeYears.length - 1) {
                currentNodeIndex++;
                activateNode(nodeYears[currentNodeIndex]);
            }
        }
    });
    
    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', function() {
        if (currentNodeIndex > 0) {
            currentNodeIndex--;
            activateNode(nodeYears[currentNodeIndex]);
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentNodeIndex < nodeYears.length - 1) {
            currentNodeIndex++;
            activateNode(nodeYears[currentNodeIndex]);
        }
    });
    
    // Initialize with 2025 active
    activateNode('2025');
    
    // Event listeners for node clicks
    timelineNodes.forEach((node) => {
        node.addEventListener('click', function() {
            const year = node.id.split('-')[1];
            activateNode(year);
        });
    });
    
    // Function to activate a node and update the info card
    function activateNode(year) {
        // Find the index of the year
        const index = nodeYears.indexOf(year);
        if (index === -1) return;
        
        // Update current index
        currentNodeIndex = index;
        
        // Remove active class from all nodes
        timelineNodes.forEach(node => node.classList.remove('active'));
        
        // Add active class to selected node
        const activeNode = document.getElementById(`node-${year}`);
        if (activeNode) activeNode.classList.add('active');
        
        // Update info card content
        updateInfoCard(year);
        
        // Update navigation buttons
        updateNavigationButtons();
    }
    
    // Define the function to update the info card content
    function updateInfoCard(year) {
        // Get content from hidden elements
        const contentElement = document.getElementById(`content-${year}`);
        if (!contentElement) return;
        
        // Update the info card with content from the hidden element
        const title = contentElement.querySelector('h3').textContent;
        const subtitle = contentElement.querySelector('h4').textContent;
        const description = contentElement.querySelector('p').textContent;
        
        // Update the visible info card
        infoCard.querySelector('.info-card-title').textContent = title;
        infoCard.querySelector('.info-card-subtitle').textContent = subtitle;
        infoCard.querySelector('.info-card-description').textContent = description;
        
        // Update card ID
        infoCard.id = `card-${year}`;
    }
    
    function updateNavigationButtons() {
        // Disable previous button if we're at the first node
        prevBtn.disabled = currentNodeIndex === 0;
        // Disable next button if we're at the last node
        nextBtn.disabled = currentNodeIndex === nodeYears.length - 1;
    }
    
    // Handle window resize for responsive design
    window.addEventListener('resize', function() {
        // No repositioning needed as we're using percentage-based positioning in CSS
    });
    
    function updateNavigationButtons() {
        prevBtn.disabled = currentNodeIndex === 0;
        nextBtn.disabled = currentNodeIndex === timelineNodes.length - 1;
    }
    
    function updateDetailPanel() {
        if (!detailPanels || detailPanels.length === 0) return;
        
        // Hide all detail panels first with a smooth transition
        detailPanels.forEach(panel => {
            if (panel.style.display !== 'none') {
                panel.style.opacity = '0';
                panel.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    panel.style.display = 'none';
                }, 300); // Match the transition duration
            } else {
                panel.style.display = 'none';
                panel.style.opacity = '0';
            }
        });
        
        // Get the year from the active node
        const activeNode = timelineNodes[currentNodeIndex];
        const nodeYearEl = activeNode.querySelector('.timeline-node-year');
        if (!nodeYearEl) return;
        
        const nodeYear = nodeYearEl.textContent.trim();
        
        // Try to find a matching panel by exact year match
        let targetPanelId = `experience-detail-${nodeYear}`;
        let targetPanel = document.getElementById(targetPanelId);
        
        // If no exact match, find the specific panel based on year
        if (!targetPanel) {
            // Default to the 2025 experience panel if nothing else matches
            targetPanel = document.getElementById('experience-detail-2025');
            
            const yearNum = parseInt(nodeYear);
            // Map years to specific experience panels
            if (yearNum === 2014 || yearNum === 2016) {
                targetPanel = document.getElementById('experience-detail-2014');
            } else if (yearNum === 2017) {
                targetPanel = document.getElementById('experience-detail-2017');
            } else if (yearNum === 2019) {
                targetPanel = document.getElementById('experience-detail-2019'); 
            } else if (yearNum === 2021) {
                targetPanel = document.getElementById('experience-detail-2021');
            } else if (yearNum === 2023) {
                targetPanel = document.getElementById('experience-detail-2023');
            } else if (yearNum === 2025) {
                targetPanel = document.getElementById('experience-detail-2025');
            }
        }
        
        // If still no match found, use the 2025 panel as default
        if (!targetPanel) {
            targetPanel = document.getElementById('experience-detail-2025');
            // If even that doesn't exist, use the first panel
            if (!targetPanel && detailPanels.length > 0) {
                targetPanel = detailPanels[0];
            }
        }
        
        // Display the target panel with a smooth animation
        if (targetPanel) {
            // Short delay to allow previous panel to fade out
            setTimeout(() => {
                targetPanel.style.display = 'block';
                targetPanel.style.transform = 'translateY(10px)';
                targetPanel.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                
                // Force a reflow to ensure the animation happens
                void targetPanel.offsetWidth;
                
                targetPanel.style.opacity = '1';
                targetPanel.style.transform = 'translateY(0)';
            }, 350);
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Recalculate node width based on new screen size
        let nodeWidth = 300; // Default for desktop
        if (window.innerWidth <= 576) {
            nodeWidth = 200; // Smaller width for mobile phones
        } else if (window.innerWidth <= 992) {
            nodeWidth = 250; // Medium width for tablets
        }
        
        // Recenter the current node after resize
        const trackPosition = calculateCenteredPosition(currentNodeIndex, nodeWidth);
        timelineTrack.style.transform = `translateX(${trackPosition}px)`;
    });
    
    // Force the initial state to the 2025 node
    setTimeout(() => {
        updateTimeline();
        
        // Make sure the 2025 experience detail panel is showing
        const panel2025 = document.getElementById('experience-detail-2025');
        if (panel2025) {
            detailPanels.forEach(panel => {
                panel.style.display = 'none';
                panel.style.opacity = '0';
            });
            
            panel2025.style.display = 'block';
            setTimeout(() => {
                panel2025.style.opacity = '1';
                panel2025.style.transform = 'translateY(0)';
            }, 50);
        }
    }, 100);
}

// 2. ACHIEVEMENT METRICS CARDS
// =================================================================
function initMetricsCards() {
    const metricCards = document.querySelectorAll('.metric-card');
    
    if (metricCards.length === 0) return;
    
    // Animate number counting effect when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metricValue = entry.target.querySelector('.metric-value');
                const targetValue = parseInt(metricValue.getAttribute('data-value'), 10);
                const prefix = metricValue.getAttribute('data-prefix') || '';
                const suffix = metricValue.getAttribute('data-suffix') || '';
                
                animateCounter(metricValue, targetValue, prefix, suffix);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });
    
    metricCards.forEach(card => {
        observer.observe(card);
    });
    
    function animateCounter(element, target, prefix, suffix) {
        let start = 0;
        const duration = 1500;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function for smoother animation
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentCount = Math.floor(ease * target);
            
            element.textContent = `${prefix}${currentCount.toLocaleString()}${suffix}`;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
}

// 3. PROJECT RELATIONSHIP DIAGRAM
// =================================================================
function initRelationshipDiagram() {
    const relationshipContainer = document.querySelector('.relationship-container');
    if (!relationshipContainer) return;
    
    const nodes = document.querySelectorAll('.node');
    const canvasEl = document.querySelector('.relationship-canvas');
    
    let connections = [];
    
    // Create connections based on data attributes
    nodes.forEach(sourceNode => {
        const connects = sourceNode.getAttribute('data-connects-to');
        if (connects) {
            const targetIds = connects.split(',');
            
            targetIds.forEach(targetId => {
                const targetNode = document.getElementById(targetId.trim());
                if (targetNode) {
                    connections.push({
                        source: sourceNode,
                        target: targetNode
                    });
                }
            });
        }
    });
    
    // Draw connections
    drawConnections();
    
    // Update connections on window resize
    window.addEventListener('resize', drawConnections);
    
    function drawConnections() {
        // Remove existing connection elements
        document.querySelectorAll('.connection').forEach(el => el.remove());
        
        connections.forEach(connection => {
            drawConnection(connection.source, connection.target);
        });
    }
    
    function drawConnection(source, target) {
        // Get element positions
        const sourceRect = source.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const containerRect = relationshipContainer.getBoundingClientRect();
        
        // Calculate positions relative to container
        const sourceX = sourceRect.left + sourceRect.width / 2 - containerRect.left;
        const sourceY = sourceRect.top + sourceRect.height / 2 - containerRect.top;
        const targetX = targetRect.left + targetRect.width / 2 - containerRect.left;
        const targetY = targetRect.top + targetRect.height / 2 - containerRect.top;
        
        // Calculate line length and angle
        const length = Math.sqrt(Math.pow(targetX - sourceX, 2) + Math.pow(targetY - sourceY, 2));
        const angle = Math.atan2(targetY - sourceY, targetX - sourceX) * 180 / Math.PI;
        
        // Create connection element
        const connection = document.createElement('div');
        connection.classList.add('connection');
        
        // Style connection
        connection.style.width = `${length}px`;
        connection.style.height = '2px';
        connection.style.left = `${sourceX}px`;
        connection.style.top = `${sourceY}px`;
        connection.style.transform = `rotate(${angle}deg)`;
        
        // Add to container
        relationshipContainer.appendChild(connection);
    }
    
    // Add hover interactions
    nodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            // Find directly connected nodes
            const connectedIds = node.getAttribute('data-connects-to');
            if (connectedIds) {
                const connectedNodes = connectedIds.split(',').map(id => document.getElementById(id.trim()));
                
                // Highlight connected nodes
                connectedNodes.forEach(connectedNode => {
                    if (connectedNode) connectedNode.classList.add('connected');
                });
            }
        });
        
        node.addEventListener('mouseleave', () => {
            document.querySelectorAll('.node.connected').forEach(node => {
                node.classList.remove('connected');
            });
        });
    });
}
