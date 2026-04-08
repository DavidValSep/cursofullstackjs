class BandaMusical {
    constructor(banda, genero, integrantes, discos) {
        this.banda = banda;
        this.genero = genero;
        this.integrantes = integrantes;
        this.discos = discos;
    }

    mostrarInformacion () {
        console.log(`Banda: ${this.banda}, Género: ${this.genero}, Integrantes: ${this.integrantes}
Discos: ${this.discos.join(" - ")}`);
    }
}



const banda1 = new BandaMusical("Barak", "Cristiana", 5, ["Todo va a estar bien", "La Tierra Canta", "Ven Espíritu Santo", "Libre Soy", "A Danzar"]);

banda1.mostrarInformacion();