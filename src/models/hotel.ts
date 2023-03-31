import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Budget } from "./budget";
import { Supplier } from "./supplier";

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
  rooms: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  rooms_type: DataTypes.STRING,
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
// Hotel.belongsTo(Budget, {
//   foreignKey: {
//     allowNull: false,
//   },
// });
Hotel.belongsTo(Supplier, {
  foreignKey: {
    allowNull: false,
  },
});
