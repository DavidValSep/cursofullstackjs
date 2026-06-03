const express = require('express');
const router = express.Router();
const mascotasController = require('../controllers/mascotasController');

// Ruta principal en GET
router.get('/', mascotasController.getAllMascotas);

// GET /mascota/:id - Mascota específica por ID
router.get('/mascota/:id', mascotasController.getMascotaById);

// GET /rut/:rut - Mascota específica por RUT
router.get('/rut/:rut', mascotasController.getMascotaByRut);

router.get('/agregar-mascota', mascotasController.getAgregarMascota);

router.post('/agregar-mascota', mascotasController.postAgregarMascota);

router.delete('/eliminar/:nombre', mascotasController.deleteMascotaByName);

router.delete('/eliminar-por-rut/:rut', mascotasController.deleteMascotasByRut);

module.exports = router;