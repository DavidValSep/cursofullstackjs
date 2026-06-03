class Persona {
    constructor(nombre, edad, profesion) {
        this.nombre = nombre;
        this.edad = edad;
        this.profesion = profesion;
    }
}

const persona1 = new Persona("Juan", 30, "Ingeniero");
const persona2 = new Persona("María", 25, "Diseñadora");

// Desestructuración de objetos
const { nombre, edad, profesion } = persona1;
const { nombre: nombre2, edad: edad2, profesion: profesion2 } = persona2;

console.log(nombre); // Juan
console.log(edad); // 30
console.log(profesion); // Ingeniero
console.log(`Hola mi nombre es ${nombre}, tengo ${edad} años y soy ${profesion}.`); // Hola mi nombre es Juan, tengo 30 años y soy Ingeniero.

console.log(nombre2); // María
console.log(edad2); // 25
console.log(profesion2); // Diseñadora

// Desestructuración de arrays
const numeros = [1, 2, 3, 4, 5];

const [primero, segundo, tercero, cuarto, quinto] = numeros;

console.log(primero); // 1
console.log(segundo); // 2
console.log(tercero); // 3
console.log(cuarto); // 4
console.log(quinto); // 5