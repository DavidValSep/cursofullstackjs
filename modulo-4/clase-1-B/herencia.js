class Animal {
    constructor(nombre, color) {
        this.nombre = nombre;
        this.color = color;
    }

    mover () {
    console.log(`${this.nombre} se esta moviendo.`);
}

mostrarColor() {
    console.log(`El color de ${this.nombre} es ${this.color}.`);
}
}

class Perro extends Animal {
    ladrar() {
        console.log(`${this.nombre} esta ladrando.`);
    }
}

class Gato extends Animal {
    maullar() {
        console.log(`${this.nombre} esta maullando.`);
    }
}

const miPerro = new Perro("Rex", "Marrón");
const miGato = new Gato("Whiskers", "Blanco");

miPerro.mover();
miPerro.ladrar();

miGato.mover();
miGato.maullar();

