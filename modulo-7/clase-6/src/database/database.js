import Sequelize from "sequelize";

export const sequelize = new Sequelize("ORM", "postgres", "pass", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;
