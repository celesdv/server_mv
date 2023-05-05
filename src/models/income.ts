import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Booking } from "./booking";
import { Client } from "./client";
import { Count } from "./count";
import { User } from "./user";

export const Income = sequelize.define("income", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  total_usd: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  currency: DataTypes.STRING,
  date: DataTypes.DATE,
  detail: DataTypes.STRING,
  soft_delete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
Income.belongsTo(Booking, {
  foreignKey: {
    allowNull: true,
  },
});
Income.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});
Income.belongsTo(Count, {
  foreignKey: {
    allowNull: false,
  },
});
Income.belongsTo(Client, {
  foreignKey: {
    allowNull: true,
  },
});

