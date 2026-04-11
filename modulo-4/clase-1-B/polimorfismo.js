class Vehiculo {
    mover() {
        console.log("El vehículo se está moviendo.");
    }
}

class Auto extends Vehiculo {
    mover() {
        console.log("El auto va por la carretera.");
    }
}

class Avion extends Vehiculo {
    mover() {
        console.log("El avión vuela por el cielo.");
    }
}

//crear instancias
const vehiculos = [new Vehiculo(), new Auto(), new Avion()];

vehiculos.forEach(vehiculo => vehiculo.mover()); // El vehículo se está moviendo. El auto va por la carretera. El avión vuela por el cielo.