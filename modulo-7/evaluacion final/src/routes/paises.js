import { Router } from "express";
import { getPaises, getPaisesPib, createPais } from "../controllers/paisesControllers.js";

const router = Router();

router.get("/paises", getPaises);
router.get("/paisespib", getPaisesPib);
router.post("/crear-pais", createPais);

export default router;