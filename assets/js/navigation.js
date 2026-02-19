// Navigation functionality
class Navigation {
  constructor() {
    this.nav = document.querySelector('.nav');
    this.toggle = document.querySelector('.mobile-menu-toggle');
    this.links = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('section[id]');

    this.init();
  }

  init() {
    // Mobile menu toggle
    if (this.toggle) {
      this.toggle.addEventListener('click', () => this.toggleMenu());
    }

    // Smooth scroll and close menu on link click
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          this.scrollToSection(href);
          this.closeMenu();
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.nav && this.nav.classList.contains('active')) {
        if (!this.nav.contains(e.target) && !this.toggle.contains(e.target)) {
          this.closeMenu();
        }
      }
    });

    // Active section highlighting on scroll
    window.addEventListener('scroll', () => this.highlightActiveSection());
  }

  toggleMenu() {
    this.nav.classList.toggle('active');
    this.toggle.classList.toggle('active');
  }

  closeMenu() {
    this.nav.classList.remove('active');
    this.toggle.classList.remove('active');
  }

  scrollToSection(target) {
    const section = document.querySelector(target);
    if (section) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = section.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  highlightActiveSection() {
    const scrollPosition = window.scrollY + 100;

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        this.links.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

// Export for use in main.js
window.Navigation = Navigation;
