const path = require("path");
const express = require("express");
//agregamos el router de express para manejar las rutas de la tienda
const router = express.Router();
const rootDir = require("../utils/path");
const adminData = require("./admin");


router.get("/", (req, res, next) => {
    //renderizamos la vista tienda y le pasamos los productor obtenidos de adminData
    res.render("tienda", { productos: adminData.productos });
    
});

module.exports = router;