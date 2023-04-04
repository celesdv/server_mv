import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const Extra = sequelize.define("extra", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    detail: DataTypes.STRING,
    soft_delete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
})