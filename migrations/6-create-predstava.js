"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Predstavas", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      naziv: {
        type: Sequelize.STRING,
      },
      idPozorista: {
        allowNull: false,
        // references: {
        //   model: "Pozoriste",
        //   key: "id",
        // },
        type: Sequelize.INTEGER,
      },
      datum: {
        type: Sequelize.DATEONLY,
      },
      vreme: {
        type: Sequelize.STRING,
      },
      idSale: {
        allowNull: false,
        // references: {
        //   model: "Sala",
        //   key: "id",
        // },
        type: Sequelize.INTEGER,
      },
      cena: {
        type: Sequelize.DOUBLE,
      },
      idZanra: {
        allowNull: false,
        // references: {
        //   model: "Zanr",
        //   key: "id",
        // },
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Predstavas");
  },
};
