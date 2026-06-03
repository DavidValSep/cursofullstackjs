// 1. Solicitar cantidad de palabras
let cant = parseInt(prompt("¿Cuántas palabras deseas ingresar?"));

// 2. Crear array para almacenar las palabras
let words = [];

// 3. Solicitar las palabras y almacenarlas
for (let i = 0; i < cant; i++) {
    let word = prompt("Ingresa la palabra " + (i + 1) + ":");
    words.push(word);
}

// 4. Función expresiva para contar vocales
const countVowels = function(word) {
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let counter = 0;
    
    // Convertir a minúsculas
    word = word.toLowerCase();
    
    // Recorrer cada carácter
    for (let i = 0; i < word.length; i++) {
        // Verificar si es vocal usando includes()
        if (vowels.includes(word[i])) {
            counter++;
        }
    }
    
    return counter;
};

// 5. Unificar todas las palabras en una sola cadena
let completeText = words.join("");

// 6. Contar vocales en el texto completo
let totalvowels = countVowels(completeText);

// 7. Mostrar resultados

// En consola
console.log("Palabras ingresadas:" + words);
console.log("Texto completo:" + completeText);
console.log("Total de vocales:" + totalvowels);

// En alerta
window.alert("Total de vocales encontradas: " + totalvowels);

// En la página HTML
document.getElementById("result").innerHTML = `<p><strong>Palabras ingresadas:</strong> ${words.join(", ")}</p>
<p><strong>Texto completo:</strong> ${completeText}</p>
<p><strong>Total de vocales:</strong> ${totalvowels}</p>`;  