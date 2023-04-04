import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const Section = sequelize.define("section", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    calendar_origin: DataTypes.DATE,
    calendar_destination: DataTypes.DATE,
    company: DataTypes.STRING,
    detail: DataTypes.STRING,
    soft_delete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
})