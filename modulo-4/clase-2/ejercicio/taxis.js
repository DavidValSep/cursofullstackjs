class Taxi {
    constructor(licencia, vehiculo, caracteristica) {
        this.licencia = licencia;
        this.vehiculo = vehiculo;
        this.caracteristica = caracteristica;
    }
    
    mostrarInfo() {
        console.log(`Licencia: ${this.licencia}, Vehículo: ${this.vehiculo}, Característica: ${this.caracteristica}`);
    }
}

class Tradicional extends Taxi {
    constructor() {
        super("A1", "Tradicional", "Techo Amarillo");
    }
}

class Particular extends Taxi {
    constructor(tipovehiculo) {
        super("B", "Particular", "Techo Negro");
        this.tipovehiculo = tipovehiculo;
    }

    mostrarInfo() {
        console.log(`Licencia: ${this.licencia}, Vehículo: ${this.vehiculo}, Característica: ${this.caracteristica}, Tipo de vehículo: ${this.tipovehiculo}`);
    }
}

class Express extends Particular {
    constructor() {
        super("Express");
    }
}

class Premium extends Particular {
    constructor() {
        super("Premium");
    }
}

class Cargo extends Taxi  {
    constructor() {
        super("B", "Cargo", "Transporta Carga");
    }
}

const vehiculo1 = new Tradicional();
vehiculo1.mostrarInfo();

const particular1 = new Express();
particular1.mostrarInfo();

const particular2 = new Premium();
particular2.mostrarInfo();

const cargo1 = new Cargo();
cargo1.mostrarInfo();