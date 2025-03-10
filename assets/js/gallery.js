document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("github-gallery");
  const loadMoreButton = document.getElementById("load-more");

  // Nombre de usuario de GitHub
  const username = "cristianmeyers"; // Cambia esto por tu nombre de usuario

  // URL de la API de GitHub
  const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;

  let allRepos = []; // Almacenará todos los repositorios
  let displayedRepos = []; // Almacenará los repositorios mostrados
  let isExpanded = false; // Estado para rastrear si se muestran todos los proyectos

  // Función para cargar los proyectos
  async function loadProjects() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Error al cargar los proyectos desde GitHub");
      }
      allRepos = await response.json();

      // Filtrar repositorios para excluir los que tienen el tema "hidden"
      allRepos = allRepos.filter((repo) => !repo.topics.includes("hidden"));

      // Mostrar los últimos 6 proyectos inicialmente
      displayedRepos = allRepos.slice(0, 6);
      renderProjects(displayedRepos);

      // Mostrar el botón si hay más proyectos disponibles
      if (allRepos.length > 6) {
        loadMoreButton.style.display = "block";
        loadMoreButton.textContent = "Charger Plus de Projets"; // Texto inicial
      } else {
        loadMoreButton.style.display = "none";
      }
    } catch (error) {
      console.error(error);
      gallery.innerHTML = "<p>Error al cargar les projets.</p>";
    }
  }

  // Función para renderizar los proyectos
  function renderProjects(repos) {
    gallery.innerHTML = ""; // Limpiar la galería antes de renderizar

    repos.forEach((repo) => {
      // Crear el enlace principal (<a>)
      const projectLink = document.createElement("a");
      projectLink.href = repo.html_url; // Enlace al repositorio
      projectLink.target = "_blank"; // Abrir en una nueva pestaña
      projectLink.classList.add("project-card");

      // Crear el contenedor de la tarjeta
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("card");

      // Agregar imagen destacada (si existe)
      const imageUrl = repo.topics.includes("cover")
        ? `https://raw.githubusercontent.com/${username}/${repo.name}/main/cover.jpg`
        : "https://via.placeholder.com/300x200?text=No+Image";

      const image = document.createElement("img");
      image.src = imageUrl;
      image.alt = repo.name;
      image.classList.add("card-image");

      // Añadir la imagen al contenedor de la tarjeta
      cardContainer.appendChild(image);

      // Crear el título y la descripción
      const title = document.createElement("h3");
      title.textContent = repo.name;

      const description = document.createElement("p");
      description.textContent = repo.description || "Sin descripción";

      // Construir la estructura completa
      projectLink.appendChild(cardContainer);
      projectLink.appendChild(title);
      projectLink.appendChild(description);

      // Añadir el proyecto a la galería
      gallery.appendChild(projectLink);
    });
  }

  // Cargar los proyectos iniciales
  loadProjects();

  // Evento para cargar más proyectos o mostrar menos
  loadMoreButton.addEventListener("click", () => {
    if (isExpanded) {
      // Mostrar solo los primeros 6 proyectos
      displayedRepos = allRepos.slice(0, 6);
      renderProjects(displayedRepos);
      loadMoreButton.textContent = "Charger Plus de Projets"; // Cambiar texto del botón
      isExpanded = false; // Actualizar estado
    } else {
      // Mostrar todos los proyectos
      displayedRepos = [...allRepos];
      renderProjects(displayedRepos);
      loadMoreButton.textContent = "Montrer moins"; // Cambiar texto del botón
      isExpanded = true; // Actualizar estado
    }
  });
});
