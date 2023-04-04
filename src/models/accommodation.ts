import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Supplier } from "./supplier";
import { Hotel } from "./hotel";
import { Extra } from "./extra";

export const Accommodation = sequelize.define("accommodation", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nights: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
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
})
Accommodation.belongsTo(Supplier, {
    foreignKey: {
        allowNull: false,
    },
});
Accommodation.hasMany(Hotel, {
    foreignKey: {
        allowNull: false,
    },
})
Accommodation.hasMany(Extra, {
    foreignKey: {
        allowNull: false,
    },
})