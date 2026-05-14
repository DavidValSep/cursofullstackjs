const path = require("path");
const express = require("express");
const rootDir = require("../utils/path");
const expressHbs = require("express-handlebars");
const mascotasRoutes = require('../routes/mascotas');
const app = express();
app.use(express.static(path.join(__dirname, "../public")));

app.engine(
  "handlebars",
  expressHbs.engine({
    extname: "handlebars",
    defaultLayout: "layout",
    helpers: {
      encodeURIComponent: (str) => encodeURIComponent(str),
    },
  }),
);
app.set("view engine", "handlebars");
app.set("views", path.join(rootDir, "views"));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));

//Metodos no permitidos
app.use((req, res, next) => {
  const metodosPermitidos = ["GET", "POST", "DELETE"];
  if (!metodosPermitidos.includes(req.method)) {
    // Si el método no es permitido, enviamos error 405
    return res.status(405).render("metodo-no-permitido");
  }
  next();
});

// Rutas
app.use('/', mascotasRoutes);

// Cambia esto temporalmente en server.js
app.use((req, res) => {
  res.status(404).send("Archivo o ruta no encontrada: " + req.url);
});

const server = app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error('ERROR: El puerto 3000 ya está siendo usado por otro proceso.');
  } else {
    console.error('Error al iniciar el servidor:', e);
  }
});