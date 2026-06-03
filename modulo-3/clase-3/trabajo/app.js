// let valor1 = parseFloat(prompt("Ingresa el primer valor:"));
// let valor2 = parseFloat(prompt("Ingresa el segundo valor:"));
// let valor3 = parseFloat(prompt("Ingresa el tercer valor:"));
let lista=[]
for (let i=0;i<3;i++){
    contador=i+1;
    var num = parseFloat(prompt("Ingrese número " + contador + ":"));
    lista.push(num);
}

do{
    n=0;
    for (let i=1; i<lista.length; i++)
    if (lista[i-1]>lista[i]){
        temp=lista[i-1];
        lista[i-1]=lista[i];
        lista[i]=temp;
        n=i;
    }
} while (n!=0);

//console.log(lista);

let menor = lista[0];
let mayor = lista[lista.length-1];

if (lista[0]==mayor){
    alert("Los 3 números son iguales");
} else {
    alert("El menor de los números ingresados es " + menor);
    alert("El mayor de los números ingresados es " + mayor);
}