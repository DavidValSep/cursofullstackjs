class Persona {
    constructor(nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
    }

    saludar() {
        console.log(
            `Hola, mi nombre es ${this.nombre} ${this.apellido} y tengo ${this.edad} años.` //Template literals
        );
    }
}

const persona1 = new persona("Juan", "Pérez", 30);
const persona2 = new persona("María", "Gómez", 25);

persona1.saludar();
persona2.saludar();