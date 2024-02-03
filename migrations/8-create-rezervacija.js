"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Rezervacijas", {
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
      idPosetioca: {
        allowNull: false,
        // references: {
        //   model: "Posetilac",
        //   key: "id",
        // },
        type: Sequelize.INTEGER,
      },
      brojMesta: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Rezervacijas");
  },
};
