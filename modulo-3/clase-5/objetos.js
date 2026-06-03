// Primera Forma
const persona = {
    nombre: "Juan",
    edad: 30,
    profesion: "Desarrollador",
    activo: true,
}
//dot notation
console.log(persona.nombre);
console.log(persona.edad);
//bracket notation
console.log(persona["profesion"]);
console.log(persona["activo"]);


const gatito = {
    nombre: "Michi",
    edad: 2,
    raza: "Siames",
    color: "Gris",
}

gatito.edad = 3; // Modificar la edad del gatito
console.log(gatito.edad); // Imprime: 3
gatito.color = "Blanco"; // Modificar el color del gatito
console.log(gatito.color);
delete gatito.raza; // Eliminar la propiedad raza
console.log(gatito); // Imprime el objeto gatito sin la propiedad raza

//Segunda Forma
const perrito = new Object();
perrito.nombre = "Firulais";
perrito.edad = 5;
perrito.raza = "Labrador";

console.log(perrito);