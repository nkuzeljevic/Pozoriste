"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("predstavaGlumacs", [
      {
        id: "1",
        idPredstave: "1",
        idGlumca: "2",
      },
      {
        id: "2",
        idPredstave: "3",
        idGlumca: "5",
      },
      {
        id: "3",
        idPredstave: "2",
        idGlumca: "4",
      },
      {
        id: "4",
        idPredstave: "5",
        idGlumca: "1",
      },
      {
        id: "5",
        idPredstave: "4",
        idGlumca: "3",
      },
      {
        id: "6",
        idPredstave: "5",
        idGlumca: "2",
      },
      {
        id: "7",
        idPredstave: "5",
        idGlumca: "5",
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
    await queryInterface.bulkDelete("PredstavaGlumac", null, {});
  },
};
