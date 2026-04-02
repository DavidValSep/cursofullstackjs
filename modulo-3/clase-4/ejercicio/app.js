// Número secreto generado por el computador (1-10)
const secreto = Math.floor(Math.random() * 10) + 1;
console.log("Número secreto (para depuración):", secreto);

// Función para detectar números repetidos
function yaUsado(numero, lista) {
    return lista.includes(numero);
}

// Arreglo para guardar los intentos válidos
let usados = [];
let intentosRestantes = 3;
let juegoTerminado = false;

// Flujo del juego
while (intentosRestantes > 0 && !juegoTerminado) {
    let entrada = prompt(`Ingresa un número entre 1 y 10 (Intentos restantes: ${intentosRestantes}):`);
    let numero = parseInt(entrada);
    
    // Validación de rango
    if (isNaN(numero) || numero < 1 || numero > 10) {
        alert("Error: Debes ingresar un número entre 1 y 10");
        continue; // No gastar intento
    }
    
    // Validación de número repetido
    if (yaUsado(numero, usados)) {
        alert("Error: Ese número ya fue usado. Intenta con otro.");
        continue; // No gastar intento
    }
    
    // Agregar a la lista de usados
    usados.push(numero);
    console.log("Intentos hasta ahora:", usados);
    
    // Actualizar historial en la página
    document.getElementById('historial').innerHTML = `<strong>Intentos:</strong> ${usados.join(', ')}`;
    
    // Comparar con el número secreto
    if (numero === secreto) {
        alert("¡Adivinaste! El número era " + secreto);
        document.getElementById('historial').innerHTML += `<br><strong style="color: green;">¡GANASTE!</strong>`;
        juegoTerminado = true;
    } else {
        intentosRestantes--;
        
        if (intentosRestantes > 0) {
            if (numero < secreto) {
                alert(`Incorrecto. El número es MAYOR. Te quedan ${intentosRestantes} intentos.`);
            } else {
                alert(`Incorrecto. El número es MENOR. Te quedan ${intentosRestantes} intentos.`);
            }
        }
    }
}

// Si se acabaron los intentos sin adivinar
if (!juegoTerminado) {
    alert(`Sin aciertos. El número era: ${secreto}`);
    document.getElementById('historial').innerHTML += `<br><strong style="color: red;">GAME OVER - El número era ${secreto}</strong>`;
}