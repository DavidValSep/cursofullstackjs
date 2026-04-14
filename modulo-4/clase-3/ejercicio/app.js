//1. Repetir Palabra
function repetirPalabra() {
    const palabra = document.getElementById("palabra").value;
    const veces = parseInt(document.getElementById("veces").value);
    const contenedor = document.getElementById("resultado1");
    contenedor.textContent = `${palabra}`.repeat(veces); // Output: "HolaHolaHola"
}

//2. Aplicar Color
function aplicarColor() {
    const color2 = document.getElementById("color2").value;
    document.getElementById("parrafo2").style.background = color2;
}

//3. Calcular operaciones
function calcularOperaciones() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const resultado3 = document.getElementById("resultado3");

    const suma = num1 + num2;
    const resta = num1 - num2;
    const multiplicacion = num1 * num2;
    const division = num1 / num2;

    resultado3.innerHTML = `
        <p>${num1} + ${num2}: ${suma}</p>
        <p>${num1} - ${num2}: ${resta}</p>
        <p>${num1} * ${num2}: ${multiplicacion}</p>
        <p>${num1} / ${num2}: ${division}</p>
        <p>La suma de los resultados es: ${suma + resta + multiplicacion + division}</p>
    `;
}

function invertirTexto(){
    const texto = document.getElementById("texto4").value; 
    const textoInvertido = texto.split("").reverse().join("");
    document.getElementById("resultado4").textContent = textoInvertido;

}