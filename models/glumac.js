"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Glumac extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ PredstavaGlumac }) {
      // this.hasMany(PredstavaGlumac, { foreignKey: "idGlumca" });
      this.hasMany(PredstavaGlumac, {
        foreignKey: "idGlumca",
        targetKey: "id",
      });
    }
  }
  Glumac.init(
    {
      // idGlumca: {
      //   type: DataTypes.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true,
      // },
      ime: {
        type: DataTypes.STRING(120),
        unique: true,
        allowNull: false,
      },
      opis: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Glumac",
    }
  );
  return Glumac;
};
