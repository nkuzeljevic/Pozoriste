"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Zanr extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Predstava }) {
      this.hasMany(Predstava, { foreignKey: "idZanra" });
    }
  }
  Zanr.init(
    {
      idZanra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      naziv: {
        type: DataTypes.STRING(120),
        unique: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Zanr",
    }
  );
  return Zanr;
};
