/**
 * AI Factory — Portal UI Logic
 * Sidebar collapse, mobile overlay, active nav, theme toggle
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Theme: init on every page load ── */
  if (typeof Theme !== 'undefined') {
    Theme.init();
  } else {
    // Fallback inline theme init if core.js loaded after
    const saved = localStorage.getItem('aif_theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
  }

  /* ── Theme toggle buttons ── */
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    // Set correct icon on load
    const current = localStorage.getItem('aif_theme') || 'light';
    btn.innerHTML = current === 'dark' ? '☀️' : '🌙';
    btn.title = current === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';

    btn.addEventListener('click', () => {
      if (typeof Theme !== 'undefined') {
        Theme.toggle();
        const next = localStorage.getItem('aif_theme') || 'light';
        document.querySelectorAll('.theme-toggle-btn').forEach(b => {
          b.innerHTML = next === 'dark' ? '☀️' : '🌙';
          b.title = next === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        });
      } else {
        const cur = document.documentElement.getAttribute('data-theme') || 'light';
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('aif_theme', next);
        document.querySelectorAll('.theme-toggle-btn').forEach(b => {
          b.innerHTML = next === 'dark' ? '☀️' : '🌙';
        });
      }
    });
  });

  /* ── Auth guard (reuse core.js Auth if available) ── */
  if (typeof Auth !== 'undefined') {
    const session = Auth.requireAuth();
    if (!session) return;
    const initials = session.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
    document.querySelectorAll('.js-user-initials').forEach(el => el.textContent = initials);
    document.querySelectorAll('.js-user-name').forEach(el => el.textContent = session.name);
  }

  /* ── Sidebar collapse ── */
  const sidebar   = document.getElementById('sidebar');
  const mainArea  = document.getElementById('portalMain');
  const collapseBtn = document.getElementById('collapseBtn');
  const COLLAPSED_KEY = 'aif_sidebar_collapsed';

  function setSidebarCollapsed(collapsed) {
    sidebar.classList.toggle('collapsed', collapsed);
    mainArea.classList.toggle('expanded', collapsed);
    localStorage.setItem(COLLAPSED_KEY, collapsed);
  }

  if (localStorage.getItem(COLLAPSED_KEY) === 'true') {
    setSidebarCollapsed(true);
  }

  collapseBtn?.addEventListener('click', () => {
    setSidebarCollapsed(!sidebar.classList.contains('collapsed'));
  });

  /* ── Mobile sidebar ── */
  const overlay   = document.getElementById('sbOverlay');
  const mobileBtn = document.getElementById('mobileMenuBtn');

  mobileBtn?.addEventListener('click', () => {
    sidebar.classList.add('mobile-open');
    overlay.classList.add('visible');
  });
  overlay?.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('visible');
  });

  /* ── Active nav highlighting ── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sb-item[data-page]').forEach(item => {
    if (item.dataset.page === currentPage) item.classList.add('active');
  });

  /* ── Logout ── */
  document.querySelectorAll('.js-logout').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof Auth !== 'undefined') Auth.logout();
      else window.location.href = 'login-page.html';
    });
  });

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-item summary').forEach(summary => {
    summary.addEventListener('click', () => {
      document.querySelectorAll('.faq-item[open]').forEach(other => {
        if (other !== summary.parentElement) other.removeAttribute('open');
      });
    });
  });

  /* ── CTA form ── */
  document.querySelectorAll('.cta-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.cta-submit');
      btn.textContent = "✓ Thanks — we'll reach out shortly!";
      btn.style.background = 'var(--accent-dark)';
      btn.disabled = true;
    });
  });

  /* ── Tab nav ── */
  document.querySelectorAll('.tab-nav').forEach(nav => {
    nav.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        nav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });

});
