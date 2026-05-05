//conseptos middleware, rutas, endpoints, verbos http, status codes
//definicion de mmiddleware: es una función que se ejecuta entre la petición del cliente y la respuesta del servidor, puede modificar la petición, la respuesta o realizar acciones adicionales antes de enviar la respuesta al cliente.
//rutas: son las direcciones URL que el servidor puede manejar, cada ruta puede tener uno o más endpoints asociados.
//endpoints: son los puntos de acceso a una ruta, cada endpoint corresponde a un verbo HTTP (GET, POST, PUT, DELETE, etc.) y define la acción que se realizará cuando se acceda a esa ruta con ese verbo.
//verbos HTTP: son los métodos que se utilizan para indicar la acción que se desea realizar en una ruta (GET para obtener datos, POST para crear datos, PUT para actualizar datos, DELETE para eliminar datos, etc.)
//status codes: son los códigos de estado que el servidor devuelve al cliente para indicar el resultado de la petición (200 para éxito, 404 para no encontrado, 500 para error interno del servidor, etc.)
const http = require("http");
const express = require("express");
const app = express();

const adminRoutes = require('../routes/admin');
const tiendaRoutes = require('../routes/tienda');

app.use(express.urlencoded({ extended: true }));

app.use(adminRoutes);
app.use(tiendaRoutes);

app.use((req, res, next) => {
    res.status(404).send('Página no encontrada');
});

// const server = http.createServer(app);

// server.listen(3000, () => {
//     console.log('Servidor corriendo con express en el puerto 3000');
// });

app.listen(3000, () => {
    console.log('Servidor corriendo con express en el puerto 3000');
});