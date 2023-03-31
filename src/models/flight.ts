import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Budget } from "./budget";
import { Supplier } from "./supplier";

export const Flight = sequelize.define("flight", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: DataTypes.STRING,
  baggage: DataTypes.STRING,
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
// Flight.belongsTo(Budget, {
//   foreignKey: {
//     allowNull: false,
//   },
// });
Flight.belongsTo(Supplier, {
  foreignKey: {
    allowNull: false,
  },
});
