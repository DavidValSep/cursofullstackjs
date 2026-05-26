import { Router } from "express";
import {
  getPeliculas,
  createPelicula,
  asignarActor,
} from "../controllers/peliculasController.js";
import { getActores, createActor } from "../controllers/actoresController.js";

const router = Router();

router.get("/peliculas", getPeliculas);
router.post("/peliculas", createPelicula);

router.get("/actores", getActores);
router.post("/actores", createActor);

router.post("/asignar-actor", asignarActor);

export default router;
