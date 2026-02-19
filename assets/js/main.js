// Main initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize navigation
  if (typeof Navigation !== 'undefined') {
    new Navigation();
  }

  // Initialize hero slider
  const heroSlider = document.querySelector('.hero-slider');
  if (heroSlider && typeof HeroSlider !== 'undefined') {
    new HeroSlider(heroSlider);
  }

  // Initialize lightbox for portfolio images
  if (typeof Lightbox !== 'undefined') {
    new Lightbox('.portfolio-item');
  }

  // Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }

  // Add scroll animations (optional)
  if ('IntersectionObserver' in window) {
    try {
      const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, {
        threshold: 0.1
      });

      const animateElements = document.querySelectorAll('.feature-box, .stat-box, .portfolio-item');
      animateElements.forEach(el => {
        if (el) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          animateOnScroll.observe(el);
        }
      });
    } catch (error) {
      console.warn('Scroll animations could not be initialized:', error);
    }
  }

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add year to copyright
  const copyrightYear = document.querySelector('.copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});
