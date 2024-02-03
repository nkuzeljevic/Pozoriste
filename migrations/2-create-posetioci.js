'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posetiocis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imePrezime: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      lozinka: {
        type: Sequelize.STRING
      },
      brojTelefona: {
        type: Sequelize.STRING
      },
      uloga: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posetiocis');
  }
};