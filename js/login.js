/**
 * AI Factory — Login Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // ── Redirect if already logged in ──
  const existing = Auth.getSession();
  if (existing) {
    if (existing.industry) redirectToIndustry(existing.industry);
    else window.location.href = 'landing-page.html';
    return;
  }

  // ── Remember me: prefill email ──
  const remembered = localStorage.getItem('aif_remember');
  if (remembered) {
    const emailField = document.getElementById('email');
    if (emailField) {
      emailField.value = JSON.parse(remembered);
      document.getElementById('remember')?.setAttribute('checked', true);
    }
  }

  // ── Theme toggle ──
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => Theme.toggle());
  });

  // ── Form submit ──
  const form     = document.getElementById('loginForm');
  const emailEl  = document.getElementById('email');
  const passEl   = document.getElementById('password');
  const submitBtn = document.getElementById('loginBtn');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Signing in…';

    const email    = emailEl.value.trim();
    const password = passEl.value;
    const remember = document.getElementById('remember')?.checked || false;

    // Simulate slight delay for UX
    setTimeout(() => {
      const result = Auth.login(email, password, remember);

      if (!result.success) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bi bi-box-arrow-in-right"></i> Login';
        showFieldError('passwordError', result.error);
        passEl.classList.add('error');
        Toast.show(result.error, 'error');
        return;
      }

      Toast.show(`Welcome back, ${result.user.name}!`, 'success', 2000);

      // Redirect logic
      setTimeout(() => {
        if (result.user.industry) {
          redirectToIndustry(result.user.industry);
        } else {
          window.location.href = 'landing-page.html';
        }
      }, 800);
    }, 600);
  });

  // ── Real-time validation ──
  emailEl?.addEventListener('input', () => {
    clearFieldError('emailError');
    emailEl.classList.remove('error');
  });
  passEl?.addEventListener('input', () => {
    clearFieldError('passwordError');
    passEl.classList.remove('error');
  });

  // ── Guest login button ──
  document.getElementById('guestBtn')?.addEventListener('click', () => {
    emailEl.value = 'demo@aifactory.com';
    passEl.value  = 'Demo@123';
    Toast.show('Guest credentials filled — click Login!', 'info');
  });

  document.getElementById('guestBtn2')?.addEventListener('click', () => {
    emailEl.value = 'health@aifactory.com';
    passEl.value  = 'Health@123';
    Toast.show('Healthcare demo credentials filled — click Login!', 'info');
  });

  document.getElementById('guestBtn2')?.addEventListener('click', () => {
    emailEl.value = 'demo@aifactory.com';
    passEl.value  = 'Demo@123';
    Toast.show('Guest credentials filled — click Login!', 'info');
  });
});

/* ── Validation ── */
function validateForm() {
  let valid = true;

  const email = document.getElementById('email')?.value.trim();
  const pass  = document.getElementById('password')?.value;

  if (!email) {
    showFieldError('emailError', 'Email is required.');
    document.getElementById('email')?.classList.add('error');
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFieldError('emailError', 'Please enter a valid email address.');
    document.getElementById('email')?.classList.add('error');
    valid = false;
  }

  if (!pass) {
    showFieldError('passwordError', 'Password is required.');
    document.getElementById('password')?.classList.add('error');
    valid = false;
  } else if (pass.length < 6) {
    showFieldError('passwordError', 'Password must be at least 6 characters.');
    document.getElementById('password')?.classList.add('error');
    valid = false;
  }

  return valid;
}

function showFieldError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.classList.add('visible'); }
}
function clearFieldError(id) {
  const el = document.getElementById(id);
  if (el) { el.textContent = ''; el.classList.remove('visible'); }
}
