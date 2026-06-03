const API_URL = 'http://localhost:3000/users'; 

// OBTENER usuarios
function obtenerUsuarios() {
    fetch(API_URL)
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById('lista-clientes');
            userList.innerHTML = ''; 

            users.forEach(user => {
                userList.innerHTML += `
                    <li style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span>${user.username} (${user.email})</span>
                        <div>
                            <button 
                                type="button"
                                data-id="${user.id}" 
                                data-username="${user.username}" 
                                data-email="${user.email}" 
                                onclick="cargarFormularioModificar(this)" 
                                style="background:#f39c12; color:white; border:none; padding:2px 8px; cursor:pointer;">
                                Editar
                            </button>
                            <button type="button" onclick="eliminarUsuario('${user.id}')" style="background:#e74c3c; color:white; border:none; padding:2px 8px; cursor:pointer;">Eliminar</button>
                        </div>
                    </li>
                `;
            });
        })
        .catch(error => console.error(`Error al obtener usuarios:`, error));
}

// Cargar Formulario de Modificación
function cargarFormularioModificar(boton) {
    const id = boton.getAttribute('data-id');
    const username = boton.getAttribute('data-username');
    const email = boton.getAttribute('data-email');

    document.getElementById('modificar-id').value = id;
    document.getElementById('modificar-user').value = username;
    document.getElementById('modificar-correo').value = email;
}

// Modificar Usuario
function modificarUsuario(event) {
    event.preventDefault(); 

    const id = document.getElementById('modificar-id').value;
    const username = document.getElementById('modificar-user').value;
    const email = document.getElementById('modificar-correo').value;

    if (!id) {
        alert(`Por favor, selecciona un usuario de la lista primero.`);
        return;
    }

    fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email }) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al modificar el usuario: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        alert(`Usuario modificado con éxito`);
        document.getElementById('form-modificar').reset();
        obtenerUsuarios(); 
    })
    .catch(error => console.error('Error:', error));
}

//Eliminar Usuario
function eliminarUsuario(id) {
    if (!confirm(`¿Estás seguro de que deseas eliminar al usuario con ID: ${id}?`)) {
        return; 
    }

    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error al eliminar el usuario: ${response.status} ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        alert(`Usuario eliminado con éxito`);
        obtenerUsuarios(); 
    })
    .catch(error => console.error('Error:', error));
}