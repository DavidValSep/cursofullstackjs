// 1.Promesa con setTimeout para simular petición a base de datos
console.log("Creando promesa");
let promesaPersona = new Promise((resolve, reject) => {
    console.log("Registrando promesa");
    setTimeout(() => {
        const persona = {
            nombre: "Mario",
            apellido: "Ross",
            edad: 55,
            lugar: "Mushroom Kingdom"
        };
        resolve(persona);
    }, 3000);
});

console.log("Esperando respuesta");
promesaPersona.then(persona => {
    console.log("Respuesta:", persona);
}).catch(error => {
    console.error("Error:", error);
});

//2. Promesa que depende de los segundos actuales
let promesaSegundos = new Promise((resolve, reject) => {
    let fecha = new Date();
    let segundos = fecha.getSeconds();
    console.log(`Segundos actuales: ${segundos}`);

    if (segundos > 30) {
        if (segundos % 2 === 0) {
            resolve(fecha.toLocaleTimeString());
        } else {
            reject(new Error("Número impar, rechazando"));
        }
    } else {
        if (segundos % 2 !== 0) {
            resolve(fecha.toLocaleTimeString());
        } else {
            reject(new Error("Número par, rechazando"));
        }
    }
});

promesaSegundos.then(hora => {
    console.log("Hora resuelta:", hora);
}).catch(error => {
    console.error("Error en promesa segundos:", error.message);
});

//3. Promesa con proceso pesado
console.log("Antes del proceso pesado");
let promesaPesada = new Promise((resolve, reject) => {
    console.log("Durante el proceso pesado (esto puede tardar unos segundos)");
    //Bucle grande para simular carga
    for (let i = 0; i < 1e9; i++) {
        //Para consumir tiempo
        Math.sqrt(i);
    }
    resolve("Proceso pesado completado");
});

promesaPesada.then(resultado => {
    console.log("Después del proceso pesado:", resultado);
}).catch(error => {
    console.error("Error en proceso pesado:", error);
});