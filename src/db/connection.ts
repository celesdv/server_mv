import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "app_melcej",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "root",
  {
    host: process.env.DB_PORT || "localhost",
    dialect: "mysql",
  }
);

export default sequelize;
