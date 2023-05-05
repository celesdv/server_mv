import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Booking } from "./booking";
import { Count } from "./count";
import { Supplier } from "./supplier";
import { User } from "./user";

export const Outcome = sequelize.define("outcome", {
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
Outcome.belongsTo(Booking, {
  foreignKey: {
    allowNull: true,
  },
});
Outcome.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});
Outcome.belongsTo(Count, {
  foreignKey: {
    allowNull: false,
  },
});
Outcome.belongsTo(Supplier, {
  foreignKey: {
    allowNull: false,
  },
});
