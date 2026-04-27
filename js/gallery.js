/**
 * AI Factory — Industry Gallery Engine
 * Shared across all industry pages.
 * Each page defines its own USE_CASES array and calls initGallery().
 */

/* ── SVG icon paths for card thumbnails ── */
const ICON_MAP = {
  t1:'<path d="M19 14c0 4-3.5 6-7 6s-7-2-7-6V6c0-1 1-2 2-2h3"/><path d="M14 4h3c1 0 2 1 2 2v8"/><circle cx="19" cy="18" r="2"/><path d="M12 4v6"/><path d="M9 7h6"/>',
  t2:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12h2v5H9zM13 8h2v9h-2zM17 14h2v3h-2z"/>',
  t3:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  t4:'<path d="M21 15a4 4 0 01-4 4H7l-4 4V5a4 4 0 014-4h10a4 4 0 014 4z"/><circle cx="9" cy="10" r="1"/><circle cx="13" cy="10" r="1"/>',
  t5:'<path d="M3 3v18h18"/><circle cx="8" cy="16" r="2"/><circle cx="14" cy="10" r="2"/><circle cx="19" cy="7" r="2"/>',
  t6:'<path d="M10 3L3 10l6 6 7-7z"/><path d="M16 6l5 5-7 7-3-3"/>'
};

/* ── Render a single use-case card ── */
/* Uses portal.css class names: .agent-ribbon, .agent-thumb-version, .agent-cs-btn, .agent-action-btn */
function cardHTML(u, industryLabel) {
  const statusLabels = { consumed:'CONSUMED POC', new:'NEW', trending:'TRENDING' };
  const isNew = u.status === 'new';
  const label = statusLabels[u.status] || '';

  return `
  <article class="agent-card">
    <div class="agent-thumb ${u.tone}">
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${ICON_MAP[u.tone]}</svg>
      <div class="agent-ribbon${isNew ? ' is-new' : ''}">${label}</div>
      <div class="agent-thumb-version">v${u.ver}</div>
    </div>
    <div class="agent-body">
      <div class="agent-title">${u.title}</div>
      <div class="agent-meta">Industry: <b>${industryLabel}</b>${u.sub ? ' · ' + u.sub : ''}</div>
      <p class="agent-desc">${u.desc}</p>
      <div class="agent-footer">
        <a href="#" class="agent-cs-btn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>
          Case Study
        </a>
        <button class="agent-action-btn" title="Demo">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>
        <button class="agent-action-btn" title="Schedule POC">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        </button>
      </div>
    </div>
  </article>`;
}

/**
 * Initialize the gallery for a given page.
 * @param {Array}  useCases      - Array of use-case objects
 * @param {string} industryLabel - Display label e.g. "Healthcare"
 * @param {Array}  categories    - [{id, label, count}]
 * @param {Object} filters       - {groupId: {label, items:[{value,label,count}]}, ...}
 */
function initGallery(useCases, industryLabel, categories, filters) {
  const searchInput   = document.getElementById('searchInput');
  const countEl       = document.getElementById('count');
  const chipContainer = document.getElementById('categoryChips');
  const filterSidebar = document.getElementById('filterSidebar');
  const galleryGrid   = document.getElementById('galleryGrid');

  if (!searchInput || !galleryGrid) return;

  /* ── Build category chips ── */
  const total = useCases.length;
  chipContainer.innerHTML =
    `<button class="chip active" data-cat="all">All <span class="chip-n">${total}</span></button>` +
    categories.map(c =>
      `<button class="chip" data-cat="${c.id}">${c.label} <span class="chip-n">${c.count}</span></button>`
    ).join('');

  /* ── Build sidebar filters ── */
  filterSidebar.innerHTML = `
    <div class="filter-panel-head">
      <h4>Filter by</h4>
      <button class="clear-link" id="clearFilters">Clear all</button>
    </div>
    ${Object.entries(filters).map(([groupId, group]) => `
      <div class="filter-group">
        <div class="filter-group-title">${group.label}</div>
        ${group.items.map(item => `
          <label>
            <input type="checkbox" class="f" data-group="${groupId}" value="${item.value}">
            ${item.label}<span class="fn">${item.count}</span>
          </label>
        `).join('')}
      </div>
    `).join('')}
  `;

  /* ── Render filtered list ── */
  function render() {
    const q   = searchInput.value.trim().toLowerCase();
    const cat = chipContainer.querySelector('.chip.active').dataset.cat;

    /* Collect active sidebar filters */
    const active = {};
    Object.keys(filters).forEach(g => active[g] = []);
    filterSidebar.querySelectorAll('input.f:checked').forEach(el => {
      active[el.dataset.group].push(el.value);
    });

    const filtered = useCases.filter(u => {
      if (cat !== 'all' && u.cat !== cat) return false;
      if (q && !u.title.toLowerCase().includes(q) && !u.desc.toLowerCase().includes(q)) return false;
      for (const g of Object.keys(filters)) {
        if (active[g].length && u[g] && !active[g].some(v => u[g].includes(v))) return false;
      }
      return true;
    });

    countEl.textContent = filtered.length;
    galleryGrid.innerHTML = filtered.length
      ? filtered.map(u => cardHTML(u, industryLabel)).join('')
      : '<div class="gallery-empty">No use cases match your filters — try clearing some.</div>';
  }

  /* ── Event listeners ── */
  searchInput.addEventListener('input', render);

  chipContainer.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    chipContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    render();
  });

  filterSidebar.addEventListener('change', e => {
    if (e.target.classList.contains('f')) render();
  });

  filterSidebar.addEventListener('click', e => {
    if (e.target.id === 'clearFilters' || e.target.closest('#clearFilters')) {
      e.preventDefault();
      filterSidebar.querySelectorAll('input.f').forEach(i => i.checked = false);
      render();
    }
  });

  /* ── Initial render ── */
  render();
}
