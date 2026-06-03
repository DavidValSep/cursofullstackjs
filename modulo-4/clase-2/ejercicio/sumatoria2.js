class Sumatoria {
    constructor(base) {
        this.base = base;
        this.contador = 0;
        this.acumulado = 0;
        console.log(`Constructor - ${this.base}`);
    }

    sumar(){
        this.contador++;
        this.acumulado += this.base + this.contador;
        console.log(`Paso - ${this.contador}: ${this.acumulado}`);
    }
}

let baseSumatoria = Math.floor(Math.random() * 10) + 1;
const sumatoria = new Sumatoria(baseSumatoria);
sumatoria.sumar();
sumatoria.sumar();
sumatoria.sumar();
sumatoria.sumar();
sumatoria.sumar();
sumatoria.sumar();
sumatoria.sumar();