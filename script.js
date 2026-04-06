// ============================================
// CSS ACADEMY - PREMIUM JAVASCRIPT ENGINE
// Advanced Interactive Features
// ============================================

// ============================================
// PARTICLE BACKGROUND SYSTEM
// ============================================
class ParticleBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 50;
    this.mouse = { x: null, y: null, radius: 150 };

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.animate();

    window.addEventListener('resize', () => this.resize());
    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  createParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;

      // Mouse interaction
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.mouse.radius) {
        particle.x -= dx / distance * 2;
        particle.y -= dy / distance * 2;
      }

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
      this.ctx.fill();

      // Connect particles
      this.particles.forEach((otherParticle, otherIndex) => {
        if (index !== otherIndex) {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 100)})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.moveTo(particle.x, particle.y);
            this.ctx.lineTo(otherParticle.x, otherParticle.y);
            this.ctx.stroke();
          }
        }
      });
    });

    requestAnimationFrame(() => this.animate());
  }
}

// ============================================
// TYPING ANIMATION
// ============================================
class TypingAnimation {
  constructor(element, texts, speed = 100) {
    this.element = element;
    this.texts = texts;
    this.speed = speed;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;

    this.type();
  }

  type() {
    const currentText = this.texts[this.textIndex];

    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let typeSpeed = this.speed;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = 2000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// ============================================
// LIVE SOCIAL PROOF NOTIFICATIONS
// ============================================
class SocialProofNotifications {
  constructor() {
    this.notifications = [
      { name: 'Rajesh Kumar', location: 'Chennai', course: 'Tally + GST', action: 'enrolled' },
      { name: 'Priya Sharma', location: 'Thiruvottiyur', course: 'Python Programming', action: 'booked demo' },
      { name: 'Arun Krishnan', location: 'Chennai', course: 'Java Development', action: 'enrolled' },
      { name: 'Divya Lakshmi', location: 'Chennai', course: 'MS Office', action: 'enrolled' },
      { name: 'Karthik Raj', location: 'Thiruvottiyur', course: 'Spoken English', action: 'booked demo' },
      { name: 'Meena Kumari', location: 'Chennai', course: 'Job Ready Skills', action: 'enrolled' }
    ];

    this.currentIndex = 0;
    this.container = null;
    this.init();
  }

  init() {
    // Create notification container
    this.container = document.createElement('div');
    this.container.className = 'social-proof-notification';
    this.container.style.cssText = `
      position: fixed;
      bottom: 30px;
      left: 30px;
      z-index: 200;
      background: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      gap: 1rem;
      max-width: 350px;
      transform: translateX(-400px);
      transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;

    document.body.appendChild(this.container);

    // Start showing notifications
    setTimeout(() => this.showNotification(), 5000);
  }

  showNotification() {
    const notification = this.notifications[this.currentIndex];

    this.container.innerHTML = `
      <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #1e40af, #3b82f6); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.25rem; flex-shrink: 0;">
        👤
      </div>
      <div style="flex: 1;">
        <div style="font-weight: 600; color: #1f2937; font-size: 0.875rem;">${notification.name}</div>
        <div style="font-size: 0.75rem; color: #6b7280;">from ${notification.location} just ${notification.action} in <strong>${notification.course}</strong></div>
      </div>
      <button onclick="this.parentElement.style.transform='translateX(-400px)'" style="background: none; border: none; color: #9ca3af; font-size: 1.25rem; cursor: pointer; padding: 0; width: 24px; height: 24px; flex-shrink: 0;">×</button>
    `;

    // Show notification
    setTimeout(() => {
      this.container.style.transform = 'translateX(0)';
    }, 100);

    // Hide after 5 seconds
    setTimeout(() => {
      this.container.style.transform = 'translateX(-400px)';
    }, 5000);

    // Next notification
    this.currentIndex = (this.currentIndex + 1) % this.notifications.length;
    setTimeout(() => this.showNotification(), 15000);
  }
}

// ============================================
// ENHANCED SCROLL ANIMATIONS
// ============================================
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');

          // Stagger animation for children
          if (entry.target.classList.contains('stagger-parent')) {
            const children = entry.target.querySelectorAll('.stagger-item');
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('active');
              }, index * 200);
            });
          }
        }
      });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    document.querySelectorAll('.stagger-parent').forEach(el => observer.observe(el));

    // Hero Parallax Effect
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroBg = document.querySelector('.hero-background img');
      if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.4}px) scale(${1 + scrolled * 0.0005})`;
      }

      // Navbar transparency handling
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (scrolled > 100) {
          navbar.style.background = 'rgba(0, 0, 0, 0.9)';
          navbar.style.padding = '10px 0';
        } else {
          navbar.style.background = 'rgba(10, 10, 11, 0.8)';
          navbar.style.padding = '20px 0';
        }
      }
    });
  }
}

// ============================================
// PROGRESS BAR
// ============================================
class ScrollProgressBar {
  constructor() {
    this.bar = document.createElement('div');
    this.bar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #1e40af, #8b5cf6);
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(this.bar);

    window.addEventListener('scroll', () => this.update());
    this.update();
  }

  update() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    this.bar.style.width = scrolled + '%';
  }
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ============================================
// TESTIMONIAL SLIDER
// ============================================
class TestimonialSlider {
  constructor(selector) {
    this.slider = document.querySelector(selector);
    if (!this.slider) return;

    this.track = this.slider.querySelector('.testimonial-track');
    this.cards = this.slider.querySelectorAll('.testimonial-card');
    this.prevBtn = this.slider.parentElement.querySelector('.slider-prev');
    this.nextBtn = this.slider.parentElement.querySelector('.slider-next');
    this.dotsContainer = this.slider.parentElement.querySelector('.slider-dots');

    this.currentIndex = 0;
    this.autoPlayInterval = null;

    this.init();
  }

  init() {
    this.createDots();
    this.updateSlider();
    this.startAutoPlay();

    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

    // Pause on hover
    this.slider.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.slider.addEventListener('mouseleave', () => this.startAutoPlay());
  }

  createDots() {
    if (!this.dotsContainer) return;

    this.cards.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot';
      dot.addEventListener('click', () => this.goTo(index));
      this.dotsContainer.appendChild(dot);
    });
  }

  updateSlider() {
    this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;

    // Update dots
    if (this.dotsContainer) {
      const dots = this.dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentIndex);
      });
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
    this.updateSlider();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
    this.updateSlider();
  }

  goTo(index) {
    this.currentIndex = index;
    this.updateSlider();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.next(), 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
}

// ============================================
// COUNTDOWN TIMER
// ============================================
class CountdownTimer {
  constructor(selector, targetDate) {
    this.container = document.querySelector(selector);
    if (!this.container) return;

    this.targetDate = targetDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    this.update();
    setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if (distance < 0) {
      this.container.innerHTML = '<div style="font-size: 2rem; font-weight: 700;">Batch Started!</div>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.container.innerHTML = `
      <div class="countdown-item">
        <span class="countdown-value">${days}</span>
        <span class="countdown-label">Days</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-value">${hours}</span>
        <span class="countdown-label">Hours</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-value">${minutes}</span>
        <span class="countdown-label">Minutes</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-value">${seconds}</span>
        <span class="countdown-label">Seconds</span>
      </div>
    `;
  }
}

// ============================================
// FORM VALIDATION & HANDLING
// ============================================
class FormHandler {
  constructor() {
    this.forms = document.querySelectorAll('[data-lead-form]');
    this.init();
  }

  init() {
    this.forms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleSubmit(e));

      // Real-time validation
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
      });
    });
  }

  validateField(field) {
    const errorDiv = field.parentElement.querySelector('.form-error');
    if (!errorDiv) return;

    errorDiv.textContent = '';

    if (field.hasAttribute('required') && !field.value.trim()) {
      errorDiv.textContent = 'This field is required';
      return false;
    }

    if (field.type === 'tel') {
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
        errorDiv.textContent = 'Please enter a valid 10-digit phone number';
        return false;
      }
    }

    if (field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        errorDiv.textContent = 'Please enter a valid email address';
        return false;
      }
    }

    return true;
  }

  async handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');

    // Validate all fields
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Form submitted:', data);

      // Show success with confetti
      this.showSuccess(form);
      form.reset();

    } catch (error) {
      this.showError('Something went wrong. Please try again.');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  showSuccess(form) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 30px;
      background: linear-gradient(135deg, #10b981, #14b8a6);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(16, 185, 129, 0.3);
      z-index: 9999;
      animation: slideInRight 0.5s ease-out;
    `;
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <div style="font-size: 1.5rem;">✓</div>
        <div>
          <div style="font-weight: 600;">Success!</div>
          <div style="font-size: 0.875rem; opacity: 0.9;">We'll contact you soon</div>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.5s ease-out';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }

  showError(message) {
    alert(message);
  }
}

// ============================================
// EXIT INTENT POPUP
// ============================================
class ExitIntentPopup {
  constructor() {
    this.popup = document.querySelector('.exit-popup');
    if (!this.popup) return;

    this.overlay = this.popup.querySelector('.modal-overlay');
    this.closeBtn = this.popup.querySelector('.modal-close');
    this.shown = localStorage.getItem('exitPopupShown') === 'true';

    this.init();
  }

  init() {
    if (this.shown) return;

    document.addEventListener('mouseleave', (e) => {
      if (e.clientY <= 0 && !this.shown) {
        this.show();
      }
    });

    // Mobile: show after 30 seconds
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        if (!this.shown) this.show();
      }, 30000);
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.hide());
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.hide();
      });
    }
  }

  show() {
    this.overlay.classList.add('active');
    this.shown = true;
    localStorage.setItem('exitPopupShown', 'true');
  }

  hide() {
    this.overlay.classList.remove('active');
  }
}

// ============================================
// NAVIGATION
// ============================================
class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');

    this.init();
  }

  init() {
    // Scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
    });

    // Mobile menu toggle
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => {
        this.navMenu.classList.toggle('active');
      });
    }

    // Close menu on link click
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.navMenu.classList.remove('active');
      });
    });

    // Smooth scroll
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }
}

// ============================================
// WHATSAPP INTEGRATION
// ============================================
function initWhatsApp() {
  const whatsappBtn = document.querySelector('.whatsapp-float');
  if (whatsappBtn) {
    whatsappBtn.href = 'https://wa.me/919551475177?text=Hi,%20I%20want%20to%20know%20about%20your%20courses';
  }
}

// ============================================
// INITIALIZE ALL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Core features
  new Navigation();
  new ScrollAnimations();
  new ScrollProgressBar();
  new FormHandler();
  new ExitIntentPopup();

  // Particle background
  if (document.getElementById('particles-canvas')) {
    new ParticleBackground('particles-canvas');
  }

  // Typing animation
  const typingElement = document.querySelector('[data-typing]');
  if (typingElement) {
    const texts = typingElement.dataset.typing.split('|');
    new TypingAnimation(typingElement, texts);
  }

  // Social proof notifications
  new SocialProofNotifications();

  // Testimonial slider
  new TestimonialSlider('.testimonial-slider');

  // Countdown timer
  new CountdownTimer('.countdown-timer');

  // Counter animations
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        entry.target.classList.add('counted');
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // Magnetic buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px) translateY(-4px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // Card spotlight effect
  document.querySelectorAll('.professional-card, .glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });

  // WhatsApp
  initWhatsApp();

  console.log('🚀 CSS Academy Premium Features Loaded');
});
