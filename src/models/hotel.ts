import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const Hotel = sequelize.define("hotel", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  regime: DataTypes.STRING,
  nights: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  detail: DataTypes.STRING,
  soft_delete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
