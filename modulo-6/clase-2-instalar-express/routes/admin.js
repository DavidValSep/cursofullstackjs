const fs = require('fs');
const path = require("path");
const express = require("express");

const router = express.Router();
const rootDir = require("../utils/path");
const adminData = require("./admin");

const productos = [];
const p = path.join(rootDir, 'data', 'productos.txt');
router.get("/agregar-producto", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "agregar-producto.html"));
});

router.post("/agregar-producto", (req, res, next) => {
//   productos.push({
//     titulo: req.body.nombre,
//     precio: req.body.precio,
//     imagen: req.body.imagen,
//    });
//   res.redirect("/");
    const nuevoProducto = `${req.body.nombre}, ${req.body.precio}, ${req.body.imagen}\n`;

    // Escritura NON-BLOCKING
    fs.appendFile(p, nuevoProducto, (err) => {
        if (err) {
            console.log("Error al guardar el producto:", err);
            // Opcional: manejar el error enviando una respuesta al usuario
            return res.status(500).send("Error al guardar en el servidor.");
        }
        
        // Solo cuando la escritura termina con éxito, redirigimos
        res.redirect("/");
    });
});

exports.router = router;
exports.productos = productos;