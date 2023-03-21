import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";

export const Organization = sequelize.define("organization", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
  address: DataTypes.STRING,
  facebook_url: DataTypes.STRING,
  instagram_url: DataTypes.STRING,
  image: DataTypes.STRING,
  phone_number: DataTypes.STRING,
  about_us_text: DataTypes.STRING,
});
