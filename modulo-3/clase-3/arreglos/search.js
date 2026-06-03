const valores = [11, 23, 30, 40, 50];

// Busca por indexOf
console.log(valores.indexOf(30)); // Devuelve el índice del primer elemento encontrado

// Busca por includes
console.log(valores.includes(30)); // Devuelve true si el elemento existe en el arreglo

// Busqueda por find
const mayorQue30 = valores.find((valor) => valor > 30);
console.log(mayorQue30); // Devuelve el primer elemento que cumple la condición

const pares = valores.filter((valor) => valor % 2 === 0);
console.log(pares); // Devuelve un nuevo arreglo con los elementos que cumplen la condición

console.log(valores); // El arreglo original no se modifica