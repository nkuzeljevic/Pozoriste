"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rezervacija extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate({ Predstava, Posetilac, User }) {
       static associate({ Predstava, Posetilac }) {
      // this.belongsTo(Predstava, { foreignKey: "idPredstave" });
      // this.belongsTo(Posetilac, { foreignKey: "idPosetioca" });
      this.belongsTo(Predstava, {
        foreignKey: "idPredstave",
        targetKey: "id",
        as: "predstave",
      });
      this.belongsTo(Posetilac, {
        foreignKey: "idPosetioca",
        targetKey: "id",
        as: "posetilac",
      });
      // this.belongsTo(User, {
      //   foreignKey: "idUser",
      //   targetKey: "id",
      //   as: "user",
      // });
      // this.belongsTo(Sala, { foreignKey: "idSale" });
    }
  }
  Rezervacija.init(
    {
      // idRezervacije: {
      //   type: DataTypes.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true,
      // },
      brojMesta: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(120),
        unique: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Rezervacija",
    }
  );
  return Rezervacija;
};
