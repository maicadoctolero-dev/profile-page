document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // Typewriter
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
          setTimeout(tick, 2000);
          return;
        }
        setTimeout(tick, 45);
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, 500);
          return;
        }
        setTimeout(tick, 15);
      }
    }
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) { tick(); } else { el.textContent = phrases[0]; }
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
    syncToggleUI();
    toggleBtn.addEventListener('click', function() {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncToggleUI();
    });
  }
  try {
    const saved = localStorage.getItem('theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
  } catch (e) {}

  // ==========================================================================
  // Contact Form
  // ==========================================================================
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const statusMessage = document.getElementById('statusMessage');

  function setStatus(type, text) {
    statusMessage.className = 'status-message show ' + type;
    statusMessage.innerHTML = text;
  }
  function hideStatus() {
    statusMessage.className = 'status-message';
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideStatus();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const message = document.getElementById('senderMessage').value.trim();

    if (!name || !email || !message) {
      setStatus('error', '<span>⚠</span> Please fill in all fields before sending.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error', '<span>⚠</span> Please enter a valid email address.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      await new Promise(r => setTimeout(r, 1200));
      setStatus('success', `<span>✓</span> Message sent successfully! Thanks, ${escapeHtml(name)}.`);
      form.reset();
    } catch (err) {
      setStatus('error', '<span>✗</span> Something went wrong. Please try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message →';
    }
  });

  // ==========================================================================
  // Hamburger Menu & Navigation
  // ==========================================================================
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  // ==========================================================================
  // Splash Screen Animation
  // ==========================================================================
  const splashLoader = document.getElementById('splashLoader');
  const splashBar = document.getElementById('splashBar');
  const splashText = document.getElementById('splashText');

  if (splashLoader) {
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress > 100) progress = 100;
      if (splashBar) splashBar.style.width = progress + '%';
      
      if (progress === 100) {
        clearInterval(loadingInterval);
        // Hide splash screen after a short delay
        setTimeout(() => {
          splashLoader.classList.remove('active');
        }, 300);
      }
    }, 200);
  }

  // ==========================================================================
  // Projects Grid (Placeholder - Supabase integration)
  // ==========================================================================
  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid) {
    // Sample project data - replace with Supabase fetch when ready
    const sampleProjects = [
      {
        id: 1,
        title: "Museum Journal",
        description: "Interactive journal application for museum exploration and documentation",
        link: "https://museum-journal-one.vercel.app/",
        tags: ["React", "Vercel"]
      }
    ];

    // Populate projects grid
    projectsGrid.innerHTML = sampleProjects.map(project => `
      <a href="${project.link}" class="project-card" target="_blank" rel="noopener">
        <div class="project-header">
          <h3>${project.title}</h3>
        </div>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <span class="project-cta">Visit Project →</span>
      </a>
    `).join('');
  }

  // ==========================================================================
  // Smooth Scrolling for Anchor Links
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});