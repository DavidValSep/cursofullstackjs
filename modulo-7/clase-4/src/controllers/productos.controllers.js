import { query } from "../db.js";

export const getProductos = async (req, res) => {
  try {
    const result = await query("SELECT * FROM productos ORDER BY nombre");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener productos" });
  }
};

export const getProductoById = async (req, res) => {
  try {
    const { id } = req.query;
    const result = await query(
      "SELECT * FROM productos WHERE id_producto = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener producto" });
  }
};

export const getProductosByOrden = async (req, res) => {
  try {
    const { orden } = req.query;
    const result = await query(
      `SELECT p.id_producto, p.nombre, p.precio, lp.cantidad_producto
       FROM productos p
       JOIN lista_productos lp ON p.id_producto = lp.id_producto
       WHERE lp.id_orden = $1`,
      [orden]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener productos de la orden" });
  }
};
