// Data Fake: Un arreglo de objetos
const productos = [
  {
    id: 1,
    nombre: "Alimento Premium Gato",
    descripcion: "Sabor salmón, 2kg de pura energía.",
    precio: 15000,
    imagen: "./assets/gatito.jpg",
  },
  {
    id: 2,
    nombre: "Rascador Torre",
    descripcion: "3 niveles con pompones colgantes.",
    precio: 45000,
    imagen: "./assets/gatito.jpg",
  },
  {
    id: 3,
    nombre: "Cama Iglú",
    descripcion: "Súper suave y térmica para el invierno.",
    precio: 25000,
    imagen: "./assets/gatito.jpg",
  },
  {
    id: 4,
    nombre: "Juguete Ratón Pro",
    descripcion: "Con movimiento aleatorio a batería.",
    precio: 12000,
    imagen: "./assets/gatito.jpg",
  },
  {
    id: 5,
    nombre: "Comedero Automático",
    descripcion: "Dispensa comida a horas programadas.",
    precio: 35000,
    imagen: "./assets/gatito.jpg",
  },
];

// Función para cargar productos
const cargarProductos = () => {
  const contenedor = document.getElementById("contenedor-productos");

  // Usamos MAP para transformar cada objeto en un pedazo de HTML (Card de Bootstrap)
  const productosHTML = productos
    .map((producto) => {
      return `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card h-100 shadow-sm">
                    <img src="${producto.imagen}" class="card-img-top imagen-producto" alt="${producto.nombre}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text text-muted">${producto.descripcion}</p>
                        <p class="fw-bold text-primary mt-auto">$${producto.precio.toLocaleString("es-CL")}</p>
                        <button class="btn btn-outline-success w-100">Agregar al carro</button>
                    </div>
                </div>
            </div>
        `;
    })
    .join(""); // El join("") es para quitar las comas que genera el arreglo del map

  contenedor.innerHTML = productosHTML;
};

// Ejecutar la función cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", cargarProductos);
