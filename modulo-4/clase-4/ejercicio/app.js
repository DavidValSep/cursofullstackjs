// //Ejercicio 1
// function validarNumero(callback) {
//     const numero = parseInt(prompt("Ingrese un número:"));
//     const esValido = !isNaN(numero) && numero !== null;

//     callback(numero, esValido);
// }

// validarNumero((numero, esValido) => {
//     console.log((esValido ? `El número ingresado es: ${numero}, Es válido` : "El Número no es válido"));
// });

//Ejercicio 2
function calcularYAvisarDespues(numero, callback) {
    let sumatoriaImpares = 0;
    let n = parseInt(numero);//ingrese un numero
    for (let i = 1; i <= n; i++) {
        if (i % 2 !== 0) {
            sumatoriaImpares += i;
        }
    }
    console.log("Calculando la sumatoria de los números impares...");
    setTimeout(() => {
        callback(sumatoriaImpares);
    }, 5000);
}
calcularYAvisarDespues(10, (resultado) => {
    console.log(`La sumatoria de los números impares es: ${resultado}, este resultado se obtuvo en 5 segundos.`);
});

//Ejercicio 3
function calcularYAvisarDependiendo(numero, callback) {
    let sumatoriaParcial = 0;
    let sumatoriaSucesiva = 0;
    let n = parseInt(numero);//ingrese un numero
    for (let i = 1; i <= n; i++) {
        sumatoriaParcial += i;
        sumatoriaSucesiva += sumatoriaParcial;
    }
    console.log("Calculando la sumatoria de los números impares...");
    setTimeout(() => {
        if (sumatoriaSucesiva <= 5000) {
            callback(sumatoriaSucesiva);
        } else {
            console.log(`La sumatoria sucesiva es: ${sumatoriaSucesiva}, este resultado se obtuvo en 5 segundos.`);
        }
    }, 0);
calcularYAvisarDependiendo(10, (resultado) => {
    console.log(`La sumatoria de los números impares es: ${resultado}.`);
});
}