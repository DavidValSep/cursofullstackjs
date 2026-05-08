const path = require("path");
const express = require("express");
const fs = require('fs');
const p = path.join(__dirname, '../', 'data', 'productos.json');
//agregamos el router de express para manejar las rutas de la tienda
const router = express.Router();
const rootDir = require("../utils/path");
const adminData = require("./admin");


router.get("/", (req, res, next) => {
    fs.readFile(p, 'utf-8', (err, fileContent) => {
        let productos = [];

        if (!err && fileContent) {
            try {
                const data = JSON.parse(fileContent);
                productos = data.map(producto => ({
                    nombre: producto.nombre || '',
                    precio: Number(producto.precio) || 0,
                    imagen: producto.imagen || ''
                }));
            } catch (parseError) {
                console.error('Error leyendo productos.json:', parseError);
            }
        }

        const criterio = req.query.ordenar;
        if (criterio === 'nombre') {
            productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
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