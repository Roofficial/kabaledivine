// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// State
let isMobileMenuOpen = false;

// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Setup event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initial check for device type
    handleResize();
});

// Handle Resize - Show appropriate menu based on device
function handleResize() {
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
        // Mobile device - show mobile menu button
        const desktopNav = navbar.querySelector('.lg\\:flex');
        if (desktopNav) desktopNav.classList.add('lg:hidden');
        
        // Close mobile menu if open
        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }
    } else {
        // Desktop device - show desktop menu
        const desktopNav = navbar.querySelector('.lg\\:flex');
        if (desktopNav) desktopNav.classList.remove('lg:hidden');
        
        // Close mobile menu if open
        if (isMobileMenuOpen) {
            toggleMobileMenu();
        }
    }
}

// Scroll Handler
function handleScroll() {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    const menuButton = mobileMenu.querySelector('button');
    
    if (isMobileMenuOpen) {
        mobileMenu.classList.remove('translate-x-full');
        menuButton.innerHTML = '<i class="fas fa-times text-2xl text-blue-900"></i>';
        document.body.style.overflow = 'hidden';
    } else {
        mobileMenu.classList.add('translate-x-full');
        menuButton.innerHTML = '<i class="fas fa-bars text-2xl text-white"></i>';
        document.body.style.overflow = '';
    }
}

// Send Email via EmailJS
async function sendEmail(templateParams, formElement, formCard) {
    try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        
        // Show success message
        formCard.innerHTML = `
            <div class="success-message animate-fade-in">
                <div class="success-icon animate-pulse">
                    <i class="fas fa-check"></i>
                </div>
                <h3>Success!</h3>
                <p>Your message has been sent successfully. We'll get back to you soon!</p>
                <a href="#" onclick="location.reload()" class="btn-primary">Send another message</a>
            </div>
        `;
    } catch (error) {
        console.error('EmailJS Error:', error);
        
        // Show error message
        formCard.innerHTML = `
            <div class="success-message animate-fade-in" style="background-color: #fef2f2;">
                <div class="success-icon" style="background-color: #fee2e2; color: #dc2626;">
                    <i class="fas fa-times"></i>
                </div>
                <h3 style="color: #dc2626;">Error!</h3>
                <p>Failed to send your message. Please try again or contact us directly at info@kabaledivine.com</p>
                <a href="#" onclick="location.reload()" class="btn-primary">Try Again</a>
            </div>
        `;
    }
}

// Handle Admission Form Submit
function handleAdmissionSubmit(e) {
    e.preventDefault();
    
    const form = document.getElementById('admission-form');
    const formCard = form.closest('.form-card');
    
    // Get form data
    const templateParams = {
        to_name: 'Kabale Divine Admissions',
        from_name: form.querySelector('input[type="text"]').value,
        child_name: form.querySelector('input[type="text"]').value,
        desired_class: form.querySelector('select').value,
        parent_name: form.querySelectorAll('input[type="text"]')[1].value,
        phone: form.querySelector('input[type="tel"]').value,
        email: form.querySelector('input[type="email"]').value,
        message: form.querySelector('textarea').value,
        subject: 'New Admission Inquiry'
    };
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Send email
    sendEmail(templateParams, form, formCard);
}

// Handle Contact Form Submit
function handleContactSubmit(e) {
    e.preventDefault();
    
    const form = document.getElementById('contact-form');
    const formCard = form.closest('.form-card');
    
    // Get form data
    const templateParams = {
        to_name: 'Kabale Divine School',
        from_name: form.querySelector('input[type="text"]').value,
        from_email: form.querySelector('input[type="email"]').value,
        subject: form.querySelector('input[type="text"]').value,
        message: form.querySelector('textarea').value,
        reply_to: form.querySelector('input[type="email"]').value
    };
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Send email
    sendEmail(templateParams, form, formCard);
}
