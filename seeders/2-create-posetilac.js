"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("posetilacs", [
      {
        id: "1",
        imePrezime: "Pera Peric",
        email: "pperic@gmail.com",
        lozinka: "29glm98.",
        brojTelefona: "0641234567",
        uloga: "user",
      },
      {
        id: "2",
        imePrezime: "Sara Saric",
        email: "ssaric@gmail.com",
        lozinka: "glm56kjl!",
        brojTelefona: "0696574839",
        uloga: "user",
      },
      {
        id: "3",
        imePrezime: "Marko Markovic",
        email: "admin",
        lozinka: "admin...",
        brojTelefona: "0657890044",
        uloga: "admin",
      },
      {
        id: "4",
        imePrezime: "Dejan Tomovic",
        email: "dtomovic@gmail.com",
        lozinka: "kgl5j6.k",
        brojTelefona: "0678594345",
        uloga: "user",
      },
      {
        id: "5",
        imePrezime: "Branko Brankovic",
        email: "manager",
        lozinka: "manager.",
        brojTelefona: "0604563377",
        uloga: "manager",
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
    await queryInterface.bulkDelete("Posetilac", null, {});
  },
};
