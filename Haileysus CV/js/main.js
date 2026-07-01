// Consolidated JS (menu, dark mode with localStorage, reveal observer, nav close)
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const darkModeBtn = document.getElementById('darkModeBtn');

  // Mobile Navigation Toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const expanded = navLinks.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  // Dark Mode Toggle (persist)
  if (darkModeBtn) {
    const applyDark = (isDark) => {
      if (isDark) {
        document.body.classList.add('dark-mode');
        darkModeBtn.textContent = '☀️';
        darkModeBtn.setAttribute('aria-pressed', 'true');
      } else {
        document.body.classList.remove('dark-mode');
        darkModeBtn.textContent = '🌙';
        darkModeBtn.setAttribute('aria-pressed', 'false');
      }
    };

    // load preference
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') applyDark(true);

    darkModeBtn.addEventListener('click', () => {
      const isDark = !document.body.classList.contains('dark-mode');
      applyDark(isDark);
      localStorage.setItem('darkMode', isDark ? 'true' : 'false');
    });
  }

  // Scroll reveal animations
  const revealElements = document.querySelectorAll('.reveal-element');
  if ('IntersectionObserver' in window && revealElements.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: reveal immediately
    revealElements.forEach(el => el.classList.add('reveal-active'));
  }

  // Close mobile menu when link clicked
  if (navLinks) {
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle && menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});