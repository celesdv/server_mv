import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const Supplier = sequelize.define("supplier", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  phone: DataTypes.STRING,
  cbu: DataTypes.STRING,
  soft_delete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
