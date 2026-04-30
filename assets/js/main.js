// MONTESANO | main.js

(function () {

  var path = location.pathname.split('/').pop() || 'index.html';

  function loadInclude(placeholderId, file, callback) {
    var el = document.getElementById(placeholderId);
    if (!el) { if (callback) callback(); return; }
    fetch(file)
      .then(function(r) { return r.text(); })
      .then(function(html) {
        el.outerHTML = html;
        if (callback) callback();
      })
      .catch(function(err) {
        console.warn(err);
        if (callback) callback();
      });
  }

  loadInclude('header-placeholder', '_includes/header.html', function() {
    initActiveNav();
    initHamburger();
    loadInclude('footer-placeholder', '_includes/footer.html', function() {
      initYear();
      loadInclude('cta-placeholder', '_includes/cta-servicios.html', null);
    });
  });

  function initActiveNav() {
    document.querySelectorAll('[data-nav]').forEach(function(a) {
      if (a.getAttribute('href') === path) a.classList.add('active');
    });
  }

  function initHamburger() {
    var btn = document.querySelector('.hamburger');
    var nav = document.querySelector('.navlinks');
    if (!btn || !nav) return;

    btn.addEventListener('click', function() {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });

    document.addEventListener('click', function(e) {
      if (!btn.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    nav.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function initYear() {
    var el = document.getElementById('y');
    if (el) el.textContent = new Date().getFullYear();
  }

  // Carrusel
  (function initCarousel() {
    var slides = document.querySelectorAll('.carousel-img');
    if (slides.length <= 1) return;
    slides.forEach(function(s, i) { s.classList.toggle('active', i === 0); });
    var current = 0;
    setInterval(function() {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 6000);
  })();

  // Transición suave entre páginas
  (function initPageTransitions() {
    document.addEventListener('click', function(e) {
      var link = e.target.closest('a');
      if (!link) return;

      var href = link.getAttribute('href');
      if (!href) return;

      if (
        href.startsWith('mailto:') ||
        href.startsWith('http')    ||
        href.startsWith('#')       ||
        href.includes('#')         ||
        link.getAttribute('target') === '_blank'
      ) return;

      e.preventDefault();
      document.body.classList.add('page-leaving');

      setTimeout(function() {
        window.location.href = href;
      }, 250);
    });

    window.addEventListener('pageshow', function(e) {
      if (e.persisted) {
        document.body.classList.remove('page-leaving');
      }
    });
  })();

})();