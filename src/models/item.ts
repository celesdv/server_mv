import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Supplier } from "./supplier";

export const Item = sequelize.define("items", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  type: DataTypes.STRING,
  value: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  tax: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
  detail: DataTypes.STRING,
  soft_delete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
Item.belongsTo(Supplier, {
  foreignKey: {
    allowNull: false,
  },
});
