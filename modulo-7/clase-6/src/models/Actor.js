import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

const Actor = sequelize.define("actor", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

export default Actor;
