// Resalta el link activo según la página actual
(function () {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(a => {
    if (a.getAttribute("href") === path) a.classList.add("active");
  });
})();

// Carrusel automático (5 segundos)
(function () {
  const slides = document.querySelectorAll(".carousel-img");
  if (slides.length <= 1) return;

  // Asegura que SOLO la primera empiece activa
  slides.forEach((s, i) => s.classList.toggle("active", i === 0));

  let current = 0;
  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 5000);
})();

// ===== GIF fullscreen + replay =====
(function () {

  function replayGif(img){
    const base = img.dataset.src || img.src.split("?")[0];
    img.src = base + "?t=" + Date.now();
  }

  document.querySelectorAll(".gifWrapper").forEach(wrapper => {
    const img = wrapper.querySelector(".gif-fs");
    const btn = wrapper.querySelector(".gifPlayBtn");

    // Click en la imagen → fullscreen + play
    img.addEventListener("click", () => {
      replayGif(img);

      if (img.requestFullscreen) {
        img.requestFullscreen();
      }
    });

    // Botón play → replay
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      replayGif(img);

      // Si no está en fullscreen, lo llevamos
      if (!document.fullscreenElement && img.requestFullscreen) {
        img.requestFullscreen();
      }
    });
  });

})();
