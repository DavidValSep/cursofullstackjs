//data fake
const productos = [
    {
        id: 1,
        nombre: "Alimento para gatos",
        precio: 500,
        imagen: "./assets/img/gatito.jpg",
        descripcion: "Alimento balanceado para gatos de todas las edades."
    },
    {
        id: 2,
        nombre: "Juguetes para gatos",
        precio: 200,
        imagen: "./assets/img/gatito.jpg",
        descripcion: "Juguetes divertidos para gatos."
    },
    {
        id: 3,
        nombre: "Caja de arena",
        precio: 300,
        imagen: "./assets/img/gatito.jpg",
        descripcion: "Caja de arena para gatos."
    },
    {
        id: 4,
        nombre: "Rascador para gatos",
        precio: 400,
        imagen: "./assets/img/gatito.jpg",
        descripcion: "Rascador para gatos."
    },
    {
        id: 5,
        nombre: "Collar para gatos",
        precio: 150,
        imagen: "./assets/img/gatito.jpg",
        descripcion: "Collar para gatos."
    },
    {
        id: 6,
        nombre: "Comida para gatos",
        precio: 250,
        imagen: "./assets/img/gatito.jpg",
        descripcion: "Comida balanceada para gatos."
    },
    {
        id: 7,
        nombre: "Shampoo para gatos",
        precio: 100,
        imagen: "./assets/img/gatito.jpg",
        descripcion: "Shampoo para gatos."
    },
    {
        id: 8,
        nombre: "Juguetes para perros",
        precio: 300,
        imagen: "./assets/img/gatito.jpg",
        descripcion: "Juguetes divertidos para perros."
    },
];


const cargarProductos = () => {
    const contenedor = document.getElementById("contenedor-productos");

    const productosHTML = productos.map((producto) => {
        return `
            <div class="col-12 col-md-4 col-lg-3 mb-4">
                <div class="card h-100 shadow-sm">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
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
    .join("");
    contenedor.innerHTML = productosHTML;
};

document.addEventListener("DOMContentLoaded", cargarProductos);