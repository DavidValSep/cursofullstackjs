import { query } from "../db.js";

export const getPaises = async (req, res) => {
  try {
    const result = await query("SELECT * FROM paises ORDER BY nombre");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener paises" });
  }
};

export const getPaisesPib = async (req, res) => {
  try {
    const result = await query("SELECT * FROM paises_pib ORDER BY nombre");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener paises con PIB" });
  }
};

export const createPais = async (req, res) => {
  const { nombre, continente, poblacion, pib_2019, pib_2020 } = req.body;
if (!nombre) {
    // Creamos el error, le asignamos el código 444 y se lo enviamos al manejador global
    const error = new Error("El nombre es obligatorio");
    error.status = 444;
    return next(error);
  }
  try {
    const queryPais = "INSERT INTO paises (nombre, continente, poblacion) VALUES ($1, $2, $3)";
    await query(queryPais, [nombre, continente, poblacion]);
    const queryPib = "INSERT INTO paises_pib (nombre, pib_2019, pib_2020) VALUES ($1, $2, $3)";
    await query(queryPib, [nombre, pib_2019, pib_2020]);
    const queryWeb = "INSERT INTO paises_data_web (nombre_pais, accion) VALUES ($1, 1)";
    await query(queryWeb, [nombre]);
    res.status(201).json({ mensaje: "País, PIB y registro web agregados con éxito" });

  } catch (error) {
    console.error("Error al registrar el país:", error);
    res.status(500).json({ mensaje: "Error al insertar el país y sus datos asociados" });
  }
};

export const deletePais = async (req, res) => {
  // Extraemos el nombre desde los parámetros de la URL (ej: /paises/Canadá)
  const { nombre } = req.params;

  if (!nombre) {
    const error = new Error("El nombre del país es obligatorio");
    error.status = 444;
    return next(error);
  }

  try {
    await query("BEGIN");

    const deletePib = "DELETE FROM paises_pib WHERE nombre = $1";
    await query(deletePib, [nombre]);

    const deletePais = "DELETE FROM paises WHERE nombre = $1";
    const resultPais = await query(deletePais, [nombre]);

    if (resultPais.rowCount === 0) {
      await query("ROLLBACK");
      return res.status(404).json({ mensaje: "El país no existe en la base de datos" });
    }

    const queryWeb = "INSERT INTO paises_data_web (nombre_pais, accion) VALUES ($1, 0)";
    await query(queryWeb, [nombre]);

    await query("COMMIT");

    res.json({ mensaje: `El país ${nombre}, su PIB y su acción de eliminación fueron registrados con éxito` });

  } catch (error) {
    await query("ROLLBACK");
    console.error("Error al eliminar el país:", error);
    res.status(500).json({ mensaje: "Error al eliminar el país y sus datos asociados (posible duplicado en auditoría o fallo del sistema)" });
  }
};