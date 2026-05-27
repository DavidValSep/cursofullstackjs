const API_URL = "http://localhost:3000";

// Estado de la aplicación
let paisesData = [];
let currentPage = 1;

// Elementos del DOM
const notificationBox = document.getElementById("notification-box");
const formAdd = document.getElementById("form-add");
const formDelete = document.getElementById("form-delete");
const tableBody = document.querySelector("#paises-table tbody");
const recordsLimitSelect = document.getElementById("records-limit");
const pageIndicator = document.getElementById("page-indicator");
const btnNext = document.getElementById("btn-next");

// Función para mostrar mensajes controlados
function showNotification(message, type = "success") {
  notificationBox.textContent = message;
  notificationBox.className = `notification ${type}`;
  
  // Desaparecer automáticamente después de 5 segundos
  setTimeout(() => {
    notificationBox.className = "notification hidden";
  }, 5000);
}

// Cargar y unificar los datos desde el Backend
async function fetchPaises() {
  try {
    // Consultamos de forma paralela los dos endpoints definidos en tus rutas
    const [resPaises, resPib] = await Promise.all([
      fetch(`${API_URL}/paises`),
      fetch(`${API_URL}/paisespib`)
    ]);

    if (!resPaises.ok || !resPib.ok) throw new Error("Fallo al obtener los datos de los servicios");

    const paises = await resPaises.json();
    const pibs = await resPib.json();

    // Cruzar/unificar los datos usando el nombre como clave común
    paisesData = paises.map(p => {
      const pibInfo = pibs.find(item => item.nombre === p.nombre) || { pib_2019: 'N/A', pib_2020: 'N/A' };
      return {
        ...p,
        pib_2019: pibInfo.pib_2019,
        pib_2020: pibInfo.pib_2020
      };
    });

    renderTable();
  } catch (error) {
    showNotification("No se pudo conectar con el servidor backend.", "error");
  }
}

// Renderizar la tabla con paginación
function renderTable() {
  const limit = parseInt(recordsLimitSelect.value);
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  
  const pageItems = paisesData.slice(startIndex, endIndex);
  
  tableBody.innerHTML = "";
  
  if (pageItems.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No hay registros disponibles</td></tr>`;
    btnNext.disabled = true;
    return;
  }

  pageItems.forEach(p => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${p.nombre}</strong></td>
      <td>${p.continente || '—'}</td>
      <td>${p.poblacion ? p.poblacion.toLocaleString() : '—'}</td>
      <td>${p.pib_2019}</td>
      <td>${p.pib_2020}</td>
    `;
    tableBody.appendChild(row);
  });

  pageIndicator.textContent = `Página ${currentPage}`;
  
  // Validar si queda contenido para una página siguiente
  btnNext.disabled = endIndex >= paisesData.length;
}

// Evento: Agregar País
formAdd.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const payload = {
    nombre: document.getElementById("add-nombre").value,
    continente: document.getElementById("add-continente").value,
    poblacion: parseInt(document.getElementById("add-poblacion").value),
    pib_2019: parseInt(document.getElementById("add-pib2019").value),
    pib_2020: parseInt(document.getElementById("add-pib2020").value)
  };

  try {
    const response = await fetch(`${API_URL}/crear-pais`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "Error desconocido al procesar el guardado");
    }

    showNotification(data.mensaje, "success");
    formAdd.reset();
    currentPage = 1;
    fetchPaises(); // Recargar datos de inmediato
  } catch (error) {
    showNotification(error.message, "error");
  }
});

// Evento: Eliminar País
formDelete.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("delete-nombre").value;

  try {
    const response = await fetch(`${API_URL}/eliminar-pais/${encodeURIComponent(nombre)}`, {
      method: "DELETE"
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "Error desconocido en el borrado");
    }

    showNotification(data.mensaje, "success");
    formDelete.reset();
    currentPage = 1;
    fetchPaises(); // Recargar datos de inmediato
  } catch (error) {
    showNotification(error.message, "error");
  }
});

// Eventos de Navegación y Control de Registros
recordsLimitSelect.addEventListener("change", () => {
  currentPage = 1;
  renderTable();
});

btnNext.addEventListener("click", () => {
  const limit = parseInt(recordsLimitSelect.value);
  if (currentPage * limit < paisesData.length) {
    currentPage++;
    renderTable();
  }
});

// Carga Inicial al abrir el frontend
fetchPaises();