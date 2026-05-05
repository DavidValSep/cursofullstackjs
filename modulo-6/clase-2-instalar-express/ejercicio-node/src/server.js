//conecpetos middleware: funciones que se ejecutan durante el ciclo de vida de una solicitud a nuestro servidor, pueden modificar la solicitud, la respuesta o finalizar el ciclo de vida de la solicitud. Se ejecutan en orden, es decir, el primer middleware registrado se ejecuta primero, luego el segundo y así sucesivamente. Si un middleware no llama a next(), la solicitud se detendrá en ese punto y no se ejecutarán los siguientes middlewares.
const http = require('http');
const path = require("path");
const express = require('express');
const adminData = require("../routes/admin");
const tiendaRoutes = require("../routes/tienda");
const rootDir = require("../utils/path");

const app = express();

//configurar el motor de plantillas ejs
app.set("view engine", "ejs");
app.set("views", path.join(rootDir, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));

app.use('/admin',adminData.routes);
app.use(tiendaRoutes);

//agregar un middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, "views", "no-encontrado.html"));
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});




