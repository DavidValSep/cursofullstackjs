class Productos {
    constructor(nombre, modelo, precio, categoria) {
        this.nombre = nombre;
        this.modelo = modelo;
        this.precio = precio;
        this.categoria = categoria;
    }

    mostrarInfo() {
        console.log(`Nombre: ${this.nombre}, Modelo: ${this.modelo}, Precio: ${this.precio}, Categoría: ${this.categoria}`);
    }
}

// class Televisores
class Televisores extends Productos {
    constructor(nombre, modelo, precio) {
        super(nombre, modelo, precio, "Televisores");
    }

    mostrarInfo() {
        console.log(`Nombre: ${this.nombre}, Modelo: ${this.modelo}, Precio: ${this.precio}, Categoría: ${this.categoria}`);
    }

}

class Audio extends Productos {
    constructor(nombre, modelo, precio) {
        super(nombre, modelo, precio, "Audio");
    }
    
    mostrarInfo() {
        console.log(`Nombre: ${this.nombre}, Modelo: ${this.modelo}, Precio: ${this.precio}, Categoría: ${this.categoria}`);
    }
}

class Camaras extends Productos {
    constructor(nombre, modelo, precio) {
        super(nombre, modelo, precio, "Cámaras");
    }
    
    mostrarInfo() {
        console.log(`Nombre: ${this.nombre}, Modelo: ${this.modelo}, Precio: ${this.precio}, Categoría: ${this.categoria}`);
    }
}

const televisor1 = new Televisores("Sony", "Bravia 82, 55\"", 1779000);
televisor1.mostrarInfo();
const televisor2 = new Televisores("Sony", "Bravia 5, 65\"", 1179990);
televisor2.mostrarInfo();

const audio1 = new Audio("Audifonos", "WF-1000XM6, Cancelación de Ruido", 269990);
audio1.mostrarInfo();
const audio2 = new Audio("Parlante", "Tower A9AC", 529990);
audio2.mostrarInfo();

const camara1 = new Camaras("Cámara de lente intercambiable", "ILCE-7M5", 2659990);
camara1.mostrarInfo();
const camara2 = new Camaras("Cámara Insignia", "A1", 6649990);
camara2.mostrarInfo();