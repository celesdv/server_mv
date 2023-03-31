import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { User } from "./user";

export const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nights: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  phone: DataTypes.STRING,
  detail: DataTypes.STRING,
  toddler: DataTypes.INTEGER,
  child: DataTypes.INTEGER,
  teen: DataTypes.INTEGER,
  adult: DataTypes.INTEGER,
  senior: DataTypes.INTEGER,
  is_budget: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  soft_delete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
Order.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});
