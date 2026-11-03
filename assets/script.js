/* ============================================================
   DigiBoost Gujarat — Main JavaScript
   Features:
   - Mobile hamburger navigation
   - Smooth scrolling
   - Contact form validation
   - Active nav highlighting
   - Scroll-triggered fade-in animations
   - Navbar scroll state
   - FAQ accordion
   ============================================================ */

'use strict';

/* ── Utility: DOM ready ── */
function ready(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

ready(function () {
  initNavbar();
  initMobileMenu();
  initActiveNav();
  initSmoothScroll();
  initScrollAnimations();
  initFAQ();
  initContactForm();
});

/* ── Navbar scroll shadow ── */
function initNavbar() {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ── Mobile Hamburger Menu ── */
function initMobileMenu() {
  var hamburger   = document.querySelector('.hamburger');
  var mobileMenu  = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', function () {
    var isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* Close when a link inside is clicked */
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  /* Close on outside click */
  document.addEventListener('click', function (e) {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMobileMenu();
    }
  });

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

/* ── Active Navigation Highlighting ── */
function initActiveNav() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';

  /* Normalize: empty or '/' → index.html */
  if (currentPage === '' || currentPage === '/') currentPage = 'index.html';

  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (link) {
    var href = link.getAttribute('href') || '';
    var linkPage = href.split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}

/* ── Smooth Scrolling for anchor links ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 70;
      var top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
}

/* ── Scroll-Triggered Fade-In Animations ── */
function initScrollAnimations() {
  var elements = document.querySelectorAll('.fade-in, .fade-in-left');
  if (!elements.length) return;

  var navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 70;

  function checkVisibility() {
    var windowBottom = window.scrollY + window.innerHeight;
    elements.forEach(function (el) {
      var elTop = el.getBoundingClientRect().top + window.scrollY;
      if (windowBottom > elTop + 60) {
        el.classList.add('visible');
      }
    });
  }

  /* Stagger children in grids */
  document.querySelectorAll('.grid-3, .grid-2, .grid-4, .stats-grid').forEach(function (grid) {
    grid.querySelectorAll('.fade-in').forEach(function (child, i) {
      child.style.transitionDelay = (i * 0.10) + 's';
    });
  });

  window.addEventListener('scroll', checkVisibility, { passive: true });
  checkVisibility(); /* run once on load */
}

/* ── FAQ Accordion ── */
function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer   = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      /* Close all others */
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').classList.remove('open');
      });

      /* Toggle this one */
      if (!isOpen) {
        item.classList.add('open');
        answer.classList.add('open');
      }
    });
  });
}

/* ── Contact Form Validation ── */
function initContactForm() {
  var form = document.getElementById('contactForm');
  if (!form) return;

  var successMsg = document.getElementById('formSuccess');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validateForm(form)) {
      /* In production: hook up Formspree or similar */
      if (successMsg) {
        successMsg.style.display = 'flex';
        form.reset();
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        alert('Thank you! We will contact you within 2 hours during business hours.');
        form.reset();
      }
    }
  });

  /* Live validation on blur */
  form.querySelectorAll('input, select, textarea').forEach(function (field) {
    field.addEventListener('blur', function () {
      validateField(field);
    });
    field.addEventListener('input', function () {
      if (field.classList.contains('error')) validateField(field);
    });
  });
}

function validateForm(form) {
  var valid = true;
  form.querySelectorAll('[data-required]').forEach(function (field) {
    if (!validateField(field)) valid = false;
  });
  return valid;
}

function validateField(field) {
  var errorEl = field.parentElement.querySelector('.error-msg');
  var value   = field.value.trim();
  var type    = field.getAttribute('data-validate') || field.type;
  var valid   = true;
  var msg     = '';

  if (field.hasAttribute('data-required') && !value) {
    valid = false;
    msg   = 'This field is required.';
  } else if (value && type === 'email') {
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(value)) {
      valid = false;
      msg   = 'Please enter a valid email address.';
    }
  } else if (value && (type === 'phone' || field.id === 'phone')) {
    /* Accept formats: 10-digit, +91-XXXXXXXXXX, 91-XXXXXXXXXX */
    var phoneRe = /^(\+91[\-\s]?|91[\-\s]?|0)?[6-9]\d{9}$/;
    if (!phoneRe.test(value.replace(/\s/g, ''))) {
      valid = false;
      msg   = 'Please enter a valid Indian mobile number (10 digits).';
    }
  }

  if (errorEl) {
    errorEl.textContent = msg;
    if (valid) {
      errorEl.classList.remove('visible');
    } else {
      errorEl.classList.add('visible');
    }
  }
  field.classList.toggle('error', !valid);
  return valid;
}
