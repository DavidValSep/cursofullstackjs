import { Router } from "express";
import { crearOrden } from "../controllers/orden.controllers.js";

const router = Router();

router.post("/orden", crearOrden);

export default router;
