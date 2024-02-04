"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Predstava extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Pozoriste, Zanr, Sala, PredstavaGlumac, Rezervacija }) {
      // this.belongsTo(Pozoriste, { foreignKey: "idPozorista" });
      // this.belongsTo(Zanr, { foreignKey: "idZanra" });
      // this.belongsTo(Sala, { foreignKey: "idSale" });
      // this.hasMany(PredstavaGlumac, { foreignKey: "idPredstave" });
      // this.hasMany(Rezervacija, { foreignKey: "idPredstave" });
      this.belongsTo(Pozoriste, {
        foreignKey: "idPozorista",
        targetKey: "id",
        as: "pozorista",
      });
      this.belongsTo(Zanr, {
        foreignKey: "idZanra",
        targetKey: "id",
        as: "zanr",
      });
      this.belongsTo(Sala, {
        foreignKey: "idSale",
        targetKey: "id",
        as: "sale",
      });
      this.hasMany(PredstavaGlumac, {
        foreignKey: "idPredstave",
        targetKey: "id",
        as: "PredstavaGlumacs",
      });
      this.hasMany(Rezervacija, { foreignKey: "idPredstave", targetKey: "id" });
    }
  }
  Predstava.init(
    {
      // idPredstave: {
      //   type: DataTypes.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true,
      // },
      naziv: {
        type: DataTypes.STRING(120),
        unique: true,
        allowNull: false,
      },
      datum: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      vreme: { type: DataTypes.TIME, allowNull: false },
      cena: { type: DataTypes.DOUBLE, allowNull: false },
    },
    {
      sequelize,
      modelName: "Predstava",
    }
  );
  return Predstava;
};
