const express = require('express');
const router = express.Router();
const mascotasController = require('../controllers/mascotasController');

// Ruta principal en GET
router.get('/', mascotasController.getAllMascotas);

// GET /mascota/:id - Mascota específica por ID
router.get('/mascota/:id', mascotasController.getMascotaById);

module.exports = router;