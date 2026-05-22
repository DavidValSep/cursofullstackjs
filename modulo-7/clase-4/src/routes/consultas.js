import { Router } from "express";
import { getClientes, getClienteByRut } from "../controllers/clientes.controllers.js";
import {
  getProductos,
  getProductoById,
  getProductosByOrden,
} from "../controllers/productos.controllers.js";
import { getOrdenesByRut } from "../controllers/ordenes.controllers.js";
import { getDireccionesByRut } from "../controllers/direcciones.controllers.js";
import { getDespachoByOrden } from "../controllers/despachos.controllers.js";

const router = Router();

/**
 * GET /?filtro=<valor>[&param=<valor>]
 *
 * filtro=productos                     → lista de productos
 * filtro=productos&id=<id>             → producto por id
 * filtro=productos&orden=<id_orden>    → productos de una orden
 * filtro=ordenes&rut=<rut>            → órdenes de un cliente
 * filtro=clientes                      → lista de clientes
 * filtro=clientes&rut=<rut>           → cliente por rut
 * filtro=direcciones&rut=<rut>        → direcciones de un cliente
 * filtro=despachos&orden=<id_orden>   → despacho de una orden
 */
router.get("/", (req, res) => {
  const { filtro, id, rut, orden } = req.query;

  switch (filtro) {
    case "productos":
      if (id) return getProductoById(req, res);
      if (orden) return getProductosByOrden(req, res);
      return getProductos(req, res);

    case "ordenes":
      if (!rut) {
        return res.status(400).json({ mensaje: "Parámetro 'rut' requerido" });
      }
      return getOrdenesByRut(req, res);

    case "clientes":
      if (rut) return getClienteByRut(req, res);
      return getClientes(req, res);

    case "direcciones":
      if (!rut) {
        return res.status(400).json({ mensaje: "Parámetro 'rut' requerido" });
      }
      return getDireccionesByRut(req, res);

    case "despachos":
      if (!orden) {
        return res.status(400).json({ mensaje: "Parámetro 'orden' requerido" });
      }
      return getDespachoByOrden(req, res);

    default:
      return res.status(400).json({
        mensaje: "Filtro no válido. Opciones: productos, ordenes, clientes, direcciones, despachos",
      });
  }
});

export default router;
