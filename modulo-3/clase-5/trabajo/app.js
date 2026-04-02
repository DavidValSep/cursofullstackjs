// 1. Solicitar cantidad de palabras
let cantidad = parseInt(prompt("¿Cuántas palabras deseas ingresar?"));

// 2. Crear array para almacenar las palabras
let palabras = [];

// 3. Solicitar las palabras y almacenarlas
for (let i = 0; i < cantidad; i++) {
    let palabra = prompt("Ingresa la palabra " + (i + 1) + ":");
    palabras.push(palabra);
}

// 4. Función expresiva para contar vocales
const contarVocales = function(palabra) {
    let vocales = ['a', 'e', 'i', 'o', 'u'];
    let contador = 0;
    
    // Convertir a minúsculas
    palabra = palabra.toLowerCase();
    
    // Recorrer cada carácter
    for (let i = 0; i < palabra.length; i++) {
        // Verificar si es vocal usando includes()
        if (vocales.includes(palabra[i])) {
            contador++;
        }
    }
    
    return contador;
};

// 5. Unificar todas las palabras en una sola cadena
let textoCompleto = palabras.join("");

// 6. Contar vocales en el texto completo
let totalVocales = contarVocales(textoCompleto);

// 7. Mostrar resultados

// En consola
console.log("Palabras ingresadas:", palabras);
console.log("Texto completo:", textoCompleto);
console.log("Total de vocales:", totalVocales);

// En alerta
window.alert("Total de vocales encontradas: " + totalVocales);

// En la página HTML
document.getElementById("resultado").innerHTML = 
    "<p><strong>Palabras ingresadas:</strong> " + palabras.join(", ") + "</p>" +
    "<p><strong>Texto completo:</strong> " + textoCompleto + "</p>" +
    "<p><strong>Total de vocales:</strong> " + totalVocales + "</p>";