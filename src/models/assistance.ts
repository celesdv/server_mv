import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Budget } from "./budget";
import { Supplier } from "./supplier";

export const Assistance = sequelize.define("assistance", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },  
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
// Assistance.belongsTo(Budget, {
//   foreignKey: {
//     allowNull: false,
//   },
// });
Assistance.belongsTo(Supplier, {
  foreignKey: {
    allowNull: false,
  },
});
