"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PredstavaGlumac extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Predstava, Glumac }) {
      this.belongsTo(Predstava, { foreignKey: "idPredstave" });
      this.belongsTo(Glumac, { foreignKey: "idGlumca" });
    }
    // static associate(models) {
    //   PredstavaGlumac.belongsTo(models.Predstava, {
    //     foreignKey: "idPredstave",
    //   });
    //   PredstavaGlumac.belongsTo(models.Glumac, { foreignKey: "idGlumca" });
    // }
  }
  PredstavaGlumac.init(
    { idPredstave: DataTypes.INTEGER, idGlumca: DataTypes.INTEGER },
    {
      sequelize,
      modelName: "PredstavaGlumac",
    }
  );
  return PredstavaGlumac;
};
