import {DataTypes} from "sequelize";
import {sequelize} from "../database/database.js";

const Cliente = sequelize.define("cliente", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})

export default Cliente;