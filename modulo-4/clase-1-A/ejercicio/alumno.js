class Alumno {
    constructor(nombre, edad, carrera) {
        this.nombre = nombre;
        this.edad = edad;
        this.carrera = carrera;
    }

    mostrarInfo() {
        console.log(`Nombre: ${this.nombre}, Edad: ${this.edad}, Carrera: ${this.carrera}`);
    }
}

const alumno = new Alumno('María', 22, 'Ingeniería en Sistemas');
alumno.mostrarInfo();