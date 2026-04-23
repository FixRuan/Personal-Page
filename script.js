(function () {
  var root = document.documentElement;
  var preferredTheme = localStorage.getItem('theme');
  var currentTheme = preferredTheme || 'light';

  root.setAttribute('data-theme', currentTheme);

  function syncButtons() {
    var buttons = document.querySelectorAll('[data-theme-toggle]');
    buttons.forEach(function (button) {
      var isDark = root.getAttribute('data-theme') === 'dark';
      button.textContent = isDark ? 'Switch to light' : 'Switch to dark';
      button.setAttribute('aria-pressed', String(isDark));
    });
  }

  function toggleTheme() {
    var isDark = root.getAttribute('data-theme') === 'dark';
    var nextTheme = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    syncButtons();
  }

  document.addEventListener('click', function (event) {
    if (event.target && event.target.matches('[data-theme-toggle]')) {
      toggleTheme();
    }
  });

  var yearNode = document.querySelector('[data-year]');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  var revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add('is-visible');
    });
  }

  syncButtons();
})();
