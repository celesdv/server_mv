import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Order } from "./order";

export const Budget = sequelize.define("budget", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  total: DataTypes.DOUBLE,
  detail: DataTypes.STRING,
  soft_delete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
Budget.belongsTo(Order, {
  foreignKey: {
    allowNull: false,
  },
});
