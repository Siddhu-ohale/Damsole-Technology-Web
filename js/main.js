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
  const typedTextSpan = document.querySelector('.typed-text');
  const cursorSpan = document.querySelector('.cursor');

  if (typedTextSpan && cursorSpan) {
    const textArray = ['UI/UX Designer', 'Web Developer', 'Web Designer', 'Software Developer'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay);
      }
    }

    function erase() {
      if (charIndex > 0) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        cursorSpan.classList.remove('typing');
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
      }
    }

    setTimeout(type, newTextDelay + 250);
  }

  // ================== Handle Resize ==================
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      mobileToggle.classList.remove('active');
    }
  });
});
