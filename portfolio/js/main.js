// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== MOBILE NAVIGATION TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== SKILL ANIMATION =====
// Animate skill bars when they come into view
const skillLevels = document.querySelectorAll('.skill-level');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.setProperty('--width', width);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillLevels.forEach(skill => {
    observer.observe(skill);
});

// ===== PROJECT MODAL =====
const projectModal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close-modal');
const projectBtns = document.querySelectorAll('.project-btn');

// Project details
const projectDetails = {
    keystone: {
        title: "Borealis Keystone Electric Bike",
        period: "February 2022 - October 2023",
        description: `
            <p>In response to growing customer demand for high-end electric fat bikes, I led the development of the Borealis Keystone from concept to market launch and beyond. As pedal-assist e-bikes gained traction, our customers increasingly sought a winter-ready, high-performance fat bike with electric assist — one that matched the quality of their summer rides.</p>
            
            <p>Initially, our CEO kicked off the project with a basic mule frame. After assembling our first prototype while still in school for design engineering, I transitioned into the product leadership role. I collaborated with our Taiwanese trading agent and overseas manufacturers to finalize frame design, while also managing component selection, build specs, and quality control with internal teams.</p>
            
            <p>I used Agile to break the project into flexible, manageable stages — from R&D and prototyping through sourcing, assembly, testing, and packaging. Despite major roadblocks around assembly, marketing, and supply chain logistics, we launched in October 2023.</p>
            
            <p>The Keystone features premium components from Shimano and SRAM with a focus on performance, reliability and serviceability. The premium build includes a dropper post, suspension fork, and powerful brakes - versatile for year-round use.</p>
            
            <p>Customer response was overwhelmingly positive — we received strong preorders, five-star reviews, and increased our average order value by 24%. One customer shared:</p>
            
            <blockquote>"Best eFat ever! This is my third eFat and although I liked other two - the Keystone is just beyond. I set mine up with a Redshift ShockStop seatpost (hardtail with benefits!), Ergotec 45 degree by 50 stem, carbon riser bar, and Schwalbe Al Mighty 4.8 tires (328 Billy Flamingo studs per baby!) The T-type drivetrain blew me away so much I converted my other bikes. I also received unbelievable service from the Borealis sales rep during purchase. Simply heaven!"</blockquote>
            
            <p>The multi-year project sharpened my skills in procurement, go-to-market strategy, and cross-functional leadership.</p>
            
            <div class="project-gallery">
                <div class="gallery-item">
                    <img src="images/keystone-happy-customers.jpg" alt="Happy Customers">
                    <p class="caption">Enthusiastic customers quickly began sharing their experiences with the Keystone. The bike opened up new possibilities, allowing them to ride in ways and places they never could before.</p>
                </div>
                <div class="gallery-item">
                    <img src="images/keystone-first-impression.jpg" alt="First Impression">
                    <p class="caption">This photo is memorable because it marks the first time we brought a fully functional prototype to an event, allowing riders to test it on the world-famous 18 Road trails in Fruita, Colorado.</p>
                </div>
                <div class="gallery-item">
                    <img src="images/keystone-behind-scenes.jpg" alt="Behind the Scenes">
                    <p class="caption">Filming our assembly video was a critical step in bringing the product directly to consumers. It required translating technical knowledge about the bike into clear, approachable instructions.</p>
                </div>
            </div>
        `,
        skills: ["Project Management", "Go-to-Market Strategy", "Product Development", "Multi-Channel Commerce", "Pricing Strategy"]
    },
    terrene: {
        title: "Acquisition and Integration of Terrene Tires",
        period: "July 2022",
        description: `
            <p>In July 2022, Borealis Fat Bikes acquired Terrene Tires, a Minneapolis-based company specializing in high-quality tires for fat and plus-sized bikes. I played a pivotal role in the acquisition and integration process.</p>
            
            <p>Initially, I supported due diligence by evaluating Terrene's product lines, inventory, and e-commerce operations. Following the acquisition, I managed the transition by receiving and verifying inventory, relaunching the website, and restoring the original brand identity.</p>
            
            <p>I also handled customer communications, including press releases and dealer outreach, and developed a new pricing model aligned with the acquisition terms. To deepen product knowledge, I engaged directly with customers and represented the company at the Taipei Bike Show, strengthening relationships with our trading agents and manufacturers in Taiwan and China.</p>
            
            <p>This experience enhanced my strategic planning, operational management, and international business skills.</p>
            
            <div class="project-gallery">
                <div class="gallery-item">
                    <img src="images/terrene-sales-guide.jpg" alt="Sales Enablement Guide">
                    <p class="caption">Digital catalog created to onboard international dealers, OEMs, and distributors following the acquisition of Terrene Tires.</p>
                </div>
                <div class="gallery-item">
                    <img src="images/terrene-iditarod.jpg" alt="Iditarod Trail">
                    <p class="caption">Equipping professional athletes with the right tools for the job. Pivot Bikes athlete Kurt Refsnider photo using Terrene Johnny 5's to ride the Iditarod Trail in Alaska.</p>
                </div>
                <div class="gallery-item">
                    <img src="images/terrene-tbw.jpg" alt="Taipei Bike Week">
                    <p class="caption">Taipei Bike Week is an industry-exclusive event held annually in Taipei, Taiwan, bringing together OEM product managers, bicycle brands, and component suppliers from around the world.</p>
                </div>
            </div>
        `,
        skills: ["Strategic Planning", "Sales Operations", "Product Lifecycle Management", "Business Integration", "International Business"]
    },
    robothand: {
        title: "Robot Hand - Final Project in Creo Parametric",
        period: "January 2022 - May 2022",
        description: `
            <p>Designed a fully mechanical robotic hand using Creo Parametric, with no cables—only fixed linkages and rigid-body mechanics. The hand was powered by three individually mounted stepper motors, each connected via ball joints to actuate the fingers.</p>
            
            <p>The design included a functional palm and featured a 3-way finger movement configuration, enabling coordinated grasping motions. Focus was placed on precise linkage design, realistic articulation, and mechanical feasibility within Creo's assembly environment.</p>
            
            <div class="project-gallery">
                <div class="gallery-item">
                    <img src="images/robot-hand-assembly.jpg" alt="Designing for an Assembly">
                    <p class="caption">One of the main challenges was accurately mating dozens of components within tight spatial constraints while avoiding interference. This required careful consideration of tolerances, range of motion, and proper use of mechanical constraints in the assembly.</p>
                </div>
                <div class="gallery-item">
                    <img src="images/robot-hand-drawing.jpg" alt="Assembly Drawing">
                    <p class="caption">This basic assembly drawing details the full mechanical structure of the robotic hand, including over 30 unique components such as finger links, pins, motor connector bars, and ball joints.</p>
                </div>
                <div class="gallery-item">
                    <img src="images/robot-hand-aesthetics.jpg" alt="Designing for Aesthetics">
                    <p class="caption">In addition to mechanical functionality, the project emphasized designing for aesthetics. Surface modeling techniques and smooth transitions between components were used to create a visually cohesive and modern look.</p>
                </div>
            </div>
        `,
        skills: ["Creo Parametric", "Design Engineering", "Mechanical Engineering", "3D Modeling", "Assembly Design"]
    }
};

// Open modal when clicking on project buttons
projectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const projectId = btn.getAttribute('data-project');
        const project = projectDetails[projectId];
        
        if (project) {
            // Create modal content
            let skillsHTML = '';
            project.skills.forEach(skill => {
                skillsHTML += `<span class="skill-tag">${skill}</span>`;
            });
            
            modalBody.innerHTML = `
                <h2 class="modal-title">${project.title}</h2>
                <p class="modal-period"><i class="far fa-calendar-alt"></i> ${project.period}</p>
                <div class="modal-description">
                    ${project.description}
                </div>
                <div class="modal-skills">
                    <h3>Skills</h3>
                    <div class="project-skills">
                        ${skillsHTML}
                    </div>
                </div>
            `;
            
            // Show modal
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    });
});

// Close modal when clicking on X or outside
closeModal.addEventListener('click', () => {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scrolling
});

window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Enable scrolling
    }
});

// Form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            // In a real-world scenario, you'd send this data to a server
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill out all required fields.');
        }
    });
}

// Initialize AOS (Animate on Scroll) if you decide to include it later
document.addEventListener('DOMContentLoaded', function() {
    // You can add more initialization code here
    console.log('David Miller Portfolio - Ready');
});
