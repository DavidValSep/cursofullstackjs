import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

const Pelicula = sequelize.define("pelicula", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Pelicula;
