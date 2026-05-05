const path = require("path");
const express = require("express");

const router = express.Router();
const rootDir = require("../utils/path");
const adminData = require("./admin");

const productos = [];

router.get("/agregar-producto", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "agregar-producto.html"));
});

router.post("/agregar-producto", (req, res, next) => {
  productos.push({ titulo: req.body.nombre });
  res.redirect("/");
});

exports.router = router;
exports.productos = productos;