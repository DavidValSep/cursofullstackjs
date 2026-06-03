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
    const personajesFiltrados = personajes.filter(p => p.species === "Human"); // Filtrar personajes con datos completos
    const personajesAlien = personajes.filter(p => p.species === "Alien");
    // 5. Mostrar cuántos se encontraron
    estadoEl.textContent = `Se encontraron ${personajesFiltrados.length} personajes humanos y ${personajesAlien.length} personajes alienígenas.`;

    // 6. Mostrar cada personaje en la lista
    personajesFiltrados.forEach((personaje) => {
      const id = personaje.id || personaje.id || "—";
      const name = personaje.name || personaje.name || personaje.name || "—";
      const species = personaje.species || personaje.species || "—";
      const image = personaje.image || personaje.image || "";
     
      const li = document.createElement("li");
      let especies;
      switch (species) {
        case "Human":
          especies = "Humano";
          break;
        case "Alien":
          especies = "Alienígena";
          break;
        default:
          especies = species;
      }
      li.innerHTML = `<img src="${image}" class="img-profile" alt="${name}">
      ${id} - 
      Nombre: ${name} - 
      Especie: ${especies}`;
      listaEl.appendChild(li);
    });

    personajesAlien.map((personaje) => {
      const id = personaje.id || personaje.id || "—";
      const name = personaje.name || personaje.name || personaje.name || "—";
      const species = personaje.species || personaje.species || "—";
      const image = personaje.image || personaje.image || "";

      const li = document.createElement("li");
      li.innerHTML = `<img src="${image}" class="img-profile" alt="${name}">
      ${id} Nombre: ${name} - Especie: ${species}`;
      listaEl.appendChild(li);
    });

    document.getElementById("alien").innerHTML = `
      <h2>${personajesAlien[0].name}</h2>
      <div class="ficha">
        <div><img src="${personajesAlien[0].image}" class="data-img" alt="${personajesAlien[0].name}"></div>
        <div>
          <p>
            Especie: ${personajesAlien[0].species}
          </p>
          <p>
            Género: ${personajesAlien[0].gender}
          </p>
          <p>
            Origen: ${personajesAlien[0].origin.name}
          </p>
          <p>
            Ubicación: ${personajesAlien[0].location.name}
          </p>
        </div>
      </div>`;

    console.log(personajesAlien[0].id);
    
    


  } catch (error) {
    console.error("Error al cargar personajes:", error);
    estadoEl.textContent = "No se pudieron cargar los personajes 😢";
  }
}

// Llamar a la función al iniciar
cargarpersonajes();