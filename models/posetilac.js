"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posetilac extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Rezervacija }) {
      this.hasMany(Rezervacija, { foreignKey: "idPosetioca" });
    }
  }
  Posetilac.init(
    {
      idPosetioca: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      imePrezime: {
        type: DataTypes.STRING(120),
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(120),
        unique: true,
        allowNull: false,
      },
      lozinka: {
        type: DataTypes.STRING(120),
        allowNull: false,
      },
      brojTelefona: {
        type: DataTypes.STRING(17),
        allowNull: false,
      },
      uloga: {
        type: DataTypes.STRING(17),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Posetilac",
    }
  );
  return Posetilac;
};
// Hook to hash the password before saving it to the database
// User.beforeCreate(async (user) => {
//   const saltRounds = 10;
//   const hashedPassword = await bcrypt.hash(user.password, saltRounds);
//   user.password = hashedPassword;
// });

// // Verify password during login
// User.prototype.isValidPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };
