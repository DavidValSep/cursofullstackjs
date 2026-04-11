//spread operator
const frutas = ["banana", "manzana", "pera"];

const misFrutas = [...frutas, "naranja", "uva"];

console.log(misFrutas);
console.log(frutas);

const persona = {
    nombre: "Juan",
    edad: 30,
    profesion: "Ingeniero"
};

const nuevaPersona = {
    ...persona,
    ciudad: "Madrid",
    pais: "España",
};

console.log(persona);
console.log(nuevaPersona);