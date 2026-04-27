/**
 * AI Factory — Core JavaScript
 * Handles: auth, theme, localStorage utilities
 */

'use strict';

/* ════════════════════════════════════════
   USER DATABASE (Demo)
   ════════════════════════════════════════
   Two test users:
   1. demo@aifactory.com  / Demo@123  → NO assigned industry → goes to landing
   2. health@aifactory.com / Health@123 → industry = "healthcare" → goes straight to healthcare.html
*/
const USERS_DB = [
  {
    id: 'u1',
    name: 'Alex Morgan',
    email: 'demo@aifactory.com',
    password: 'Demo@123',
    role: 'Platform Admin',
    industry: null          // No pre-assigned industry → landing page
  },
  {
    id: 'u2',
    name: 'Dr. Sarah Chen',
    email: 'health@aifactory.com',
    password: 'Health@123',
    role: 'Healthcare Lead',
    industry: 'healthcare'  // Pre-assigned → goes directly to healthcare.html
  }
];

/* ════════════════════════════════════════
   STORAGE HELPERS
   ════════════════════════════════════════ */
const Store = {
  get: (key) => {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
  },
  set: (key, val) => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
  },
  remove: (key) => {
    try { localStorage.removeItem(key); } catch {}
  }
};

/* ════════════════════════════════════════
   AUTH MODULE
   ════════════════════════════════════════ */
const Auth = {
  /**
   * Attempt login. Returns { success, user, error }
   */
  login(email, password, remember) {
    const user = USERS_DB.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) return { success: false, error: 'Invalid email or password.' };

    const session = {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      industry: user.industry
    };

    Store.set('aif_session', session);
    if (remember) Store.set('aif_remember', email);
    else Store.remove('aif_remember');

    return { success: true, user: session };
  },

  /** Get current logged-in user session */
  getSession() {
    return Store.get('aif_session');
  },

  /** Log out */
  logout() {
    Store.remove('aif_session');
    window.location.href = 'index.html';
  },

  /** Require auth — call on protected pages */
  requireAuth() {
    const session = Auth.getSession();
    if (!session) {
      window.location.href = 'index.html';
      return null;
    }
    return session;
  },

  /** Save selected industry for a session */
  setIndustry(industry) {
    const session = Auth.getSession();
    if (session) {
      session.industry = industry;
      Store.set('aif_session', session);
    }
  },

  /** Get selected industry */
  getIndustry() {
    const session = Auth.getSession();
    return session ? session.industry : null;
  }
};

/* ════════════════════════════════════════
   THEME MODULE
   ════════════════════════════════════════ */
const Theme = {
  KEY: 'aif_theme',

  /** Apply saved theme on page load */
  init() {
    const saved = Store.get(Theme.KEY) || 'light';
    Theme.apply(saved);
  },

  /** Apply a theme ('light' | 'dark') */
  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    Store.set(Theme.KEY, theme);
    // Update all toggle buttons on page
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.innerHTML = theme === 'dark'
        ? '<i class="bi bi-sun-fill"></i>'
        : '<i class="bi bi-moon-fill"></i>';
      btn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    });
  },

  /** Toggle between light and dark */
  toggle() {
    const current = Store.get(Theme.KEY) || 'light';
    Theme.apply(current === 'dark' ? 'light' : 'dark');
  },

  current() {
    return Store.get(Theme.KEY) || 'light';
  }
};

/* ════════════════════════════════════════
   TOAST MODULE
   ════════════════════════════════════════ */
const Toast = {
  show(message, type = 'info', duration = 3500) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const toast = document.createElement('div');
    toast.className = `toast-msg ${type}`;
    toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      toast.style.transition = 'all .3s ease';
      setTimeout(() => toast.remove(), 350);
    }, duration);
  }
};

/* ════════════════════════════════════════
   INDUSTRY PAGE REDIRECT HELPER
   ════════════════════════════════════════ */
const INDUSTRY_PAGES = {
  healthcare:    'healthcare.html',
  financial:     'financial.html',
  manufacturing: 'manufacturing.html',
  retail:        'retail.html',
  insurance:     'insurance.html'
};

function redirectToIndustry(industry) {
  const page = INDUSTRY_PAGES[industry];
  if (page) window.location.href = page;
}

/* ════════════════════════════════════════
   INIT THEME IMMEDIATELY
   ════════════════════════════════════════ */
Theme.init();

/* ════════════════════════════════════════
   POPULATE USER INFO IN UI
   ════════════════════════════════════════ */
function populateUserUI(session) {
  if (!session) return;
  // User name
  document.querySelectorAll('.user-name-display').forEach(el => el.textContent = session.name);
  document.querySelectorAll('.user-role-display').forEach(el => el.textContent = session.role);
  // User initials
  const initials = session.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
  document.querySelectorAll('.user-initials').forEach(el => el.textContent = initials);
}
