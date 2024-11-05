const apiKey = "http://www.omdbapi.com/?i=tt3896198&apikey=ba95ee69"; // Reemplaza con tu clave de API
const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&t=Inception`;

// Selecciona el contenedor de la galería
const gallery = document.getElementById("gallery");

// Función para crear una tarjeta de película
function createCard(movie) {
  const gallery = document.getElementById("gallery");

  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = movie.Poster; // Asegúrate de que esta propiedad exista
  img.alt = movie.Title; // Asegúrate de que esta propiedad exista

  const title = document.createElement("h3");
  title.innerText = movie.Title || "Título desconocido"; // Manejo de undefined

  const description = document.createElement("p");
  description.innerText = movie.Plot || "Descripción no disponible"; // Manejo de undefined

  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(description);
  gallery.appendChild(card);
}

// Función para obtener y mostrar la película
async function loadMovie() {
  try {
    const response = await fetch(apiUrl);
    const movie = await response.json();
    createCard(movie);
  } catch (error) {
    console.error("Error al cargar la película:", error);
  }
}
async function loadMovie() {
  try {
    const response = await fetch(apiUrl);
    const movie = await response.json();
    console.log(movie); // Verifica qué datos tienes aquí
    createCard(movie);
  } catch (error) {
    console.error("Error al cargar la película:", error);
  }
}

// Llama a la función para cargar la película al cargar la página
loadMovie();
