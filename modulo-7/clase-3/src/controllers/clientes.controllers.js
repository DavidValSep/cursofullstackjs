import pool from "../db.js";

// GET /clientes  →  ?rut= | ?edad= | ?nombre= | (sin parámetros)
export const getClientes = async (req, res) => {
  const { rut, edad, nombre } = req.query;

  try {
    let consulta;
    //por rut
    if (rut !== undefined) {
      //query object parametrizada para evitar inyección SQL, $1 se reemplaza por el valor de rut en el array values
      consulta = {
        text: "SELECT rut, nombre, edad FROM clientes WHERE rut = $1",
        values: [rut],
      };
      //por edad
    } else if (edad !== undefined) {
      const edadNum = Number(edad);
      if (!Number.isInteger(edadNum) || edadNum < 0) {
        return res.status(400).json({
          ok: false,
          mensaje: "El parámetro edad debe ser un número entero positivo",
        });
      }
      consulta = {
        text: "SELECT rut, nombre, edad FROM clientes WHERE edad = $1",
        values: [edadNum],
      };
      //por nombre
    } else if (nombre !== undefined) {
      consulta = {
        text: "SELECT rut, nombre, edad FROM clientes WHERE nombre ILIKE $1 ORDER BY nombre",
        values: [`${nombre}%`],
      };
      //si no viene ningun filtro ordenados por nombre
    } else {
      consulta = {
        text: "SELECT rut, nombre, edad FROM clientes ORDER BY nombre",
        values: [],
      };
    }

    //Ejecución de la consulta
    const { rows } = await pool.query(consulta);
    return res.status(200).json({ ok: true, data: rows });
    //manejo errores
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, mensaje: "Error en el servidor", error: err.message });
  }
};

// DELETE /clientes  →  ?rut= | ?nombre= | ?edad=
export const deleteCliente = async (req, res) => {
  const { rut, nombre, edad } = req.query;

  try {
    if (rut !== undefined) {
      //eliminar por rut
      const consulta = {
        text: "DELETE FROM clientes WHERE rut = $1",
        values: [rut],
      };
      const { rowCount } = await pool.query(consulta);
      //si no se eliminó ningún registro, el cliente no existe
      if (rowCount === 0) {
        return res
          .status(404)
          .json({ ok: false, mensaje: "Cliente no existe" });
      }
      //si se eliminó, devolver mensaje de éxito
      return res.status(200).json({
        ok: true,
        rowCount,
        mensaje: "Cliente eliminado correctamente",
      });
      //eliminar por nombre
    } else if (nombre !== undefined) {
      const consultaConteo = {
        //COUNT(*)::int = contar cuántos registros hay y devolverlo como un entero con el alias "count"
        text: "SELECT COUNT(*)::int AS count FROM clientes WHERE nombre ILIKE $1",
        values: [`${nombre}%`],
      };
      const { rows } = await pool.query(consultaConteo);
      //
      const count = rows[0].count;
//si no se encontró ningún cliente, devolver error 404
      if (count === 0)
        return res
          .status(404)
          .json({ ok: false, mensaje: "Cliente no existe" });
          //si se encontró más de un cliente, devolver error 400 indicando que el criterio de búsqueda es muy amplio
      if (count > 1) {
        return res.status(400).json({
          ok: false,
          mensaje: `Se encontraron ${count} clientes con ese criterio. Por favor refine el criterio de búsqueda.`,
        });
      }
//si se encontró exactamente un cliente, proceder a eliminarlo
      const consultaEliminar = {
        text: "DELETE FROM clientes WHERE nombre ILIKE $1",
        values: [`${nombre}%`],
      };
      const { rowCount } = await pool.query(consultaEliminar);
      return res.status(200).json({
        ok: true,
        rowCount,
        mensaje: "Cliente eliminado correctamente",
      });
      //eliminar por edad
    } else if (edad !== undefined) {
      const edadNum = Number(edad);
      //validar que edad sea un número entero positivo
      if (!Number.isInteger(edadNum) || edadNum < 0) {
        return res.status(400).json({
          ok: false,
          mensaje: "El parámetro edad debe ser un número entero positivo",
        });
      }
      //contar cuántos clientes tienen esa edad
      const consultaConteo = {
        text: "SELECT COUNT(*)::int AS count FROM clientes WHERE edad = $1",
        values: [edadNum],
      };
      const { rows } = await pool.query(consultaConteo);
      const count = rows[0].count;
//si no se encontró ningún cliente, devolver error 404
      if (count === 0)
        return res
          .status(404)
          .json({ ok: false, mensaje: "Cliente no existe" });
          //si se encontró más de un cliente, devolver error 400 indicando que el criterio de búsqueda es muy amplio
      if (count > 1) {
        return res.status(400).json({
          ok: false,
          mensaje: `Se encontraron ${count} clientes con esa edad. Por favor refine el criterio de búsqueda.`,
        });
      }
//si se encontró exactamente un cliente, proceder a eliminarlo
      const consultaEliminar = {
        text: "DELETE FROM clientes WHERE edad = $1",
        values: [edadNum],
      };
      //rowCount indica cuántas filas fueron afectadas por la consulta DELETE
      const { rowCount } = await pool.query(consultaEliminar);
      return res.status(200).json({
        ok: true,
        rowCount,
        mensaje: "Cliente eliminado correctamente",
      });
    } else {
      //si no se proporcionó ningún criterio, devolver error 400
      return res.status(400).json({
        ok: false,
        mensaje: "Debe proporcionar al menos un criterio: rut, nombre o edad",
      });
    }
    //manejo errores
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, mensaje: "Error en el servidor", error: err.message });
  }
};

// PUT /clientes/:rut  →  body: { nombre }
export const updateCliente = async (req, res) => {
  const { rut } = req.params;
  const { nombre } = req.body;
//validar que el campo nombre esté presente, sea una cadena de texto y no esté vacío
  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    return res
      .status(400)
      .json({ ok: false, mensaje: "El campo nombre es requerido" });
  }

  try {
    //actualizar el nombre del cliente con el rut especificado
    const consulta = {
      text: "UPDATE clientes SET nombre = $1 WHERE rut = $2",
      values: [nombre.trim(), rut],
    };
    //rowCount indica cuántas filas fueron afectadas por la consulta UPDATE
    const { rowCount } = await pool.query(consulta);

    //si no se encontró ningún cliente, devolver error 404
    if (rowCount === 0)
      return res.status(404).json({ ok: false, mensaje: "Cliente no existe" });
    //si se actualizó correctamente, devolver mensaje de éxito
    return res
      .status(200)
      .json({ ok: true, rowCount, mensaje: "Actualizado correctamente" });
      //manejo errores
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, mensaje: "Error en el servidor", error: err.message });
  }
};

// POST /clientes  →  body: { rut, nombre, edad }
export const createCliente = async (req, res) => {
  const { rut, nombre, edad } = req.body;
//validar que rut y nombre estén presentes, sean cadenas de texto y no estén vacíos
  if (!rut || typeof rut !== "string" || rut.trim() === "") {
    return res
      .status(400)
      .json({ ok: false, mensaje: "El campo rut es requerido" });
  }
  //validar que edad esté presente, sea un número entero positivo
  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    return res
      .status(400)
      .json({ ok: false, mensaje: "El campo nombre es requerido" });
  }
  //validar que edad sea un número entero positivo
  const edadNum = Number(edad);
  if (
    edad === undefined ||
    edad === null ||
    !Number.isInteger(edadNum) ||
    edadNum < 0
  ) {
    //si edad no está presente, no es un número entero o es negativo, devolver error 400
    return res.status(400).json({
      ok: false,
      mensaje: "El campo edad debe ser un número entero positivo",
    });
  }

  try {
    //insertar el nuevo cliente en la base de datos
    const consulta = {
      text: "INSERT INTO clientes (rut, nombre, edad) VALUES ($1, $2, $3) RETURNING rut, nombre, edad",
      values: [rut.trim(), nombre.trim(), edadNum],
    };
    //rows[0] contiene el cliente recién creado gracias a la cláusula RETURNING de la consulta SQL
    const { rows } = await pool.query(consulta);
    return res.status(201).json({ ok: true, data: rows[0] });
  } catch (err) {
    //si el error es un error de clave duplicada (código 23505), significa que ya existe un cliente con ese rut
    if (err.code === "23505") {
      return res.status(409).json({
        ok: false,
        mensaje: `Ya existe un cliente con el rut ${rut.trim()}`,
      });
    }
    //manejo de otros errores
    return res
      .status(500)
      .json({ ok: false, mensaje: "Error en el servidor", error: err.message });
  }
};
