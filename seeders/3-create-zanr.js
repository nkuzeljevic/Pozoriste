"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("zanrs", [
      {
        id: "1",
        naziv: "Komedija",
      },
      {
        id: "2",
        naziv: "Drama",
      },
      {
        id: "3",
        naziv: "Opera",
      },
      {
        id: "4",
        naziv: "Mjuzikl",
      },
      {
        id: "5",
        naziv: "Pozorište za decu",
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
    await queryInterface.bulkDelete("Zanr", null, {});
  },
};
