class Sumatoria {
    constructor(base) {
        this.base = base;
    }

    sumar(){
        let suma = 0;
        for(let i=1; i<=this.base; i++){
            suma += i;
            console.log(suma);
        }
    }
}

let base = Math.floor(Math.random() * 10) + 1;
const sumatoria1 = new Sumatoria(base);
sumatoria1.sumar();
sumatoria1.sumar();
sumatoria1.sumar();
sumatoria1.sumar();