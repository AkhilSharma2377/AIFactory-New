/**
 * AI Factory — Landing Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // ── Auth guard ──
  const session = Auth.requireAuth();
  if (!session) return;

  // ── Populate user info ──
  populateUserUI(session);

  // ── Theme toggle ──
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => Theme.toggle());
  });

  // ── Logout ──
  document.querySelectorAll('.logout-btn').forEach(btn => {
    btn.addEventListener('click', () => Auth.logout());
  });

  // ── Industry card selection ──
  document.querySelectorAll('.industry-card').forEach(card => {
    card.addEventListener('click', () => {
      const industry = card.dataset.industryTarget;
      if (!industry) return;

      // Animate selected card
      card.style.transform = 'scale(0.97)';
      setTimeout(() => { card.style.transform = ''; }, 150);

      // Save & redirect
      Auth.setIndustry(industry);
      Toast.show(`Entering ${industry.charAt(0).toUpperCase() + industry.slice(1)} dashboard…`, 'success', 1500);
      setTimeout(() => redirectToIndustry(industry), 900);
    });
  });

  // ── Animate stats on scroll ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters(entry.target.querySelectorAll('[data-count]'));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.hero-stats').forEach(el => observer.observe(el));

  // ── Scroll-reveal ──
  initScrollReveal();
});

/* ── Animated number counters ── */
function animateCounters(elements) {
  elements.forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
    }, step);
  });
}

/* ── Scroll-reveal animation ── */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // If it's a stagger container, also reveal each child
        entry.target.querySelectorAll('.reveal-child').forEach((child, i) => {
          setTimeout(() => child.classList.add('revealed'), i * 80);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

/* ── Also trigger reveals that are already in viewport on load ── */
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('revealed');
      el.querySelectorAll('.reveal-child').forEach((child, i) => {
        setTimeout(() => child.classList.add('revealed'), i * 80);
      });
    }
  });
});
