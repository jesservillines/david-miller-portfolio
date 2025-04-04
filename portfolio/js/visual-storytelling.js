// Advanced Visual Storytelling Elements
// =================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all visual storytelling components
    initInteractiveTimeline();
    initMetricsCards();
    initRelationshipDiagram();
});

// 1. INTERACTIVE TIMELINE
// =================================================================
function initInteractiveTimeline() {
    const timelineTrack = document.querySelector('.timeline-track');
    const timelineNodes = document.querySelectorAll('.timeline-node');
    const prevBtn = document.getElementById('timelinePrev');
    const nextBtn = document.getElementById('timelineNext');
    const detailPanels = document.querySelectorAll('.detail-panel-content');
    
    if (!timelineTrack || timelineNodes.length === 0) return;
    
    // Start with the most recent position (last node in the timeline)
    let currentNodeIndex = timelineNodes.length - 1;
    const nodeWidth = 300; // Width of node + margins
    
    // Remove any existing active classes first
    timelineNodes.forEach(node => {
        node.classList.remove('active');
    });
    
    // Set initial active node to the most recent (last) one
    timelineNodes[currentNodeIndex].classList.add('active');
    
    // Calculate the initial position to center the most recent node
    const initialPosition = -(currentNodeIndex * nodeWidth) + (window.innerWidth / 2 - nodeWidth / 2);
    timelineTrack.style.transform = `translateX(${initialPosition}px)`;
    
    // Update navigation buttons and detail panel
    updateNavigationButtons();
    updateDetailPanel();
    
    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', function() {
        if (currentNodeIndex > 0) {
            currentNodeIndex--;
            updateTimeline();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentNodeIndex < timelineNodes.length - 1) {
            currentNodeIndex++;
            updateTimeline();
        }
    });
    
    // Add click events to each node
    timelineNodes.forEach((node, index) => {
        node.addEventListener('click', function() {
            currentNodeIndex = index;
            updateTimeline();
        });
    });
    
    function updateTimeline() {
        // Remove active class from all nodes
        timelineNodes.forEach(node => node.classList.remove('active'));
        
        // Add active class to current node
        timelineNodes[currentNodeIndex].classList.add('active');
        
        // Calculate track position
        const trackPosition = -(currentNodeIndex * nodeWidth) + (window.innerWidth / 2 - nodeWidth / 2);
        timelineTrack.style.transform = `translateX(${trackPosition}px)`;
        
        // Update navigation buttons and detail panel
        updateNavigationButtons();
        updateDetailPanel();
    }
    
    function updateNavigationButtons() {
        prevBtn.disabled = currentNodeIndex === 0;
        nextBtn.disabled = currentNodeIndex === timelineNodes.length - 1;
    }
    
    function updateDetailPanel() {
        if (!detailPanels || detailPanels.length === 0) return;
        
        // Hide all detail panels first
        detailPanels.forEach(panel => {
            panel.style.display = 'none';
        });
        
        // Get the year from the active node
        const activeNode = timelineNodes[currentNodeIndex];
        const nodeYearEl = activeNode.querySelector('.timeline-node-year');
        if (!nodeYearEl) return;
        
        const nodeYear = nodeYearEl.textContent.trim();
        
        // Try to find a matching panel by exact year match
        let targetPanelId = `experience-detail-${nodeYear}`;
        let targetPanel = document.getElementById(targetPanelId);
        
        // If no exact match, find the closest period based on year ranges
        if (!targetPanel) {
            // Default to the most recent experience panel
            targetPanel = document.getElementById('experience-detail-2025');
            
            const yearNum = parseInt(nodeYear);
            // Map year ranges to specific experience panels
            if (yearNum >= 2014 && yearNum <= 2017) {
                targetPanel = document.getElementById('experience-detail-2014');
            } else if (yearNum >= 2017 && yearNum <= 2019) {
                targetPanel = document.getElementById('experience-detail-2017');
            } else if (yearNum >= 2019) {
                targetPanel = document.getElementById('experience-detail-2025');
            }
        }
        
        // Display the target panel with a smooth animation
        if (targetPanel) {
            targetPanel.style.display = 'block';
            
            // Apply subtle animation effect
            targetPanel.style.opacity = '0';
            targetPanel.style.transform = 'translateY(10px)';
            targetPanel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            
            setTimeout(() => {
                targetPanel.style.opacity = '1';
                targetPanel.style.transform = 'translateY(0)';
            }, 50);
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const trackPosition = -(currentNodeIndex * nodeWidth) + (window.innerWidth / 2 - nodeWidth / 2);
        timelineTrack.style.transform = `translateX(${trackPosition}px)`;
    });
    
    // Force the initial state to most recent item
    setTimeout(() => {
        updateTimeline();
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
