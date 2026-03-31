const frutas = ['manzana', 'banana', 'naranja', 'pera', 'uva'];

for (const fruta of frutas) {
    console.log(fruta);
}

const persona = {
    nombre: 'Juan',
    edad: 30,
    ciudad: 'Madrid'
};

for(const propiedad in persona) {
    console.log(`${propiedad} : ${persona[propiedad]}`);
};