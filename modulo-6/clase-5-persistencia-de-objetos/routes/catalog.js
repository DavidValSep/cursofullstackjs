const express = require("express");
const router = express.Router();
const {
  getCatalog,
  getAgregar,
  postAgregar,
  deleteItem,
} = require("../controllers/catalogController");

router.get("/", getCatalog);
router.get("/agregar-peliculas", getAgregar);
router.post("/agregar-peliculas", postAgregar);
router.post("/eliminar/:type/:name", deleteItem);

module.exports = router;
