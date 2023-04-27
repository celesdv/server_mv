import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Budget } from "./budget";
import { Client } from "./client";
import { Pax } from "./pax";

export const Booking = sequelize.define("booking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  travel_date: DataTypes.DATE,
  detail: DataTypes.STRING,
  soft_delete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
Booking.belongsTo(Budget, {
  foreignKey: {
    allowNull: false,
  },
});
Booking.belongsTo(Client, {
  foreignKey: {
    allowNull: false,
  },
});
Booking.hasMany(Pax, {
  foreignKey: {
      allowNull: false,
  },
})

