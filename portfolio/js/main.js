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
                    <img src="/portfolio/images/borealis-keystone-1.jpg" alt="Borealis Keystone Electric Bike">
                    <p class="caption">The Borealis Keystone electric fat bike features premium components, winter-ready construction, and electric assist capabilities.</p>
                </div>
                <div class="gallery-item">
                    <img src="/portfolio/images/borealis-keystone-2.jpg" alt="Keystone Bike Prototype Testing">
                    <p class="caption">Testing the prototype on world-famous trails in Fruita, Colorado, gathering valuable rider feedback.</p>
                </div>
                <div class="gallery-item">
                    <img src="/portfolio/images/borealis-keystone-3.jpg" alt="Keystone Production Model">
                    <p class="caption">Final production model featuring Shimano components, dropper post, suspension fork, and powerful brakes for year-round versatility.</p>
                </div>
                <div class="gallery-item">
                    <img src="/portfolio/images/borealis-keystone-4.jpg" alt="Keystone Customer Experience">
                    <p class="caption">The Keystone opened up new riding possibilities, increasing our average order value by 24% and receiving enthusiastic customer reviews.</p>
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
                    <img src="/portfolio/images/terrene-tires.jpg" alt="Terrene Tires Collection">
                    <p class="caption">High-quality tires for fat and plus-sized bikes from the Terrene Tires product line, specializing in various terrain types and conditions.</p>
                </div>
                <div class="gallery-item">
                    <img src="/portfolio/images/terrene-tires-2.jpg" alt="Terrene Tires Brand Identity">
                    <p class="caption">Post-acquisition brand identity restoration, maintaining Terrene's reputation for quality while integrating with Borealis Fat Bikes.</p>
                </div>
                <div class="gallery-item">
                    <img src="/portfolio/images/terrene-tires-3.jpg" alt="Terrene Tires Marketing">
                    <p class="caption">Marketing materials showcasing the specialized application of Terrene Tires products for various cycling disciplines and conditions.</p>
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
                    <img src="/portfolio/images/robot-hand-1.jpg" alt="Robot Hand Complete Assembly">
                    <p class="caption">Full mechanical robotic hand assembly design with three-way finger movement configuration using Creo Parametric.</p>
                </div>
                <div class="gallery-item">
                    <img src="/portfolio/images/robot-hand-2.jpg" alt="Linkage Design Detail">
                    <p class="caption">Detailed view of the linkage mechanism showing the complex interconnections between components, critical for coordinated movement.</p>
                </div>
                <div class="gallery-item">
                    <img src="/portfolio/images/robot-hand-3.jpg" alt="Assembly Constraints">
                    <p class="caption">Implementing precise assembly constraints was crucial to ensure proper range of motion while avoiding component interference.</p>
                </div>
                <div class="gallery-item">
                    <img src="/portfolio/images/robot-hand-4.jpg" alt="Aesthetic Design Elements">
                    <p class="caption">The design balanced mechanical functionality with aesthetic considerations, using surface modeling techniques for a cohesive visual appearance.</p>
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
