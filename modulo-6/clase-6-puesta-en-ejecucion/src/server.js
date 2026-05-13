const path = require("path");
const express = require("express");
const rootDir = require("../utils/path");
const expressHbs = require("express-handlebars");
const catalogRoutes = require("../routes/catalog");

const app = express();

// Configuración Handlebars
app.engine(
  "handlebars",
  expressHbs.engine({
    extname: "handlebars",
    defaultLayout: false,
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
app.use("/", catalogRoutes);

// 404
app.use((req, res) => {
  res.status(404).render("no-encontrado");
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