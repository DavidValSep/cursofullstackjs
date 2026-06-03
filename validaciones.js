console.log("Javascript funcionando");

function mostrarAlerta(texto, tipo) {
    const contenedorAlerta = document.getElementById('liveAlertPlaceholder');
    contenedorAlerta.innerHTML = '';

    const alerta  = document.createElement('div');
    alerta.className = "alert alert-"+tipo+" alert-dismissible";
    alerta.textContent = texto;

    contenedorAlerta.appendChild(alerta);
}

function validarCorreo(correo) {
    return correo.includes('@') && correo.includes('.');
}

function validarFormulario() {
    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const mensaje = document.getElementById('mensaje');

    if (nombre.value === '' || correo.value === '' || mensaje.value === '') {
        console.log('Por favor, completa todos los campos.');
        mostrarAlerta('Por favor, completa todos los campos.', 'danger');
    } else if (!validarCorreo(correo.value)) {
        console.log('El correo es inválido.');
        mostrarAlerta('El correo es inválido.', 'danger');
    } else {
        console.log('Formulario enviado correctamente.');
        mostrarAlerta('Formulario enviado correctamente.', 'success');

        nombre.value = '';
        correo.value = '';
        mensaje.value = '';
    }
}

//document.getElementById('liveAlertBtn').addEventListener('click', validarFormulario);