/**
 * AI Factory — Dashboard Shared Logic
 * Used by all industry pages
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

  // ── Sidebar collapse toggle ──
  const sidebar    = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  const navbar     = document.getElementById('topNavbar');
  const collapseBtn = document.getElementById('collapseBtn');

  collapseBtn?.addEventListener('click', () => {
    const isCollapsed = sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('sidebar-collapsed', isCollapsed);
    navbar.classList.toggle('sidebar-collapsed', isCollapsed);
    localStorage.setItem('aif_sidebar_collapsed', isCollapsed);
  });

  // Restore sidebar state
  if (localStorage.getItem('aif_sidebar_collapsed') === 'true') {
    sidebar?.classList.add('collapsed');
    mainContent?.classList.add('sidebar-collapsed');
    navbar?.classList.add('sidebar-collapsed');
  }

  // ── Mobile sidebar ──
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  mobileMenuBtn?.addEventListener('click', () => {
    sidebar?.classList.add('mobile-open');
    sidebarOverlay?.classList.add('visible');
  });
  sidebarOverlay?.addEventListener('click', () => {
    sidebar?.classList.remove('mobile-open');
    sidebarOverlay?.classList.remove('visible');
  });

  // ── Active nav item highlight ──
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    if (item.dataset.page === currentPage) {
      item.classList.add('active');
    }
  });

  // ── AI Journey Stepper ──
  initJourneyStepper();

  // ── Metric bars animation ──
  animateMetricBars();

  // ── Progress rings ──
  animateProgressRings();

  // ── Sidebar industry links ──
  document.querySelectorAll('.industry-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const industry = link.dataset.industry;
      if (industry) {
        Auth.setIndustry(industry);
        // href handles navigation
      }
    });
  });

  // ── Back to landing ──
  document.querySelectorAll('.back-to-landing').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'landing-page.html';
    });
  });
});

/* ════════════════════════════════════════
   AI JOURNEY STEPPER
   ════════════════════════════════════════ */
const JOURNEY_STEPS = [
  {
    id: 'problem',
    label: 'Problem\nIdentification',
    icon: '🔍',
    title: 'Problem Identification',
    desc: 'Define business challenges and AI opportunity areas with stakeholder alignment.',
    tasks: [
      { icon: '📋', title: 'Stakeholder Interviews', desc: 'Gather requirements from key business users and decision makers.' },
      { icon: '📊', title: 'Gap Analysis', desc: 'Identify gaps between current state and desired AI-powered outcomes.' },
      { icon: '🎯', title: 'Success Metrics', desc: 'Define clear KPIs and measurable success criteria for the AI solution.' },
      { icon: '⚖️', title: 'Feasibility Study', desc: 'Assess technical feasibility, budget, and timeline requirements.' }
    ]
  },
  {
    id: 'data',
    label: 'Data\nCollection',
    icon: '🗄️',
    title: 'Data Collection & Preparation',
    desc: 'Gather, clean, and structure high-quality datasets to power your AI models.',
    tasks: [
      { icon: '🔗', title: 'Data Source Mapping', desc: 'Identify and connect all relevant internal and external data sources.' },
      { icon: '🧹', title: 'Data Cleaning', desc: 'Remove duplicates, handle missing values, and normalize formats.' },
      { icon: '🔒', title: 'Privacy & Compliance', desc: 'Ensure data handling meets regulatory requirements (HIPAA, GDPR, etc.).' },
      { icon: '🏷️', title: 'Data Labeling', desc: 'Annotate and label datasets for supervised learning tasks.' }
    ]
  },
  {
    id: 'poc',
    label: 'Custom\nPOC',
    icon: '🧪',
    title: 'Proof of Concept (POC)',
    desc: 'Build a rapid prototype to validate the AI approach and demonstrate value.',
    tasks: [
      { icon: '⚡', title: 'Rapid Prototyping', desc: 'Build a minimal viable AI prototype in 2–4 weeks.' },
      { icon: '🏗️', title: 'Architecture Design', desc: 'Design scalable cloud-native architecture with Azure AI services.' },
      { icon: '🤖', title: 'Model Selection', desc: 'Choose the right foundation models (GPT-4o, Claude, custom ML).' },
      { icon: '📈', title: 'Business Case', desc: 'Validate ROI projections and present to stakeholders.' }
    ]
  },
  {
    id: 'training',
    label: 'Model\nTraining',
    icon: '🧠',
    title: 'Model Training',
    desc: 'Fine-tune and train AI models on your domain-specific data for optimal performance.',
    tasks: [
      { icon: '🎛️', title: 'Hyperparameter Tuning', desc: 'Optimize model parameters for best performance on your dataset.' },
      { icon: '🔄', title: 'Transfer Learning', desc: 'Leverage pre-trained models and fine-tune for your use case.' },
      { icon: '⚙️', title: 'MLOps Pipeline', desc: 'Set up automated training pipelines with version control.' },
      { icon: '📦', title: 'Model Registry', desc: 'Version and store trained models in a centralized registry.' }
    ]
  },
  {
    id: 'testing',
    label: 'Testing &\nValidation',
    icon: '✅',
    title: 'Testing & Validation',
    desc: 'Rigorously test AI models for accuracy, bias, and real-world performance.',
    tasks: [
      { icon: '🎯', title: 'Accuracy Testing', desc: 'Measure precision, recall, F1-score against holdout test sets.' },
      { icon: '⚠️', title: 'Bias Detection', desc: 'Identify and mitigate potential biases in model outputs.' },
      { icon: '🌐', title: 'Edge Case Testing', desc: 'Test model behavior on rare, extreme, and adversarial inputs.' },
      { icon: '👥', title: 'User Acceptance Testing', desc: 'Validate performance with real end users in staging environment.' }
    ]
  },
  {
    id: 'deployment',
    label: 'Deployment',
    icon: '🚀',
    title: 'Deployment',
    desc: 'Deploy AI solutions to production with enterprise-grade reliability and scalability.',
    tasks: [
      { icon: '☁️', title: 'Cloud Deployment', desc: 'Deploy to Azure, AWS, or hybrid cloud with auto-scaling.' },
      { icon: '🔌', title: 'API Integration', desc: 'Expose model as REST APIs and integrate with existing systems.' },
      { icon: '🛡️', title: 'Security Hardening', desc: 'Implement authentication, authorization, and data encryption.' },
      { icon: '📋', title: 'CI/CD Pipeline', desc: 'Automate build, test, and deployment workflows.' }
    ]
  },
  {
    id: 'monitoring',
    label: 'Monitoring &\nOptimization',
    icon: '📡',
    title: 'Monitoring & Optimization',
    desc: 'Continuously monitor model performance and optimize for evolving business needs.',
    tasks: [
      { icon: '📊', title: 'Performance Dashboards', desc: 'Real-time monitoring of model accuracy, latency, and throughput.' },
      { icon: '🔔', title: 'Alerting & Anomaly Detection', desc: 'Automated alerts for model drift, errors, and performance degradation.' },
      { icon: '🔁', title: 'Model Retraining', desc: 'Schedule periodic retraining with fresh data to maintain accuracy.' },
      { icon: '💰', title: 'Cost Optimization', desc: 'Analyze and optimize cloud resource usage and inference costs.' }
    ]
  }
];

function initJourneyStepper() {
  const stepper = document.getElementById('journeyStepper');
  const detailPanel = document.getElementById('journeyDetail');
  if (!stepper || !detailPanel) return;

  // Build stepper HTML
  stepper.innerHTML = JOURNEY_STEPS.map((step, i) => `
    <div class="step-item ${i <= 2 ? 'completed' : ''} ${i === 3 ? 'active' : ''}"
         data-step="${step.id}" data-index="${i}">
      <div class="step-circle">
        ${i < 3 ? '<i class="bi bi-check-lg"></i>' : step.icon}
      </div>
      <div class="step-label">${step.label}</div>
    </div>
  `).join('');

  // Click handlers
  stepper.querySelectorAll('.step-item').forEach(item => {
    item.addEventListener('click', () => {
      const stepId = item.dataset.step;
      const stepData = JOURNEY_STEPS.find(s => s.id === stepId);
      if (!stepData) return;

      // Update active state
      stepper.querySelectorAll('.step-item').forEach(s => s.classList.remove('active'));
      item.classList.add('active');

      // Render detail
      renderJourneyDetail(stepData, detailPanel);
    });
  });

  // Show first active step detail by default
  const activeStep = stepper.querySelector('.step-item.active') ||
                     stepper.querySelector('.step-item');
  activeStep?.click();
}

function renderJourneyDetail(step, panel) {
  panel.classList.remove('visible');
  setTimeout(() => {
    panel.innerHTML = `
      <div class="journey-detail-header">
        <div class="journey-detail-icon">${step.icon}</div>
        <div>
          <h3>${step.title}</h3>
          <p>${step.desc}</p>
        </div>
      </div>
      <div class="journey-tasks">
        ${step.tasks.map(task => `
          <div class="journey-task">
            <div class="journey-task-icon">${task.icon}</div>
            <h5>${task.title}</h5>
            <p>${task.desc}</p>
          </div>
        `).join('')}
      </div>
    `;
    panel.classList.add('visible');
  }, 50);
}

/* ════════════════════════════════════════
   METRIC BARS ANIMATION
   ════════════════════════════════════════ */
function animateMetricBars() {
  const bars = document.querySelectorAll('.metric-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.dataset.target || '0';
        entry.target.style.width = target + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  bars.forEach(bar => observer.observe(bar));
}

/* ════════════════════════════════════════
   PROGRESS RINGS
   ════════════════════════════════════════ */
function animateProgressRings() {
  document.querySelectorAll('.progress-ring-fill').forEach(ring => {
    const radius = parseFloat(ring.getAttribute('r') || 34);
    const circumference = 2 * Math.PI * radius;
    const pct = parseFloat(ring.dataset.pct || 0);

    ring.style.strokeDasharray  = circumference;
    ring.style.strokeDashoffset = circumference;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          ring.style.strokeDashoffset = circumference - (pct / 100) * circumference;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(ring);
  });
}
