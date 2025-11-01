
    document.addEventListener('DOMContentLoaded', function() {
      // Mobile menu functionality
      const mobileToggle = document.querySelector('.mobile-toggle');
      const mobileMenu = document.querySelector('.mobile-menu');
      
      mobileToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('open');
      });

      // Smooth scrolling for navigation
      const navLinks = document.querySelectorAll('a[data-scroll]');
      
      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('data-scroll');
          const targetSection = document.getElementById(targetId);
          
          if (targetSection) {
            // Close mobile menu if open
            mobileMenu.classList.remove('open');
            
            // Smooth scroll to section
            targetSection.scrollIntoView({
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
    });
