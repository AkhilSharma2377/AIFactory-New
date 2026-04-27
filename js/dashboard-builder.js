/**
 * AI Factory — Dashboard Page Builder
 * Generates the sidebar HTML shared across all industry pages
 */

/**
 * Returns the full sidebar HTML string for a given industry config
 * @param {Object} config
 */
function buildSidebarHTML(config) {
  return `
  <!-- Sidebar overlay (mobile) -->
  <div class="sidebar-overlay" id="sidebarOverlay"></div>

  <!-- SIDEBAR -->
  <aside class="sidebar" id="sidebar">
    <!-- Brand -->
    <div class="sidebar-brand">
      <div class="sidebar-brand-icon">
        <i class="bi bi-lightning-charge-fill"></i>
      </div>
      <div class="sidebar-brand-text">
        AI Factory
        <span>Enterprise Platform</span>
      </div>
    </div>

    <!-- Industry Badge -->
    <div class="sidebar-industry-badge">
      <div class="badge-icon">${config.icon}</div>
      <div class="badge-text">${config.name}</div>
    </div>

    <!-- Nav -->
    <nav class="sidebar-nav">
      <div class="nav-section-label">Main</div>

      <a class="nav-item active" href="${config.page}" data-page="${config.page}">
        <span class="nav-icon"><i class="bi bi-grid-1x2-fill"></i></span>
        <span class="nav-label">Dashboard</span>
      </a>
      <a class="nav-item" href="#ai-journey-section" data-page="journey">
        <span class="nav-icon"><i class="bi bi-diagram-3-fill"></i></span>
        <span class="nav-label">AI Journey</span>
      </a>
      <a class="nav-item" href="#agents-section" data-page="agents">
        <span class="nav-icon"><i class="bi bi-robot"></i></span>
        <span class="nav-label">AI Agents</span>
      </a>
      <a class="nav-item" href="#" data-page="analytics">
        <span class="nav-icon"><i class="bi bi-graph-up-arrow"></i></span>
        <span class="nav-label">Analytics</span>
      </a>

      <div class="nav-section-label">Industries</div>
      <a class="nav-item industry-nav-link" href="healthcare.html" data-industry="healthcare">
        <span class="nav-icon">🏥</span>
        <span class="nav-label">Healthcare</span>
      </a>
      <a class="nav-item industry-nav-link" href="financial.html" data-industry="financial">
        <span class="nav-icon">💳</span>
        <span class="nav-label">Financial</span>
      </a>
      <a class="nav-item industry-nav-link" href="manufacturing.html" data-industry="manufacturing">
        <span class="nav-icon">🏭</span>
        <span class="nav-label">Manufacturing</span>
      </a>
      <a class="nav-item industry-nav-link" href="retail.html" data-industry="retail">
        <span class="nav-icon">🛍️</span>
        <span class="nav-label">Retail</span>
      </a>
      <a class="nav-item industry-nav-link" href="insurance.html" data-industry="insurance">
        <span class="nav-icon">🛡️</span>
        <span class="nav-label">Insurance</span>
      </a>

      <div class="nav-section-label">Settings</div>
      <a class="nav-item back-to-landing" href="landing-page.html">
        <span class="nav-icon"><i class="bi bi-arrow-left-circle"></i></span>
        <span class="nav-label">All Industries</span>
      </a>
      <a class="nav-item logout-btn" href="#">
        <span class="nav-icon"><i class="bi bi-box-arrow-right"></i></span>
        <span class="nav-label">Logout</span>
      </a>
    </nav>

    <!-- User -->
    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="sidebar-user-avatar user-initials">AM</div>
        <div class="sidebar-user-info">
          <div class="sidebar-user-name user-name-display">Alex Morgan</div>
          <div class="sidebar-user-role user-role-display">Platform Admin</div>
        </div>
      </div>
    </div>
  </aside>`;
}

/**
 * Returns the top navbar HTML
 */
function buildNavbarHTML(industryName) {
  return `
  <!-- TOP NAVBAR -->
  <nav class="top-navbar" id="topNavbar">
    <div class="navbar-left">
      <button class="collapse-btn" id="collapseBtn" title="Toggle sidebar">
        <i class="bi bi-layout-sidebar-inset"></i>
      </button>
      <button class="collapse-btn d-lg-none" id="mobileMenuBtn" title="Open menu">
        <i class="bi bi-list"></i>
      </button>
      <div class="breadcrumb-wrap">
        <span class="bc-parent">AI Factory</span>
        <span class="bc-sep">/</span>
        <span class="bc-current">${industryName} Dashboard</span>
      </div>
    </div>
    <div class="navbar-right">
      <button class="nav-icon-btn" title="Notifications">
        <i class="bi bi-bell"></i>
        <span class="notif-dot"></span>
      </button>
      <button class="nav-icon-btn" title="Help">
        <i class="bi bi-question-circle"></i>
      </button>
      <button class="theme-toggle" title="Toggle theme">
        <i class="bi bi-moon-fill"></i>
      </button>
      <div class="navbar-user-chip">
        <div class="chip-avatar user-initials">AM</div>
        <span class="chip-name user-name-display">Alex Morgan</span>
        <i class="bi bi-chevron-down" style="font-size:.7rem;color:var(--text-muted);"></i>
      </div>
    </div>
  </nav>`;
}
