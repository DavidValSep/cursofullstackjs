const usuario = {
    nombre: 'Juan',
    edad: 30,
    profesion: 'Desarrollador',
    activo: true,
    saludar: function() {
        console.log(`Hola, mi nombre es ${this.nombre}.`);
    }
};

usuario.saludar();