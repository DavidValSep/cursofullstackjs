const path = require("path");
const express = require("express");
const fs = require('fs');
const p = path.join(__dirname, '../', 'data', 'productos.txt');
//agregamos el router de express para manejar las rutas de la tienda
const router = express.Router();
const rootDir = require("../utils/path");
const adminData = require("./admin");


router.get("/", (req, res, next) => {
// Lectura NON-BLOCKING
    fs.readFile(p, 'utf-8', (err, fileContent) => {
        let productos = [];

        if (!err && fileContent) {
            // Procesamos cada línea: "nombre, precio"
            productos = fileContent.split('\n')
                .filter(linea => linea.trim() !== "") // Evita líneas vacías
                .map(linea => {
                    const [nombre, precio, imagen] = linea.split(',');
                    return {
                        titulo: nombre.trim(),
                        precio: parseFloat(precio.trim()),
                        imagen: imagen
                    };
                });
        }

        // Si hay un query param de orden, lo aplicamos antes de renderizar
        const criterio = req.query.ordenar;
        if (criterio === 'nombre') {
            productos.sort((a, b) => a.titulo.localeCompare(b.titulo));
        } else if (criterio === 'precio') {
            productos.sort((a, b) => a.precio - b.precio);
        }

        res.render('tienda', {
            productos: productos,
            path: '/'
        });
    });
});

module.exports = router;