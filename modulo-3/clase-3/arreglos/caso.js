const productos = [{
    id: 1,
    nombre: "Camisa",
    precio: 2000
  },
  {
    id: 2,
    nombre: "Pantalón",
    precio: 3000
  },
  {
    id: 3,
    nombre: "Zapatos",
    precio: 4000
  }
];

const nombreProductos = productos.map((producto) => producto.nombre);
console.log(nombreProductos); // ["Camisa", "Pantalón", "Zapatos"]
const preciosProductos = productos.map((producto) => producto.precio);
console.log(preciosProductos); // [2000, 3000, 4000]

console.log(productos); // [{nombre: "Camisa", precio: 2000}, {nombre: "Pantalón", precio: 3000}, {nombre: "Zapatos", precio: 4000}]