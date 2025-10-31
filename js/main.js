document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  mobileToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('open');
  });

  // Smooth scrolling for navigation with offset for fixed header
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Close mobile menu if open
        if (mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
        }
        
        // Calculate position with offset for fixed header
        const headerHeight = document.querySelector('.site-header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        // Smooth scroll to section
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.mobile-nav') && !e.target.closest('.mobile-toggle') && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
    }
  });

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll('.mobile-nav a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
    });
  });

  // Update active link based on scroll position
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100; // Offset for better detection
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = '#' + section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === currentSection) {
        link.classList.add('active');
      }
    });
  }
  
  // Call updateActiveLink on scroll
  window.addEventListener('scroll', updateActiveLink);
});