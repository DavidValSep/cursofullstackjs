import { Router } from "express";
import { getPaises, getPaisesPib, createPais, deletePais } from "../controllers/paisesControllers.js";

const router = Router();

router.get("/paises", getPaises);
router.get("/paisespib", getPaisesPib);
router.post("/crear-pais", createPais);
router.delete("/eliminar-pais/:nombre", deletePais);

export default router;