"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("rezervacijas", [
      {
        id: "1",
        idPredstave: "1",
        idPosetioca: "3",
        brojMesta: 22,
        status: "Prihvaćena",
      },
      {
        id: "2",
        idPredstave: "4",
        idPosetioca: "5",
        brojMesta: 127,
        status: "Nova",
      },
      {
        id: "3",
        idPredstave: "5",
        idPosetioca: "2",
        brojMesta: 48,
        status: "Prihvaćena",
      },
      {
        id: "4",
        idPredstave: "3",
        idPosetioca: "1",
        brojMesta: 54,
        status: "Prihvaćena",
      },
      {
        id: "5",
        idPredstave: "2",
        idPosetioca: "4",
        brojMesta: 77,
        status: "Odbijena",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Rezervacija", null, {});
  },
};
