//ejemplo 1
const mensaje = "Hola mundo"

console.log(mensaje);

console.log(mensaje.toUpperCase());

//se ejecuta correctamente en orden
//exit code 0

//ejemplo 2

console.log("Inicio del programa");

setTimeout(() => {
  console.log("Tarea asíncrona (timeout)");
}, 2000);

console.log("Fin del programa");

//se ejecuta primero lo sincrono y lo asincrono pasa a libuv