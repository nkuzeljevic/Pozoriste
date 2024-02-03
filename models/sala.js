"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sala extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Pozoriste, Predstava }) {
      this.belongsTo(Pozoriste, { foreignKey: "idPozorista" });
      this.hasMany(Predstava, { foreignKey: "idSale" });
      // this.hasMany(Rezervacija, { foreignKey: "idSale" });
    }
  }
  Sala.init(
    {
      idSale: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      naziv: {
        type: DataTypes.STRING(120),
        unique: true,
        allowNull: false,
      },
      brojMesta: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Sala",
    }
  );
  return Sala;
};
