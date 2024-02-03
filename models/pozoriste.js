"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pozoriste extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Predstava, Sala }) {
      this.hasMany(Predstava, { foreignKey: "idPozorista" });
      this.hasMany(Sala, { foreignKey: "idPozorista" });
    }
  }
  Pozoriste.init(
    {
      idPozorista: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      naziv: {
        type: DataTypes.STRING(120),
        unique: true,
        allowNull: false,
      },
      opis: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      adresa: {
        type: DataTypes.STRING(120),
        unique: true,
        allowNull: false,
      },
      telefon: {
        type: DataTypes.STRING(17),
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(120),
        unique: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Pozoriste",
    }
  );
  return Pozoriste;
};
