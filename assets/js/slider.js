// Hero Slider with Layer Animations
class HeroSlider {
  constructor(sliderElement) {
    this.slider = sliderElement;
    this.slides = sliderElement.querySelectorAll('.hero-slide');
    this.currentSlide = 0;
    this.autoplayInterval = null;
    this.autoplayDelay = 20000; // 20 seconds per slide
    this.isPaused = false;
    this.layerTimeouts = [];

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    // Show first slide and animate layers
    this.showSlide(0);

    // Create controls
    this.createControls();

    // Start autoplay
    this.startAutoplay();

    // Pause on hover
    this.slider.addEventListener('mouseenter', () => this.pauseAutoplay());
    this.slider.addEventListener('mouseleave', () => this.resumeAutoplay());

    // Touch support
    this.addTouchSupport();
  }

  createControls() {
    // Create dot navigation
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-controls';

    this.slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot';
      dot.setAttribute('aria-label', `Slide ${index + 1}`);
      if (index === 0) dot.classList.add('active');

      dot.addEventListener('click', () => {
        this.goToSlide(index);
        this.resetAutoplay();
      });

      dotsContainer.appendChild(dot);
    });

    // Create arrow buttons
    const prevArrow = document.createElement('button');
    prevArrow.className = 'slider-arrow prev';
    prevArrow.innerHTML = '‹';
    prevArrow.setAttribute('aria-label', 'Previous slide');
    prevArrow.addEventListener('click', () => {
      this.previousSlide();
      this.resetAutoplay();
    });

    const nextArrow = document.createElement('button');
    nextArrow.className = 'slider-arrow next';
    nextArrow.innerHTML = '›';
    nextArrow.setAttribute('aria-label', 'Next slide');
    nextArrow.addEventListener('click', () => {
      this.nextSlide();
      this.resetAutoplay();
    });

    this.slider.appendChild(dotsContainer);
    this.slider.appendChild(prevArrow);
    this.slider.appendChild(nextArrow);

    this.dots = dotsContainer.querySelectorAll('.slider-dot');
  }

  animateLayers(slide) {
    // Clear any existing layer timeouts
    this.layerTimeouts.forEach(timeout => clearTimeout(timeout));
    this.layerTimeouts = [];

    // Get all layers in this slide
    const layers = slide.querySelectorAll('.slide-layer');

    // Reset all layers
    layers.forEach(layer => {
      layer.classList.remove('animated');
      layer.style.animation = 'none';
    });

    // Animate each layer based on its data-start time
    layers.forEach(layer => {
      const startTime = parseInt(layer.getAttribute('data-start') || '0');
      const animation = layer.getAttribute('data-animation') || 'fadeIn';

      const timeout = setTimeout(() => {
        layer.classList.add('animated');
        layer.style.animation = `${animation} 0.8s ease-out forwards`;
      }, startTime);

      this.layerTimeouts.push(timeout);
    });
  }

  showSlide(index) {
    // Clear layer animations from previous slide
    this.layerTimeouts.forEach(timeout => clearTimeout(timeout));
    this.layerTimeouts = [];

    this.slides.forEach((slide, i) => {
      const isActive = i === index;
      slide.classList.toggle('active', isActive);

      if (isActive) {
        // Animate layers for the active slide
        this.animateLayers(slide);
      } else {
        // Reset layers for inactive slides
        const layers = slide.querySelectorAll('.slide-layer');
        layers.forEach(layer => {
          layer.classList.remove('animated');
          layer.style.animation = 'none';
        });
      }
    });

    if (this.dots) {
      this.dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    this.currentSlide = index;
  }

  goToSlide(index) {
    this.showSlide(index);
  }

  nextSlide() {
    const next = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(next);
  }

  previousSlide() {
    const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prev);
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      if (!this.isPaused) {
        this.nextSlide();
      }
    }, this.autoplayDelay);
  }

  pauseAutoplay() {
    this.isPaused = true;
  }

  resumeAutoplay() {
    this.isPaused = false;
  }

  resetAutoplay() {
    clearInterval(this.autoplayInterval);
    this.startAutoplay();
  }

  addTouchSupport() {
    let touchStartX = 0;
    let touchEndX = 0;

    this.slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    this.slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
        this.resetAutoplay();
      }
    };

    this.handleSwipe = handleSwipe;
  }
}

// Export for use in main.js
window.HeroSlider = HeroSlider;
