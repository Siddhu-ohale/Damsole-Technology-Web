
    document.addEventListener('DOMContentLoaded', function() {
      // ================== Mobile Menu ==================
      const mobileToggle = document.querySelector('.mobile-toggle');
      const mobileMenu = document.querySelector('.mobile-menu');

      mobileToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('open');
        mobileToggle.classList.toggle('active');
      });

      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!e.target.closest('.mobile-nav') && !e.target.closest('.mobile-toggle') && mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          mobileToggle.classList.remove('active');
        }
      });

      // Close menu when clicking any mobile nav link
      const mobileLinks = document.querySelectorAll('.mobile-nav a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
          mobileMenu.classList.remove('open');
          mobileToggle.classList.remove('active');
        });
      });

      // ================== Smooth Scrolling ==================
      const navLinks = document.querySelectorAll('a[href^="#"]');
      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            const headerHeight = document.querySelector('.site-header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });

            // Close mobile menu if open
            mobileMenu.classList.remove('open');
            mobileToggle.classList.remove('active');
          }
        });
      });

      // ================== Active Link on Scroll ==================
      function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;

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

      window.addEventListener('scroll', updateActiveLink);

      // ================== Typing Animation ==================
      // Fixed typing animation to be on a separate line
      const typedSpan = document.querySelector('.typed-inline');
      const caretSpan = document.querySelector('.typed-caret');

      if (typedSpan && caretSpan) {
        const words = ['Web Dev', 'UI/UX Design', 'Web Design'];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 1800;
        let wIndex = 0;
        let charIndex = 0;

        function type() {
          if (charIndex < words[wIndex].length) {
            typedSpan.textContent += words[wIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
          } else {
            setTimeout(erase, newTextDelay);
          }
        }

        function erase() {
          if (charIndex > 0) {
            typedSpan.textContent = words[wIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
          } else {
            wIndex = (wIndex + 1) % words.length;
            setTimeout(type, typingDelay + 500);
          }
        }

        // start
        setTimeout(type, 600);
      }

      // ================== Companies Carousel Slider Animation ==================
      const carouselTrack = document.querySelector('.carousel-track');
      if (carouselTrack) {
        // Duplicate logos for seamless loop
        const logos = Array.from(carouselTrack.children);
        logos.forEach(logo => {
          const clone = logo.cloneNode(true);
          carouselTrack.appendChild(clone);
        });
        // No JS animation needed, CSS handles smooth sliding
      }

      // ================== Handle Resize ==================
      window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          mobileToggle.classList.remove('active');
        }
      });
    });
