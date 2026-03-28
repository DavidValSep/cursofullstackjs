//1 Variables globales

const nombre = "David";

function saludar() {
    console.log("Hola " + nombre);
}

function despedir() {
    console.log("Adiós " + nombre);
}

saludar();
despedir();

//2 variables locales
function saludar2() {
    const profe = "Esteban";
    console.log("Hola " + profe);
}

saludar2();

const resultado = "10" + 5;
console.log(resultado);