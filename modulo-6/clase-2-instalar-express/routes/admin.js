const express = require("express");

const router = express.Router();

router.get('/agregar-producto', (req, res, next) => {
    console.log('Agregar Producto');
    res.send(
        '<form action="/producto" method="POST"><input type="text" name="nombre" placeholder="Nombre del producto"><button type="submit">Agregar</button></form>'
    );
});

router.post('/producto', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;