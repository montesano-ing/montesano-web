// ============================================================
// MONTESANO | main.js
// ============================================================

// Resalta el link activo según la página actual
(function () {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(a => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });
})();

// Carrusel automático (6 segundos, cross-fade suave)
(function () {
  const slides = document.querySelectorAll(".carousel-img");
  if (slides.length <= 1) return;
  slides.forEach((s, i) => s.classList.toggle("active", i === 0));
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 6000);
})();

// Reveal on scroll (IntersectionObserver)
(function () {
  const targets = document.querySelectorAll("[data-reveal], [data-reveal-delay]");
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

  targets.forEach(el => observer.observe(el));
})();

// Hamburger menu (mobile)
(function () {
  const btn = document.querySelector(".hamburger");
  const nav = document.querySelector(".navlinks");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });

  // Cerrar al hacer click fuera
  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", false);
    }
  });

  // Cerrar al seleccionar link
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", false);
    });
  });
})();

// Footer año
(function () {
  const el = document.getElementById("y");
  if (el) el.textContent = new Date().getFullYear();
})();
