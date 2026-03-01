/* =============================================
   NITISH KUMAR PANDEY – CV WEBSITE JAVASCRIPT
   - Navbar scroll effect
   - Counter animation
   - Skill bar animation
   - Timeline / scroll reveal
   - Contact form (WhatsApp / LinkedIn / Email)
   - Particle system
   - Mobile hamburger menu
   ============================================= */

'use strict';

/* ===== DOM READY ===== */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  initParticles();
  initScrollReveal();
  initCounters();
  initContactForm();
  setActiveNavLink();
});

/* =============================================
   NAVBAR – scroll behaviour
   ============================================= */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* =============================================
   MOBILE HAMBURGER
   ============================================= */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

/* =============================================
   ACTIVE NAV LINK on scroll
   ============================================= */
function setActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* =============================================
   FLOATING PARTICLES (hero)
   ============================================= */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 20;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      --duration: ${Math.random() * 12 + 6}s;
      --delay: ${Math.random() * 8}s;
    `;
    container.appendChild(p);
  }
}

/* =============================================
   SCROLL REVEAL – skill bars, timeline, cards
   ============================================= */
function initScrollReveal() {
  // Skill cards with fill bars
  const skillCards = document.querySelectorAll('.skill-card');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const delay = parseInt(card.dataset.delay || 0);
        const fill = card.querySelector('.skill-fill');
        const width = fill ? fill.dataset.width : 0;

        setTimeout(() => {
          card.classList.add('animated');
          if (fill) {
            setTimeout(() => {
              fill.style.width = `${width}%`;
            }, 200);
          }
        }, delay);

        skillObserver.unobserve(card);
      }
    });
  }, { threshold: 0.08 });

  skillCards.forEach(card => skillObserver.observe(card));

  // Timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const item = entry.target;
        const delay = parseInt(item.dataset.delay || 0);
        setTimeout(() => item.classList.add('animated'), delay);
        tlObserver.unobserve(item);
      }
    });
  }, { threshold: 0.15 });

  timelineItems.forEach(item => tlObserver.observe(item));

  // Generic fade-in elements
  const fadeEls = document.querySelectorAll('.about-card, .contact-info-card, .highlight-item');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fade-in-up 0.6s cubic-bezier(0.4,0,0.2,1) both';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => fadeObserver.observe(el));
}

/* =============================================
   COUNTER ANIMATION (hero stats)
   ============================================= */
function initCounters() {
  const counters = document.querySelectorAll('.stat-value[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const step = 60;
  const steps = Math.ceil(duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current++;
    const value = Math.round(easeOutQuart(current / steps) * target);
    el.textContent = value;

    if (current >= steps) {
      el.textContent = target;
      clearInterval(timer);
    }
  }, step);
}

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

/* =============================================
   CONTACT FORM
   ============================================= */
function initContactForm() {
  const whatsappBtn = document.getElementById('sendWhatsApp');
  const emailBtn = document.getElementById('sendEmail');
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');

  // My contact info
  const WHATSAPP_NUMBER = '919234770717';
  const MY_EMAIL = 'nitishkumar.nk.np@gmail.com';

  let activeChannel = 'whatsapp';

  const allChannelBtns = [whatsappBtn, emailBtn];

  function setActiveChannel(btn, channel) {
    allChannelBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeChannel = channel;
  }

  whatsappBtn.addEventListener('click', () => setActiveChannel(whatsappBtn, 'whatsapp'));
  emailBtn.addEventListener('click', () => setActiveChannel(emailBtn, 'email'));

  // Form submission via channel buttons acts as the submit action
  allChannelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Validate on channel button click too
      if (!form.checkValidity()) {
        const name = document.getElementById('senderName').value.trim();
        const email = document.getElementById('senderEmail').value.trim();
        const message = document.getElementById('senderMessage').value.trim();

        if (!name || !email || !message) {
          showStatus('error', '⚠️ Please fill in your name, email, and message first.');
          return;
        }
      }
    });
  });

  // Intercept any "send" button – we make channel buttons do double duty:
  // First click selects channel; double-click or re-click after filling form sends it.
  allChannelBtns.forEach(btn => {
    btn.addEventListener('dblclick', () => {
      submitForm();
    });
  });

  // Wire up the static Send button in HTML
  const realSubmitBtn = document.getElementById('realSubmitBtn');
  if (realSubmitBtn) realSubmitBtn.addEventListener('click', submitForm);

  function submitForm() {
    hideStatus();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const message = document.getElementById('senderMessage').value.trim();

    // Validation
    if (!name) {
      showStatus('error', '⚠️ Please enter your full name.');
      document.getElementById('senderName').focus();
      return;
    }

    if (!email || !isValidEmail(email)) {
      showStatus('error', '⚠️ Please enter a valid email address.');
      document.getElementById('senderEmail').focus();
      return;
    }

    if (!message) {
      showStatus('error', '⚠️ Please write a message before sending.');
      document.getElementById('senderMessage').focus();
      return;
    }

    // Route by channel
    if (activeChannel === 'whatsapp') {
      sendViaWhatsApp(name, email, message);
    } else if (activeChannel === 'email') {
      sendViaEmail(name, email, message);
    }
  }

  function sendViaWhatsApp(name, email, message) {
    const text = encodeURIComponent(
      `👋 Hi Nitish!

I came across your portfolio and would love to connect.

*Name:* ${name}
*Email:* ${email}

*Message:*
${message}

Looking forward to hearing from you! 🙏`
    );
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showStatus('success', '✅ Opening WhatsApp... Your message is pre-filled and ready to send!');
    clearForm();
  }

  function sendViaEmail(name, email, message) {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Hi Nitish,

I found your portfolio and wanted to reach out.

Name: ${name}
Email: ${email}

Message:
${message}

Best regards,
${name}`
    );
    window.open(`mailto:${MY_EMAIL}?subject=${subject}&body=${body}`, '_self');
    showStatus('success', '✅ Opening your email client... Your message is pre-filled!');
    clearForm();
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showStatus(type, msg) {
    statusEl.textContent = msg;
    statusEl.className = `form-status ${type}`;
    statusEl.style.display = 'block';

    if (type === 'success') {
      setTimeout(hideStatus, 6000);
    }
  }

  function hideStatus() {
    statusEl.className = 'form-status';
    statusEl.style.display = 'none';
  }

  function clearForm() {
    document.getElementById('senderName').value = '';
    document.getElementById('senderEmail').value = '';
    document.getElementById('senderMessage').value = '';
  }
}

/* =============================================
   SMOOTH ANCHOR SCROLL (fallback for older browsers)
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
