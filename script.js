document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // Typewriter line setup
  // ==========================================================================
  const phrases = [
    "whoami → student, aspiring front-end developer",
    "status → learning modern javascript & layout design",
    "currently → experimenting with web projects & css layouts"
  ];
  const el = document.getElementById('typedOut');

  if (el) {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);

        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 2000); // Wait on fully typed text
          return;
        }
        setTimeout(tick, 45); // Typing speed
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);

        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, 500); // Visual pause when fully empty
          return;
        }
        setTimeout(tick, 15); // Deleting speed
      }
    }

    // Guard against animation layout shifts on low-end systems or reduced motion settings
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      tick();
    } else {
      el.textContent = phrases[0];
    }
  }

  // ==========================================================================
  // Theme management
  // ==========================================================================
  const toggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const themeLabel = document.getElementById('themeLabel');

  if (toggleBtn && themeIcon && themeLabel) {
    function syncToggleUI() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      themeIcon.textContent = isDark ? '☀' : '☾';
      themeLabel.textContent = isDark ? 'light' : 'dark';
    }

    // Initialize layout UI state
    syncToggleUI();

    toggleBtn.addEventListener('click', function() {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', next);
      
      try {
        localStorage.setItem('theme', next);
      } catch (e) {
        // Silently catch exceptions in sandboxed or local development setups
      }
      
      syncToggleUI();
    });
  }
});