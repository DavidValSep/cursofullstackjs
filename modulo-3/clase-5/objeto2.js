const productos = [
    {
        id: 1,
        nombre: "Camiseta",
        precio: 20,
        categoria: "Ropa",
    },
    {
        id: 2,
        nombre: "Pantalón",
        precio: 30,
        categoria: "Ropa",
    },
    {
        id: 3,
        nombre: "Zapatos",
        precio: 50,
        categoria: "Calzado",
    },
];

console.log(productos[0].nombre); // Imprime: Camiseta


const estudiante = {
    nombre: "Ana",
    apellido: "García",
    edad: 22,
    carrera: "Ingeniería",
    ramos: ["Matemáticas", "Física", "Programación"],
    calificacion: {
        matematicas: 85,
        fisica: 90,
        programacion: 95,
    }
};

console.log(estudiante.ramos[2]); // Imprime: Física
console.log(estudiante.calificacion.programacion); // Imprime: 95
console.log(`Física: ${estudiante.calificacion.fisica}, Programación: ${estudiante.calificacion.programacion}`); // Imprime: Física: 90, Programación: 95