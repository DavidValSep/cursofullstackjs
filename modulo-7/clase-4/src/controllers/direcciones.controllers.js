import { query } from "../db.js";

export const getDireccionesByRut = async (req, res) => {
  try {
    const { rut } = req.query;
    const result = await query(
      "SELECT * FROM direcciones WHERE rut = $1 ORDER BY id_direccion",
      [rut]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener direcciones" });
  }
};
