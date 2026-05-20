const API_URL = 'http://localhost:3000/clientes';

// Referencias del DOM
const panelRespuesta = document.getElementById('panel-respuesta');
const tablaClientesBody = document.querySelector('#tabla-clientes tbody');
const buscarCriterio = document.getElementById('buscar-criterio');
const buscarValor = document.getElementById('buscar-valor');

// Muestra las alertas del backend (mensajes y rowCount si aplica)
function mostrarFeedback(respuesta) {
    panelRespuesta.className = 'alert';
    
    if (respuesta.ok) {
        panelRespuesta.classList.add('alert-success');
        if (respuesta.rowCount !== undefined) {
            panelRespuesta.innerText = `${respuesta.mensaje} (Registros afectados: ${respuesta.rowCount})`;
        } else {
            panelRespuesta.innerText = respuesta.mensaje || 'Operación realizada con éxito';
        }
    } else {
        panelRespuesta.classList.add('alert-danger');
        panelRespuesta.innerText = respuesta.mensaje || 'Ocurrió un error inesperado';
    }
    panelRespuesta.classList.remove('oculto');
}

// Renderiza los datos en la tabla
function renderizarTabla(clientes) {
    tablaClientesBody.innerHTML = '';
    
    if (!clientes || clientes.length === 0) {
        tablaClientesBody.innerHTML = `
            <tr>
                <td colspan="3" class="text-center">No se encontraron registros coincidentes.</td>
            </tr>`;
        return;
    }
    
    clientes.forEach(cliente => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cliente.rut}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.edad}</td>
        `;
        tablaClientesBody.appendChild(fila);
    });
}

// Carga el listado completo llamando a GET /clientes
async function cargarTodosLosClientes() {
    try {
        const res = await fetch(API_URL);
        const respuesta = await res.json();
        
        if (respuesta.ok) {
            renderizarTabla(respuesta.data);
        } else {
            mostrarFeedback(respuesta);
        }
    } catch (error) {
        console.error(error);
        mostrarFeedback({ ok: false, mensaje: 'Error al conectar con el servidor para listar clientes.' });
    }
}

// Control dinámico del input de búsqueda según la opción del selector
buscarCriterio.addEventListener('change', () => {
    if (buscarCriterio.value === 'todos') {
        buscarValor.disabled = true;
        buscarValor.value = '';
        buscarValor.placeholder = "No se requiere filtro para 'Todos'";
        buscarValor.removeAttribute('required');
    } else {
        buscarValor.disabled = false;
        buscarValor.setAttribute('required', 'true');
        buscarValor.focus();
        
        if (buscarCriterio.value === 'rut') buscarValor.placeholder = 'Ej: 12345678-9 (Exacto)';
        if (buscarCriterio.value === 'nombre') buscarValor.placeholder = 'Ej: Juan (Prefijo o completo)';
        if (buscarCriterio.value === 'edad') buscarValor.placeholder = 'Ej: 30 (Exacto)';
    }
});

// 1. POST /clientes (Crear)
document.getElementById('form-crear').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
        rut: document.getElementById('crear-rut').value.trim(),
        nombre: document.getElementById('crear-nombre').value.trim(),
        edad: parseInt(document.getElementById('crear-edad').value, 10)
    };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const respuesta = await res.json();
        mostrarFeedback(respuesta);
        
        if (res.status === 201) {
            await cargarTodosLosClientes(); // Recarga la lista completa
            e.target.reset();
        }
    } catch (error) {
        mostrarFeedback({ ok: false, mensaje: 'Error al conectar con el servidor' });
    }
});

// 2. PUT /clientes/:rut (Modificar solo nombre)
document.getElementById('form-modificar').addEventListener('submit', async (e) => {
    e.preventDefault();
    const rut = document.getElementById('modificar-rut').value.trim();
    const nombre = document.getElementById('modificar-nombre').value.trim();

    try {
        const res = await fetch(`${API_URL}/${rut}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre })
        });
        const respuesta = await res.json();
        mostrarFeedback(respuesta);
        
        if (respuesta.ok) {
            await cargarTodosLosClientes(); // Refresca la tabla
            e.target.reset();
        }
    } catch (error) {
        mostrarFeedback({ ok: false, mensaje: 'Error al conectar con el servidor' });
    }
});

// 3. GET /clientes (Consultar con filtros)
document.getElementById('form-consultar').addEventListener('submit', async (e) => {
    e.preventDefault();
    const criterio = buscarCriterio.value;
    const valor = buscarValor.value.trim();
    
    let url = API_URL;
    if (criterio !== 'todos') {
        url = `${API_URL}?${criterio}=${encodeURIComponent(valor)}`;
    }

    try {
        const res = await fetch(url);
        const respuesta = await res.json();
        
        if (respuesta.ok) {
            const datos = Array.isArray(respuesta.data) ? respuesta.data : (respuesta.data ? [respuesta.data] : []);
            renderizarTabla(datos);
            mostrarFeedback({ ok: true, mensaje: 'Búsqueda finalizada con éxito' });
        } else {
            renderizarTabla([]);
            mostrarFeedback(respuesta);
        }
    } catch (error) {
        mostrarFeedback({ ok: false, mensaje: 'Error al conectar con el servidor' });
    }
});

// 4. DELETE /clientes (Eliminar con filtros)
document.getElementById('form-eliminar').addEventListener('submit', async (e) => {
    e.preventDefault();
    const criterio = document.getElementById('eliminar-criterio').value;
    const valor = document.getElementById('eliminar-valor').value.trim();
    const url = `${API_URL}?${criterio}=${encodeURIComponent(valor)}`;

    try {
        const res = await fetch(url, { method: 'DELETE' });
        const respuesta = await res.json();
        mostrarFeedback(respuesta);
        
        if (respuesta.ok) {
            await cargarTodosLosClientes(); // Actualiza la tabla tras eliminar
            e.target.reset();
        }
    } catch (error) {
        mostrarFeedback({ ok: false, mensaje: 'Error al conectar con el servidor' });
    }
});

// Carga automática inicial al abrir el navegador
document.addEventListener('DOMContentLoaded', cargarTodosLosClientes);