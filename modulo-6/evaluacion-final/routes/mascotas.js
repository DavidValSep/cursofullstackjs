const express = require('express');
const router = express.Router();
const mascotasController = require('../controllers/mascotasController');

// Ruta principal en GET
router.get('/', mascotasController.getAllMascotas);

module.exports = router;