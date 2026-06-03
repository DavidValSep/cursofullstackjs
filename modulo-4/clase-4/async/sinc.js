//Síncrono: Las instrucciones se ejecutan una después de la otra.
//Ejemplo: una fila en el supermercado, cada cliente espera al anterior.
console.log("Paso 1");
console.log("Paso 2");
console.log("Paso 3");

//Asíncrono: Permite delegar tareas que toman tiempo sin bloquear el flujo principal.
//Ejemplo: pedir comida a domicilio mientras sigues estudiando.
console.log("Inicio pedido");
setTimeout(() => console.log("Pedido entregado"), 2000);
console.log("Sigo estudiando...");
