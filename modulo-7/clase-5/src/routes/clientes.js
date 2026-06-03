import {Router} from "express";
import { getClientes, createCliente } from "../controllers/clientesController.js";

const router = Router();

router.get("/clientes", getClientes);
router.post("/clientes", createCliente);

export default router;