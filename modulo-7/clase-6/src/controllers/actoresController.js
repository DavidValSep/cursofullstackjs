import { Actor, Pelicula } from "../models/associations.js";

export const getActores = async (req, res) => {
  try {
    const actores = await Actor.findAll({ include: { model: Pelicula, as: "peliculas" } });
    res.json(actores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los actores" });
  }
};

export const createActor = async (req, res) => {
  const { nombre, fecha_nacimiento } = req.body;
  try {
    const actor = await Actor.create({ nombre, fecha_nacimiento });
    res.status(201).json(actor);
  } catch (error) {
    console.error("CRITICAL DATABASE ERROR:", error);
    res.status(500).json({ error: "Error al crear el actor", detalle: error.message });
  }
};
