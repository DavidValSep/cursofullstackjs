// const API_URL = "https://api.boostr.cl/personajes/en.json";
// const estadoEl = document.getElementById("estado");
// const listaEl = document.getElementById("lista");

// async function mostrarpersonajes() {
//     try {
//         //1. hacer la petición a la API
//         const respuesta = await fetch(API_URL);
//         estadoEl.textContent = "Cargando personajes...";
//         //2. Verificar que la respusta sea correcta
//         if (!respuesta.ok) {
//             throw new Error(`HTTP error! status: ${respuesta.status}`);
//         }
//         console.log("Respuesta de la API:", respuesta);
//         //3. Convertir la respuesta a JSON
//         const data = await respuesta.json();
//         //4. Puede venir como un array
//         console.log(data);
//         const personajes = Array.isArray(data) ? data : data.personajes || [];
//         //5. Mostrar la cantridad de personajes
//         estadoEl.textContent = `Cantidad de personajes: ${personajes.length}`;
//         //6. Mostrar la lista de personajes
//         personajes.forEach(personaje => {
//             const fecha = personaje.date || personaje.fecha || "—";
//             const titulo = personaje.title || personaje.name || personaje.nombre || "—";
//             const tipo = personaje.type || "—";
   
//             const li = document.createElement("li");
//             li.textContent = `${fecha} — ${titulo} - ${tipo}`;
//             listaEl.appendChild(li);
//         });
//     } catch (error) {
//         console.error("Error al cargar los personajes:", error);
//         estado.textContent = "Error al cargar los personajes.";
//     }
// }

// mostrarpersonajes();
const API_URL = "https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10";
const estadoEl = document.getElementById("estado");
const listaEl = document.getElementById("lista");

async function cargarpersonajes() {
  try {
    // 1. Hacer la petición
    const respuesta = await fetch(API_URL);

    // 2. Verificar que la respuesta sea correcta
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    // 3. Convertir a JSON
    const datos = await respuesta.json();

    // 4. Puede venir como array directo o dentro de "data"
    const personajes = Array.isArray(datos) ? datos : datos.data || [];

    // 5. Mostrar cuántos se encontraron
    estadoEl.textContent = `Se encontraron ${personajes.length} personajes`;

    // 6. Mostrar cada personaje en la lista
    personajes.forEach((personaje) => {
      const fecha = personaje.date || personaje.fecha || "—";
      const titulo = personaje.title || personaje.name || personaje.nombre || "—";
      const tipo = personaje.type || "—";

      const li = document.createElement("li");
      li.innerHTML = `<img src="${personaje.image}" width="100" height="100" alt="${titulo}"> ${fecha} — ${titulo} - ${tipo}`;
      listaEl.appendChild(li);
    });
  } catch (error) {
    console.error("Error al cargar personajes:", error);
    estadoEl.textContent = "No se pudieron cargar los personajes 😢";
  }
}

// Llamar a la función al iniciar
cargarpersonajes();