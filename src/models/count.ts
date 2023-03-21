import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";

export const Count = sequelize.define("count", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alias: DataTypes.STRING,
  cbu: DataTypes.STRING,
  detail: DataTypes.STRING,
  soft_delete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
