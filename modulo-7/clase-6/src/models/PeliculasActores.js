import { sequelize } from "../database/database.js";

const PeliculasActores = sequelize.define(
  "peliculas_actores",
  {},
  { timestamps: false }
);

export default PeliculasActores;
