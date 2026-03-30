/* Form backend: Configure with Formspree (formspree.io) or Netlify Forms */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ── Reduced Motion Check ──────────────────────────────────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    const fadeEls = document.querySelectorAll('.fade-up');
    fadeEls.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  // ── Navigation ────────────────────────────────────────────────────
  const nav = document.querySelector('.nav');
  const menuToggle = document.querySelector('.nav__toggle');
  const mobileMenu = document.querySelector('.nav__menu');
  const navLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
  const dropdownToggles = document.querySelectorAll('.nav__dropdown-toggle');

  const openMobileMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.classList.contains('active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  document.addEventListener('click', (e) => {
    if (!mobileMenu || !menuToggle) return;
    if (
      mobileMenu.classList.contains('active') &&
      !mobileMenu.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  // Dropdown: hover for desktop, click for mobile
  dropdownToggles.forEach((toggle) => {
    const parent = toggle.parentElement;
    if (!parent) return;

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isTouch = window.matchMedia('(hover: none)').matches;
      if (isTouch) {
        parent.classList.toggle('dropdown--open');
      }
    });

    parent.addEventListener('mouseenter', () => {
      const isTouch = window.matchMedia('(hover: none)').matches;
      if (!isTouch) {
        parent.classList.add('dropdown--open');
      }
    });

    parent.addEventListener('mouseleave', () => {
      const isTouch = window.matchMedia('(hover: none)').matches;
      if (!isTouch) {
        parent.classList.remove('dropdown--open');
      }
    });
  });

  // Scroll-based nav styling
  const handleNavScroll = () => {
    if (!nav) return;
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ── Scroll Animations (GSAP) ─────────────────────────────────────
  if (!prefersReducedMotion && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-up elements
    const fadeUpEls = document.querySelectorAll('.fade-up');
    fadeUpEls.forEach((el) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 40 });
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    });

    // Staggered grid cards
    const grids = document.querySelectorAll('.grid');
    grids.forEach((grid) => {
      if (!grid) return;
      const cards = grid.querySelectorAll('.card');
      if (cards.length === 0) return;

      cards.forEach((card) => {
        gsap.set(card, { opacity: 0, y: 40 });
      });

      gsap.to(cards, {
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
      });
    });
  }

  // ── Stats Counter Animation ───────────────────────────────────────
  const statsBar = document.querySelector('.stats');
  if (statsBar) {
    const statNumbers = statsBar.querySelectorAll('[data-count]');
    let statsAnimated = false;

    const animateStats = () => {
      if (statsAnimated) return;
      statsAnimated = true;

      statNumbers.forEach((el) => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(target)) return;

        const duration = 2000;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          el.textContent = current + '+';

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = target + '+';
          }
        };

        requestAnimationFrame(updateCount);
      });
    };

    if (!prefersReducedMotion && typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: statsBar,
        start: 'top 85%',
        onEnter: animateStats,
      });
    } else {
      statNumbers.forEach((el) => {
        const target = el.getAttribute('data-count');
        el.textContent = target + '+';
      });
    }
  }

  // ── FAQ Accordion ─────────────────────────────────────────────────
  const faqQuestions = document.querySelectorAll('.faq__question');
  faqQuestions.forEach((question) => {
    question.addEventListener('click', () => {
      const parentItem = question.closest('.faq__item');
      if (!parentItem) return;

      const isActive = parentItem.classList.contains('active');
      const answer = parentItem.querySelector('.faq__answer');

      // Close all other items
      const allItems = document.querySelectorAll('.faq__item');
      allItems.forEach((item) => {
        if (item !== parentItem) {
          item.classList.remove('active');
          const otherAnswer = item.querySelector('.faq__answer');
          if (otherAnswer) {
            otherAnswer.style.maxHeight = '0';
          }
        }
      });

      // Toggle current item
      if (isActive) {
        parentItem.classList.remove('active');
        if (answer) {
          answer.style.maxHeight = '0';
        }
      } else {
        parentItem.classList.add('active');
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      }
    });
  });

  // ── Gallery Filter ────────────────────────────────────────────────
  const filterButtons = document.querySelectorAll('[data-filter]');
  const galleryItems = document.querySelectorAll('.gallery-grid__item');

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter items
        galleryItems.forEach((item) => {
          const category = item.getAttribute('data-category');
          const shouldShow = filter === 'all' || category === filter;

          if (shouldShow) {
            item.style.opacity = '0';
            item.style.display = '';
            requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.3s ease';
              item.style.opacity = '1';
            });
          } else {
            item.style.transition = 'opacity 0.3s ease';
            item.style.opacity = '0';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ── Hero Frame Animation ──────────────────────────────────────────
  const canvas = document.getElementById('heroFrameCanvas');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    const frameCount = 120;
    const images = [];
    let loadedCount = 0;
    let currentFrame = -1;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `assets/frames/frame_${String(i).padStart(4, '0')}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          initScrollAnimation();
        }
      };
      images.push(img);
    }

    const drawFrame = (index) => {
      if (index === currentFrame) return;
      currentFrame = index;
      const img = images[index];
      if (!img || !img.complete) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);

      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const scale = Math.max(cw / iw, ch / ih);
      const x = (cw - iw * scale) / 2;
      const y = (ch - ih * scale) / 2;

      ctx.drawImage(img, x, y, iw * scale, ih * scale);
    };

    const initScrollAnimation = () => {
      const track = document.querySelector('.hero-scroll__track');
      if (!track) return;

      ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const frameIndex = Math.min(
            Math.floor(self.progress * frameCount),
            frameCount - 1
          );
          requestAnimationFrame(() => drawFrame(frameIndex));

          const finalCta = document.querySelector('.hero-scroll__final-cta');
          if (finalCta) {
            finalCta.style.display = self.progress > 0.85 ? 'block' : 'none';
          }
        },
      });

      drawFrame(0);
    };
  }

  // ── Smooth Scroll for Anchor Links ────────────────────────────────
  const NAV_HEIGHT_OFFSET = 80;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - NAV_HEIGHT_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ── Contact Form Validation ───────────────────────────────────────
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const showError = (input, message) => {
      const errorId = input.getAttribute('aria-describedby');
      const errorEl = errorId ? document.getElementById(errorId) : null;
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
      }
      input.classList.add('input--error');
    };

    const clearError = (input) => {
      const errorId = input.getAttribute('aria-describedby');
      const errorEl = errorId ? document.getElementById(errorId) : null;
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
      }
      input.classList.remove('input--error');
    };

    const validateField = (input) => {
      const value = input.value.trim();
      const type = input.type;
      const isRequired = input.hasAttribute('required');

      if (isRequired && value === '') {
        showError(input, 'This field is required.');
        return false;
      }

      if (type === 'email' && value !== '') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          showError(input, 'Please enter a valid email address.');
          return false;
        }
      }

      if (type === 'tel' && value !== '') {
        const phonePattern = /^[+\d\s()-]{7,20}$/;
        if (!phonePattern.test(value)) {
          showError(input, 'Please enter a valid phone number.');
          return false;
        }
      }

      clearError(input);
      return true;
    };

    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach((input) => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('input--error')) {
          validateField(input);
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      inputs.forEach((input) => {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) return;

      const successMsg = document.querySelector('.contact-form__success');
      if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.textContent = 'Thank you! Your message has been sent. We\'ll be in touch shortly.';
      }

      contactForm.reset();
      inputs.forEach((input) => clearError(input));
    });
  }

  // ── Back to Top Button ────────────────────────────────────────────
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    const handleBackToTopVisibility = () => {
      if (window.scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
    handleBackToTopVisibility();

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
