// Lightbox functionality for portfolio images
class Lightbox {
  constructor(selector) {
    this.images = document.querySelectorAll(selector);
    this.currentIndex = 0;
    this.lightbox = null;

    if (this.images.length > 0) {
      this.init();
    }
  }

  init() {
    // Create lightbox HTML structure
    this.createLightbox();

    // Add click handlers to all images
    this.images.forEach((item, index) => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        this.open(index);
      });
    });

    // Add keyboard support
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) return;

      if (e.key === 'Escape') {
        this.close();
      } else if (e.key === 'ArrowLeft') {
        this.previous();
      } else if (e.key === 'ArrowRight') {
        this.next();
      }
    });
  }

  createLightbox() {
    // Create lightbox container
    this.lightbox = document.createElement('div');
    this.lightbox.className = 'lightbox';
    this.lightbox.setAttribute('role', 'dialog');
    this.lightbox.setAttribute('aria-modal', 'true');
    this.lightbox.setAttribute('aria-label', 'Image lightbox');

    // Close on background click
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.close();
      }
    });

    // Create content container
    const content = document.createElement('div');
    content.className = 'lightbox-content';

    // Create image element
    const img = document.createElement('img');
    img.alt = 'Portfolio image';

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Close lightbox');
    closeBtn.addEventListener('click', () => this.close());

    // Create navigation buttons (only if more than 1 image)
    if (this.images.length > 1) {
      const prevBtn = document.createElement('button');
      prevBtn.className = 'lightbox-nav lightbox-prev';
      prevBtn.innerHTML = '‹';
      prevBtn.setAttribute('aria-label', 'Previous image');
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.previous();
      });

      const nextBtn = document.createElement('button');
      nextBtn.className = 'lightbox-nav lightbox-next';
      nextBtn.innerHTML = '›';
      nextBtn.setAttribute('aria-label', 'Next image');
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.next();
      });

      this.lightbox.appendChild(prevBtn);
      this.lightbox.appendChild(nextBtn);
    }

    content.appendChild(img);
    this.lightbox.appendChild(closeBtn);
    this.lightbox.appendChild(content);
    document.body.appendChild(this.lightbox);

    this.lightboxImg = img;
  }

  open(index) {
    this.currentIndex = index;
    this.updateImage();
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  close() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }

  updateImage() {
    const item = this.images[this.currentIndex];
    const img = item.querySelector('img');

    if (img) {
      this.lightboxImg.src = img.src;
      this.lightboxImg.alt = img.alt || 'Portfolio image';
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateImage();
  }

  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateImage();
  }
}

// Export for use in main.js
window.Lightbox = Lightbox;
