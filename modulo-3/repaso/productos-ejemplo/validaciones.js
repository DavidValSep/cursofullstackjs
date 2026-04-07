// crear funcion mostrar alerta
console.log("js conectado")

function mostrarAlerta(texto, tipo) {
  const contenedorAlerta = document.getElementById("liveAlertPlaceholder");
  contenedorAlerta.innerHTML = "";

  const alerta = document.createElement("div");
  alerta.className = "alert alert-" + tipo;
  alerta.textContent = texto;

  contenedorAlerta.appendChild(alerta);
}

//crear funcion validar correo

function validarCorreo(correo) {
  return correo.includes("@") && correo.includes(".");
}

//validar formulario
function validarFormulario() {
  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const mensaje = document.getElementById("mensaje");

  console.log(nombre);
  //validar campos vacios
  if (nombre.value === "" || correo.value === "" || mensaje.value === "") {
    mostrarAlerta("Todos los campos son obligatorios", "danger");
  } else if (!validarCorreo(correo.value)) {
    mostrarAlerta("El correo no es valido", "danger");
  } else {
    mostrarAlerta("Formulario enviado", "success");
    nombre.value = "";
    correo.value = "";
    mensaje.value = "";
  }
}
