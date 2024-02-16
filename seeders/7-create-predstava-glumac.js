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
      {
        id: "8",
        idPredstave: "6",
        idGlumca: "1",
      },
      {
        id: "9",
        idPredstave: "7",
        idGlumca: "5",
      },
      {
        id: "10",
        idPredstave: "8",
        idGlumca: "3",
      },
      {
        id: "11",
        idPredstave: "8",
        idGlumca: "4",
      },
      {
        id: "12",
        idPredstave: "9",
        idGlumca: "2",
      },
      {
        id: "13",
        idPredstave: "10",
        idGlumca: "2",
      },
      {
        id: "14",
        idPredstave: "11",
        idGlumca: "1",
      },
      {
        id: "15",
        idPredstave: "12",
        idGlumca: "3",
      },
      {
        id: "16",
        idPredstave: "12",
        idGlumca: "4",
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
