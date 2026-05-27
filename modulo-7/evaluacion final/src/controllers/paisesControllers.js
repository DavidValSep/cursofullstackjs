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
    // Ajusta la consulta según tu estructura de tabla para PIB
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
    return res.status(400).json({ mensaje: "El nombre del país es obligatorio" });
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