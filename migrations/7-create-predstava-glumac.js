"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PredstavaGlumacs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idPredstave: {
        allowNull: false,
        // references: {
        //   model: "Predstava",
        //   key: "id",
        // },
        type: Sequelize.INTEGER,
      },
      idGlumca: {
        allowNull: false,
        // references: {
        //   model: "Glumac",
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
    await queryInterface.dropTable("PredstavaGlumacs");
  },
};
