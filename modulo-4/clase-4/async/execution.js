console.log("Inicio de programa"); //1

setTimeout(() => {
  console.log("Primer Timeout"); //5 callback(funcion que se manda como argumento a otra funcion)
}, 3000); //milesimas de segundo

setTimeout(() => {
  console.log("Segundo Timeout"); //3
}, 0); // le agregamos 1 milesima

setTimeout(() => {
  console.log("Tercer Timeout"); //4
}, 0);

console.log("Fin de programa");//2
