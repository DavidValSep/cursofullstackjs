// const API_URL = "https://api.boostr.cl/feriados/en.json";
// const estadoEl = document.getElementById("estado");
// const listaEl = document.getElementById("lista");

// async function mostrarFeriados() {
//     try {
//         //1. hacer la petición a la API
//         const respuesta = await fetch(API_URL);
//         estadoEl.textContent = "Cargando feriados...";
//         //2. Verificar que la respusta sea correcta
//         if (!respuesta.ok) {
//             throw new Error(`HTTP error! status: ${respuesta.status}`);
//         }
//         console.log("Respuesta de la API:", respuesta);
//         //3. Convertir la respuesta a JSON
//         const data = await respuesta.json();
//         //4. Puede venir como un array
//         console.log(data);
//         const feriados = Array.isArray(data) ? data : data.feriados || [];
//         //5. Mostrar la cantridad de feriados
//         estadoEl.textContent = `Cantidad de feriados: ${feriados.length}`;
//         //6. Mostrar la lista de feriados
//         feriados.forEach(feriado => {
//             const fecha = feriado.date || feriado.fecha || "—";
//             const titulo = feriado.title || feriado.name || feriado.nombre || "—";
//             const tipo = feriado.type || "—";
   
//             const li = document.createElement("li");
//             li.textContent = `${fecha} — ${titulo} - ${tipo}`;
//             listaEl.appendChild(li);
//         });
//     } catch (error) {
//         console.error("Error al cargar los feriados:", error);
//         estado.textContent = "Error al cargar los feriados.";
//     }
// }

// mostrarFeriados();
const API_URL = "https://api.boostr.cl/feriados/en.json";
const estadoEl = document.getElementById("estado");
const listaEl = document.getElementById("lista");

async function cargarFeriados() {
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
    const feriados = Array.isArray(datos) ? datos : datos.data || [];

    // 5. Mostrar cuántos se encontraron
    estadoEl.textContent = `Se encontraron ${feriados.length} feriados`;

    // 6. Mostrar cada feriado en la lista
    feriados.forEach((feriado) => {
      const fecha = feriado.date || feriado.fecha || "—";
      const titulo = feriado.title || feriado.name || feriado.nombre || "—";
      const tipo = feriado.type || "—";

      const li = document.createElement("li");
      li.textContent = `${fecha} — ${titulo} - ${tipo}`;
      listaEl.appendChild(li);
    });
  } catch (error) {
    console.error("Error al cargar feriados:", error);
    estadoEl.textContent = "No se pudieron cargar los feriados 😢";
  }
}

// Llamar a la función al iniciar
cargarFeriados();