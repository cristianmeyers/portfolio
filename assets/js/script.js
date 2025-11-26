/* assets/js/main.js
   Inicializa particles.js, alterna fondos en las secciones 
   y controla el modal PDF.
*/

(function () {
  "use strict";

  /* ---------------------------------------------------
     Helpers
  --------------------------------------------------- */
  function safeLog(...args) {
    if (window.console && window.console.log) {
      console.log("[main.js]", ...args);
    }
  }

  function loadScript(src, cb) {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => cb(null);
    s.onerror = () => cb(new Error("Failed to load " + src));
    document.head.appendChild(s);
  }

  /* ---------------------------------------------------
     Particles.js
  --------------------------------------------------- */
  function initParticles() {
    if (typeof particlesJS !== "function") {
      safeLog("particlesJS no disponible.");
      return;
    }

    particlesJS("particles-js", {
      particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 1, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 140,
          color: "#ffffff",
          opacity: 0.3,
          width: 1,
        },
        move: { enable: true, speed: 1.2, out_mode: "out" },
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: false },
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.3 } },
        },
      },
      retina_detect: true,
    });

    safeLog("Particles inicializado");
  }

  /* ---------------------------------------------------
     Modal PDF
  --------------------------------------------------- */
  function openPdfModal(pdfUrl) {
    const pdfViewer = document.getElementById("pdfViewer");
    const pdfModal = document.getElementById("pdfModal");

    if (!pdfViewer || !pdfModal) return;

    pdfViewer.src = pdfUrl;
    pdfModal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  }

  function closePdfModal() {
    const pdfViewer = document.getElementById("pdfViewer");
    const pdfModal = document.getElementById("pdfModal");

    if (!pdfViewer || !pdfModal) return;

    pdfModal.classList.add("hidden");
    pdfViewer.src = "";
    document.body.classList.remove("overflow-hidden");
  }

  /* ---------------------------------------------------
     DOMContentLoaded
  --------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    safeLog("DOM cargado");

    /* --- Inicializar partículas --- */
    if (document.getElementById("particles-js")) {
      if (typeof particlesJS === "function") {
        initParticles();
      } else {
        loadScript(
          "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js",
          (err) => {
            if (err) return console.error("Error cargando particles.js");
            setTimeout(initParticles, 50);
          }
        );
      }
    }

    /* --- Alternar fondos de secciones --- */
    const sections = document.querySelectorAll("section");

    sections.forEach((section, index) => {
      section.classList.remove("bg-white", "bg-gray-50");
      section.classList.add(index % 2 === 0 ? "bg-white" : "bg-gray-50");
    });

    /* --- Botón CV --- */
    const btncv = document.getElementById("btncv");
    if (btncv) {
      btncv.addEventListener("click", (e) => {
        e.preventDefault();
        openPdfModal("assets/docs/cv.pdf");
      });
    }

    /* --- Botón E5 --- */
    const btnE5 = document.getElementById("btnE5");
    if (btnE5) {
      btnE5.addEventListener("click", (e) => {
        e.preventDefault();
        openPdfModal("assets/docs/e5.pdf");
      });
    }

    /* --- Botón cerrar modal --- */
    const btnCloseModal = document.getElementById("btnCloseModal");
    if (btnCloseModal) {
      btnCloseModal.addEventListener("click", closePdfModal);
    }

    /* --- Cerrar clicando fuera --- */
    const pdfModal = document.getElementById("pdfModal");
    if (pdfModal) {
      pdfModal.addEventListener("click", (e) => {
        if (e.target === pdfModal) closePdfModal();
      });
    }

    /* --- Cerrar con ESC --- */
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closePdfModal();
    });
  });
})();
