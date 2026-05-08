//conseptos middleware, rutas, endpoints, verbos http, status codes
//definicion de mmiddleware: es una función que se ejecuta entre la petición del cliente y la respuesta del servidor, puede modificar la petición, la respuesta o realizar acciones adicionales antes de enviar la respuesta al cliente.
//rutas: son las direcciones URL que el servidor puede manejar, cada ruta puede tener uno o más endpoints asociados.
//endpoints: son los puntos de acceso a una ruta, cada endpoint corresponde a un verbo HTTP (GET, POST, PUT, DELETE, etc.) y define la acción que se realizará cuando se acceda a esa ruta con ese verbo.
//verbos HTTP: son los métodos que se utilizan para indicar la acción que se desea realizar en una ruta (GET para obtener datos, POST para crear datos, PUT para actualizar datos, DELETE para eliminar datos, etc.)
//status codes: son los códigos de estado que el servidor devuelve al cliente para indicar el resultado de la petición (200 para éxito, 404 para no encontrado, 500 para error interno del servidor, etc.)
const path = require("path");
const http = require("http");
const express = require("express");
const adminData = require("../routes/admin");
const tiendaRoutes = require("../routes/tienda");
const rootDir = require("../utils/path");
const expressHbs = require("express-handlebars");

const app = express();

// configurar el motor de plantillas Handlebars
app.engine("handlebars", expressHbs.engine({
    extname: "handlebars",
    defaultLayout: "main",
    layoutsDir: path.join(rootDir, "views", "partials"),
    partialsDir: path.join(rootDir, "views", "partials")
}));
app.set("view engine", "handlebars");
app.set("views", path.join(rootDir, "views"));
;;
app.use(express.static(path.join(rootDir, "public")));
app.use(express.urlencoded({ extended: true }));

app.use('/admin', adminData.router);
app.use(tiendaRoutes);

// Middleware para rutas no encontradas (404) - debe ir al final
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

// Middleware de manejo de errores (para errores 405, etc.) - debe tener 4 parámetros
app.use((err, req, res, next) => {
    console.error(err.stack); // Log del error para debugging
    res.status(405).sendFile(path.join(rootDir, "views", "405.html")); // O una página genérica
});

// Middleware de manejo de errores (para errores 500, etc.) - debe tener 4 parámetros
app.use((err, req, res, next) => {
    console.error(err.stack); // Log del error para debugging
    res.status(500).sendFile(path.join(rootDir, "views", "500.html")); // O una página genérica
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});