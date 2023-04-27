import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const Pax = sequelize.define("pax", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dni: DataTypes.STRING,
  birth_date: DataTypes.DATE,
  passport: DataTypes.STRING,
  expiration: DataTypes.DATE,
  soft_delete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
