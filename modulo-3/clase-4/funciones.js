function sumar(a, b) {
	const suma = a + b;
	return suma;
}

function restar(a, b) {
    const resta = a - b;
    return resta;
}

function multiplicar(a, b) {
    const multiplicacion = a * b;
    return multiplicacion;
}

function dividir(a, b) {
    if (b === 0) {
        return 'Error: No se puede dividir por cero';
    }
    const division = a / b;
    return division;
}


console.log(`La suma de 5 y 3 es: ${sumar(6, 3)}`);
console.log(`La resta de 5 y 3 es: ${restar(6, 3)}`);
console.log(`La multiplicación de 5 y 3 es: ${multiplicar(6, 3)}`);
console.log(`La división de 5 y 3 es: ${dividir(6, 3)}`);
