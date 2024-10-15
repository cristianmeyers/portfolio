// ========================= Map
// Créer le carte centré sur Brest
var map = L.map("map").setView([48.390394, -4.486081], 13); // Coordonnées de Brest

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Ajouter un marqueur à Brest
L.marker([48.390394, -4.486081])
  .addTo(map)
  .bindPopup("J'habite ici!")
  .openPopup();

// ============================================================ particles
particlesJS("particles-js", {
  particles: {
    number: {
      value: 100, // Número de partículas
      density: {
        enable: true,
        value_area: 800, // Densidad de las partículas
      },
    },
    color: {
      value: "#ffffff", // Color de las partículas
    },
    shape: {
      type: "circle", // Forma de las partículas
      stroke: {
        width: 0,
        color: "#000000",
      },
    },
    opacity: {
      value: 0.5, // Opacidad de las partículas
      random: true,
    },
    size: {
      value: 3, // Tamaño de las partículas
      random: true,
    },
    line_linked: {
      enable: true, // Habilitar conexión entre partículas
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6, // Velocidad de movimiento
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse", // Efecto al pasar el ratón
      },
      onclick: {
        enable: true,
        mode: "push", // Efecto al hacer clic
      },
      resize: true,
    },
  },
  retina_detect: true,
});
