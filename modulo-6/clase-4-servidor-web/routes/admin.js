const fs = require('fs');
const path = require("path");
const express = require("express");

const router = express.Router();
const rootDir = require("../utils/path");

const p = path.join(rootDir, 'data', 'productos.json');
router.get("/agregar-producto", (req, res, next) => {
  res.render("agregar-producto", { title: "Agregar Producto" });
});

router.post("/agregar-producto", (req, res, next) => {
    fs.readFile(p, 'utf-8', (err, fileContent) => {
        let productos = [];

        if (!err && fileContent && fileContent.trim()) {
            try {
                productos = JSON.parse(fileContent);
            } catch (parseError) {
                console.error('Error parseando productos.json:', parseError);
                productos = [];
            }
        }

        productos.push({
            nombre: req.body.nombre,
            precio: Number(req.body.precio) || 0,
            imagen: req.body.imagen,
            disponible: Array.isArray(req.body.disponible)
                ? req.body.disponible.includes('true')
                : req.body.disponible === 'true'
        });

        fs.writeFile(p, JSON.stringify(productos, null, 2), 'utf-8', (writeErr) => {
            if (writeErr) {
                console.log("Error al guardar el producto en JSON:", writeErr);
                return res.status(500).send("Error al guardar en el servidor.");
            }

            res.redirect("/");
        });
    });
});

exports.router = router;