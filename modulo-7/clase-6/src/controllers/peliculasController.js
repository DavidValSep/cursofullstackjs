import { sequelize } from "../database/database.js";
import { Pelicula, Actor } from "../models/associations.js";

export const getPeliculas = async (req, res) => {
  try {
    const peliculas = await Pelicula.findAll({ include: { model: Actor, as: "actores" } });
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las películas" });
  }
};

export const createPelicula = async (req, res) => {
  const { titulo, anio, actores_ids } = req.body;
  try {
    const pelicula = await Pelicula.create({ titulo, anio });
    if (actores_ids && actores_ids.length > 0) {
      await pelicula.addActores(actores_ids);
    }
    res.status(201).json(pelicula);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la película" });
  }
};

export const asignarActor = async (req, res) => {
  const { pelicula_id, actor_id } = req.body;
  const t = await sequelize.transaction();
  try {
    const pelicula = await Pelicula.findByPk(pelicula_id, { transaction: t });
    const actor = await Actor.findByPk(actor_id, { transaction: t });

    if (!pelicula || !actor) {
      await t.rollback();
      return res.status(404).json({ error: "Película o actor no encontrado" });
    }

    await pelicula.addActores(actor, { transaction: t });
    await t.commit();

    res.status(200).json({ message: "Actor asignado correctamente a la película" });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: "Error al asignar el actor" });
  }
};
