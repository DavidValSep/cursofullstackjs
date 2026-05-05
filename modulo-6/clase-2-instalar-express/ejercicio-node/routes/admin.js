const path = require("path");
const express = require("express");
const rootDir = require("../utils/path");
const router = express.Router();

//almacenar los productos en memoria
const productos = [];


router.get("/agregar-producto", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "agregar-producto.html"));

});

router.post("/agregar-producto", (req, res, next) => {
  productos.push({ titulo: req.body.nombre });
  res.redirect("/");
});

exports.routes = router;
exports.productos = productos;
