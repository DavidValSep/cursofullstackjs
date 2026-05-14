const express = require("express");
const router = express.Router();
const {
  getMascotas,
} = require("../controllers/mascotasController");

router.get("/", getMascotas);

module.exports = router;
