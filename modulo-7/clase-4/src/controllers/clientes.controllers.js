import { query } from "../db.js";

export const getClientes = async (req, res) => {
  try {
    const result = await query("SELECT * FROM clientes ORDER BY nombre");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener clientes" });
  }
};

export const getClienteByRut = async (req, res) => {
  try {
    const { rut } = req.query;
    const result = await query("SELECT * FROM clientes WHERE rut = $1", [rut]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener cliente" });
  }
};
