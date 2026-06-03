class Producto {
    constructor(nombre, precio) {
        this._nombre = nombre;
        this._precio = precio;
    }

    get precio() {
        return `${this._precio}`;
    }

    set precio(nuevoPrecio) {
        if (nuevoPrecio < 0) {
            console.log("El precio no puede ser negativo.");
        } else {
            this._precio = nuevoPrecio;
        }
    }
}

const producto1 = new Producto("Laptop", 450000);
console.log(producto1.precio); // 450000

producto1.precio = 320000;
console.log(producto1.precio); // 320000



//Forma Moderna

class Cuenta{
    #saldo = 0;

    get saldo() {
        return this.#saldo;
    }

    depositar(monto) { 
        this.#saldo += monto;
        console.log(`Has depositado ${monto}. Saldo actual: ${this.#saldo}`);
    }
}

const cuenta1 = new Cuenta();
console.log(cuenta1.saldo); // undefined
cuenta1.depositar(1000); // Has depositado 1000. Saldo actual: 1000
console.log(cuenta1.saldo); // 1000