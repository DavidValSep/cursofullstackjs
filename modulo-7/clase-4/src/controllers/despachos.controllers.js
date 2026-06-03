import { query } from "../db.js";

export const getDespachoByOrden = async (req, res) => {
  try {
    const { orden } = req.query;
    const result = await query(
      `SELECT d.id_despacho, d.id_orden, dir.direccion
       FROM despachos d
       JOIN direcciones dir ON d.id_direccion = dir.id_direccion
       WHERE d.id_orden = $1`,
      [orden]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Despacho no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener despacho" });
  }
};
