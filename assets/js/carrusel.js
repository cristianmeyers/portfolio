document.addEventListener("DOMContentLoaded", () => {
  // Selecciona el contenedor del carrusel
  const carouselTrack = document.querySelector(".carousel-track");
  const cards = document.querySelectorAll(".c_card");

  // Duplica los elementos para crear el efecto de bucle
  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    carouselTrack.appendChild(clone);
  });

  // Configuración del desplazamiento automático
  let isHovered = false;
  let scrollAmount = 0;
  const scrollSpeed = 2; // Velocidad del desplazamiento (ajusta según necesites)

  // Función para el desplazamiento automático
  function autoScroll() {
    if (!isHovered) {
      scrollAmount += scrollSpeed;
      carouselTrack.scrollLeft = scrollAmount;

      // Reinicia el scroll cuando llega al final de los elementos duplicados
      if (scrollAmount >= carouselTrack.scrollWidth / 2) {
        scrollAmount = 0;
      }
    }
    requestAnimationFrame(autoScroll);
  }

  // Inicia el desplazamiento automático
  autoScroll();

  // Pausa el desplazamiento al pasar el ratón sobre el carrusel
  carouselTrack.addEventListener("mouseenter", () => {
    isHovered = true;
  });

  carouselTrack.addEventListener("mouseleave", () => {
    isHovered = false;
  });
});
