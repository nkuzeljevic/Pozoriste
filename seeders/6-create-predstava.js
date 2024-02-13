"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("predstavas", [
      {
        id: "1",
        naziv: "Laž",
        idPozorista: "2",
        datum: new Date("2023-12-22"),
        vreme: "20:00",
        idSale: "2",
        cena: 1100,
        idZanra: "2",
      },
      {
        id: "2",
        naziv: "Rolerkoster",
        idPozorista: "1",
        datum: new Date("2023-12-27"),
        vreme: "20:30",
        idSale: "1",
        cena: 1000,
        idZanra: "1",
      },
      {
        id: "3",
        naziv: "Gubitnik",
        idPozorista: "3",
        datum: new Date("2023-12-12"),
        vreme: "19:30",
        idSale: "4",
        cena: 1050,
        idZanra: "2",
      },
      {
        id: "4",
        naziv: "Klaustrofobična komedija",
        idPozorista: "5",
        datum: new Date("2023-12-15"),
        vreme: "20:00",
        idSale: "6",
        cena: 1200,
        idZanra: "1",
      },
      {
        id: "5",
        naziv: "Zona Zamfirova",
        idPozorista: "4",
        datum: new Date("2023-12-17"),
        vreme: "20:30",
        idSale: "5",
        cena: 1500,
        idZanra: "2",
      },
      {
        id: "6",
        naziv: "Marija Magdalena",
        idPozorista: "2",
        datum: new Date("2023-12-27"),
        vreme: "20:30",
        idSale: "2",
        cena: 1500,
        idZanra: "2",
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
    await queryInterface.bulkDelete("Predstava", null, {});
  },
};
