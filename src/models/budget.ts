import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Assistance } from "./assistance";
import { Canned } from "./canned";
import { Excursion } from "./excursion";
import { Flight } from "./flight";
import { Hotel } from "./hotel";
import { Order } from "./order";
import { Transfer } from "./transfer";
import { Accommodation } from "./accommodation";

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
Budget.hasMany(Flight, {
  foreignKey: {
    allowNull: false,
  },
});
Budget.hasMany(Accommodation, {
  foreignKey: {
    allowNull: false,
  },
});
Budget.hasMany(Canned, {
  foreignKey: {
    allowNull: false,
  },
});
Budget.hasMany(Excursion, {
  foreignKey: {
    allowNull: false,
  },
});
Budget.hasMany(Transfer, {
  foreignKey: {
    allowNull: false,
  },
});
Budget.hasMany(Assistance, {
  foreignKey: {
    allowNull: false,
  },
});