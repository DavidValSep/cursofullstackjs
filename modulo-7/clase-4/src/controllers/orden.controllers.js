import pool from "../db.js";

/**
 * POST /orden para hacer pruebas en postman
 * Body esperado:
 * {
 *   "rut": "12345678-9",
 *   "id_direccion": 1,
 *   "productos": [
 *     { "id_producto": 1, "cantidad_producto": 2 },
 *     { "id_producto": 3, "cantidad_producto": 1 }
 *   ]
 * }
 */
export const crearOrden = async (req, res) => {
  const { rut, id_direccion, productos } = req.body;

  if (!rut || !id_direccion || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({
      mensaje: "Faltan campos requeridos: rut, id_direccion, productos[]",
    });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Verificar stock y calcular precio total
    let precio_total = 0;

    for (const item of productos) {
      const { id_producto, cantidad_producto } = item;

      if (!id_producto || !cantidad_producto || cantidad_producto <= 0) {
        await client.query("ROLLBACK");
        return res.status(400).json({
          mensaje: "Cada producto debe tener id_producto y cantidad_producto > 0",
        });
      }

      const productoResult = await client.query(
        "SELECT precio, existencias, nombre FROM productos WHERE id_producto = $1",
        [id_producto]
      );

      if (productoResult.rows.length === 0) {
        await client.query("ROLLBACK");
        return res.status(404).json({
          mensaje: `Producto con id ${id_producto} no encontrado`,
        });
      }

      const { precio, existencias, nombre } = productoResult.rows[0];

      if (existencias - cantidad_producto < 0) {
        await client.query("ROLLBACK");
        return res.status(400).json({
          mensaje: `Stock insuficiente para "${nombre}". Disponible: ${existencias}, solicitado: ${cantidad_producto}`,
        });
      }

      precio_total += precio * cantidad_producto;
    }

    // 2. Insertar la orden
    const ordenResult = await client.query(
      "INSERT INTO orden (rut, id_direccion, precio_total) VALUES ($1, $2, $3) RETURNING *",
      [rut, id_direccion, precio_total]
    );
    const orden = ordenResult.rows[0];

    // 3. Insertar el despacho
    await client.query(
      "INSERT INTO despachos (id_orden, id_direccion) VALUES ($1, $2)",
      [orden.id_orden, id_direccion]
    );

    // 4. Insertar lista de productos y descontar existencias
    for (const item of productos) {
      const { id_producto, cantidad_producto } = item;

      await client.query(
        "INSERT INTO lista_productos (id_orden, id_producto, cantidad_producto) VALUES ($1, $2, $3)",
        [orden.id_orden, id_producto, cantidad_producto]
      );

      const updateResult = await client.query(
        "UPDATE productos SET existencias = existencias - $1 WHERE id_producto = $2 RETURNING existencias, nombre",
        [cantidad_producto, id_producto]
      );

      // Segunda verificación dentro de la transacción (concurrencia)
      if (updateResult.rows[0].existencias < 0) {
        await client.query("ROLLBACK");
        return res.status(400).json({
          mensaje: `Stock insuficiente para "${updateResult.rows[0].nombre}"`,
        });
      }
    }

    await client.query("COMMIT");

    res.status(201).json({
      mensaje: "Orden creada exitosamente",
      orden,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error en transacción:", error);
    res.status(500).json({ mensaje: "Error interno al procesar la orden" });
  } finally {
    client.release();
  }
};
