const nombre = "David" + " " + "Valencia";
console.log(nombre);

const nombre2 = "Juan";
const apellido2 = "Pérez";
console.log(nombre2 + " " + apellido2);

const nombre3 = "Alejandro";
const apellido3 = "Sepúlveda";
console.log(`Hola mi nombre es ${nombre3} ${apellido3}.`);

const edad = 43;
const precio = 19.99;
const esMayor = true;
console.log(`Hola tengo ${edad} años y el precio es $${precio}.`);

console.log(`Soy mayor de edad? ${esMayor}.`);

let tarea = "Terminar la Actividad";
console.log(`El valor de tarea es ${tarea}.`);

//no primitivos
//objeto
const persona = {
    nombre: "Raúl",
    edad: 43,
    esEstudiante: true
};
console.log(`La persona es: ${persona.nombre}, tiene ${persona.edad} años y es estudiante: ${persona.esEstudiante}.`);

const boleta = {
    plato: "Tacos",
    precio: 50,
    cantidad: 3
};
console.log(boleta);
console.log(boleta.precio);

//arreglo
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(numeros);
console.log(numeros[3]);
console.log(`El valor en la posición 1 es: ${numeros[1]}`);
console.log(`El valor en la posición 4 es: ${numeros[4]}`);
console.log(numeros.length);

//funcion
function saludar() {
    console.log("Hola a todos!");
}

console.log(typeof saludar);


const saludo = function () {
    console.log("Hola como estás?");   
}

console.log(saludo());