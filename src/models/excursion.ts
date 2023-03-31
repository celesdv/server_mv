import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Budget } from "./budget";
import { Supplier } from "./supplier";

export const Excursion = sequelize.define("excursion", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  date: DataTypes.STRING,
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
// Excursion.belongsTo(Budget, {
//   foreignKey: {
//     allowNull: false,
//   },
// });
Excursion.belongsTo(Supplier, {
  foreignKey: {
    allowNull: false,
  },
});
