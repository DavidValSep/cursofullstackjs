function guardarDatos() {
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    
    if (nombre && edad) {
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("edad", edad);
        alert("Datos Guardados.")
    } else {
        alert("Por favor completa ambos datos.");
    }
}

function mostrarDatos() {
    const nombre = localStorage.getItem("nombre");
    const edad = localStorage.getItem("edad");
    const contenedor = document.getElementById("datosGuardados");
    if (nombre && edad) {    
        contenedor.innerHTML = `
            <p>Nombre: ${nombre}</p>
            <p>Edad: ${edad}</p>
        `;
    } else {
        contenedor.innerHTML = "<p>No hay datos guardados.</p>";
    }
}

function eliminarDatos() {
    localStorage.removeItem("nombre");
    localStorage.removeItem("edad");
}


window.onload = function() {
    mostrarDatos();
};