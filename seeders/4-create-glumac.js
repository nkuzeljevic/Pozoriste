"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("glumacs", [
      {
        id: "1",
        ime: "Jovana Belović",
        opis: "Jovana Belović srpska je pozorišna, televizijska, filmska i glasovna glumica. Diplomirala je 2014. godine na Akademiji umetnosti Univerziteta u Novom Sadu, a master rad odbranila dve godine kasnije.",
      },
      {
        id: "2",
        ime: "Sanja Marković",
        opis: " Sanja Marković je rođena 1994. u Beogradu, a odrasla je u Krnješevcima. Glumu je diplomirala na Fakultetu dramskih umetnosti u Beogradu, u klasi profesora Srđana J. Karanovića.",
      },
      {
        id: "3",
        ime: "Jasmina Avramović",
        opis: " Jasmina Avramović je rođena 28. oktobra 1960. godine u Valjevu. Glumu je diplomirala 1985. godine na Fakultetu dramskih umetnosti u Beogradu, u klasi profesora Arse Jovanovića.",
      },
      {
        id: "4",
        ime: "Milena Vasić",
        opis: "Milena Vasić je rođena u Beogradu gde je završila muzičku školu i gimnaziju. Glumu je diplomirala na Fakultetu dramskih umetnosti u Beogradu, a zatim upisala magistarske studije.",
      },
      {
        id: "5",
        ime: "Miodrag Dragičević",
        opis: "Rođen je 1994. godine u Beogradu. Završio je sportsku gimnaziju i trenirao košarku sedam godina. Nakon toga se posvetio glumi i završio Fakultet dramskih umetnosti u Beogradu u klasi profesorke Biljane Mašić.",
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
    await queryInterface.bulkDelete("Glumac", null, {});

  },
};
