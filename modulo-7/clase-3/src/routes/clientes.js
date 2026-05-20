import { Router } from "express";
import {
  getClientes,
  deleteCliente,
  updateCliente,
  createCliente,
} from "../controllers/clientes.controllers.js";

const router = Router();

router.get('/clientes', getClientes);
router.delete('/clientes', deleteCliente);
router.put('/clientes/:rut', updateCliente);
router.post('/clientes', createCliente);

export default router;

