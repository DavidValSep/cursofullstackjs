const frutas = ["manzana", "banana", "naranja", "pera", "uva"];

frutas.push("kiwi"); // Agrega un elemento al final del arreglo
console.log(frutas);
frutas.pop(); // Elimina el último elemento del arreglo
console.log(frutas);
frutas.unshift("naranja"); // Agrega un elemento al inicio del arreglo
console.log(frutas);
frutas.shift(); // Elimina el primer elemento del arreglo
console.log(frutas);
frutas.splice(2, 0, "kiwi"); // Agrega un elemento en el índice 2
console.log(frutas);

console.log(frutas.length); // Cuenta los elementos del arreglo


const letras = ["e", "c", "b", "d", "a"];
letras.sort(); // Ordena los elementos del arreglo alfabéticamente
console.log(letras);
letras.reverse(); // Invierte el orden de los elementos del arreglo
console.log(letras);
console.log(letras.join("-")); // Convierte el arreglo en una cadena de texto separada por comas