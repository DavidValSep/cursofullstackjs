import chalk from 'chalk';
import dayjs from 'dayjs';

const fechaActual = dayjs().format('DD-MM-YYYY HH:mm:ss');
console.log(fechaActual);

const mensajeBienvenida = chalk.green('Bienvenidos a mi aplicación.');
console.log(mensajeBienvenida);

const mensajeAdicional = chalk.yellow(`La fecha y hora actual es: ${fechaActual}`);
console.log(mensajeAdicional);