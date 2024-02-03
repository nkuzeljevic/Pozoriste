"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("salas", [
      {
        id: "1",
        naziv: "Scena Petar Kralj",
        idPozorista: "1",
        brojMesta: 250,
      },
      {
        id: "2",
        naziv: "Velika scena",
        idPozorista: "2",
        brojMesta: 404,
      },
      {
        id: "3",
        naziv: "Velika scena Ljuba Tadić",
        idPozorista: "3",
        brojMesta: 370,
      },
      {
        id: "4",
        naziv: "Scena Studio JDP",
        idPozorista: "3",
        brojMesta: 280,
      },
      {
        id: "5",
        naziv: "Mala sala",
        idPozorista: "4",
        brojMesta: 250,
      },
      {
        id: "6",
        naziv: "Scena Bata Stojković",
        idPozorista: "5",
        brojMesta: 240,
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
    await queryInterface.bulkDelete("Sala", null, {});
  },
};
