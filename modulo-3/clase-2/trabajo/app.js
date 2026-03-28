const PI = Math.PI;

let entrada = prompt("Ingrese el diametro para calcular su área del círculo");

let radio = parseFloat(entrada) / 2;
let areaCirculo = PI * Math.pow(radio, 2);

if(isNaN(radio)) {
    alert("Por favor, ingrese un número.");
} else if (radio <= 0) {
    alert("Por favor, ingrese un número mayor a cero.");
} else if(radio >= 500) {
    alert(`El diámetro ${entrada} es muy grande. Por favor, ingrese un número menor a 1000.`);
} else {
    console.log(areaCirculo.toFixed(2));
    alert(`El área del círculo es: ${areaCirculo.toFixed(2)}`);
    document.getElementById("area").innerHTML = `El área del círculo es: ${areaCirculo.toFixed(2)}`;
}