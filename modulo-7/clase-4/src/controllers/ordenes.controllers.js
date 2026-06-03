import { query } from "../db.js";

export const getOrdenesByRut = async (req, res) => {
  try {
    const { rut } = req.query;
    const result = await query(
      `SELECT o.id_orden, o.rut, o.precio_total, d.direccion AS direccion_despacho
       FROM orden o
       JOIN direcciones d ON o.id_direccion = d.id_direccion
       WHERE o.rut = $1
       ORDER BY o.id_orden DESC`,
      [rut]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener órdenes" });
  }
};
