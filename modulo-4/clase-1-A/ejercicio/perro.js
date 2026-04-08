class Perro {
    constructor(nombre, raza, edad, color, pelaje) {
        this.nombre = nombre;
        this.raza = raza;
        this.edad = edad;
        this.color = color;
        this.pelaje = pelaje;
    }

    mostrarInfo() {
        console.log(`Nombre: ${this.nombre}, Raza: ${this.raza}, Edad: ${this.edad}`);
    }

    ladrar() {
        console.log("¡Guau Guau!");
    }
}

morita = new Perro("Morita", "Labrador", 6, "Dorada", "Largo");
morita.mostrarInfo();
morita.ladrar();